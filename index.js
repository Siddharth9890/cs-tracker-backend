const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const userProfileRouter = require("./src/routes/userModel.routes");
const subjectRouter = require("./src/routes/subjectModel.routes");
const topicRouter = require("./src/routes/topicUnderSubject.routes");
const questionRouter = require("./src/routes/question.routes");
const submissionRouter = require("./src/routes/submission.routes");
const revisionRouter = require("./src/routes/revision.routes");

const app = express();
const PORT = process.env.PORT || 5000;

const limiter = rateLimiter({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP,pleas try again after a hour",
});

app.use("/api", limiter);
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

app.use(
  cors({
    origin: "https://cs-tracker.pages.dev/",
  })
);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("db connected 😊");
});

// to accept json data in body of response
app.use(express.json({ limit: "1kb" }));

// all routes
app.use("/api/v1/user", userProfileRouter);

app.use("/api/v1/subject", subjectRouter);

app.use("/api/v1/topic", topicRouter);

app.use("/api/v1/question", questionRouter);

app.use("/api/v1/submission", submissionRouter);

app.use("/api/v1/revision", revisionRouter);

app.listen(PORT, () => {
  console.log("Server running on Port: ", PORT);
});

process.on("unhandledRejection", (error) => {
  console.log(error);
  console.log("SERVER CLOSING 😱 CALL THE ADMIN UNHANDLED REJECTION");
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.log(error);
  console.log("SERVER CLOSING 😱 CALL THE ADMIN UNCAUGHT EXCEPTION");
  process.exit(1);
});
