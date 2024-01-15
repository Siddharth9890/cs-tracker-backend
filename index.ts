import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
const xss = require("xss-clean");
import dotenv from "dotenv";
import { limiter } from "./src/utils/rateLimiter";
import routes from "./routes";
import { makeConnectionWithDB } from "./db";
import loadData from "./insertData";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(limiter);
app.use(helmet());
app.use(xss());

app.use(cookieParser());

let urlsCors = ["https://cs-tracker.vercel.app"];
if (process.env.NODE !== "production") {
  urlsCors.push("http://localhost:3000");
}

app.use(
  cors({
    origin: urlsCors,
    credentials: true,
  })
);

async function makeDatabase() {
  await makeConnectionWithDB();
}

app.use(express.json({ limit: "1kb" }));

routes(app);

app.listen(PORT, async () => {
  await makeDatabase();
  console.log("Server running on Port: ", PORT);
});

process.on("unhandledRejection", (error) => {
  console.log(error);
  console.log("SERVER CLOSING 😱 CALL THE SUPPORT UNHANDLED REJECTION");
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.log(error);
  console.log("SERVER CLOSING 😱 CALL THE SUPPORT UNCAUGHT EXCEPTION");
  process.exit(1);
});
