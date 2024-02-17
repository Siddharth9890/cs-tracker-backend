import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const connection = `postgres://${process.env.DATABASE_USER_NAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}?sslmode=verify-full`;
const sequelize = new Sequelize(connection, {
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false, // very important for planet scale to work
    },
  },
});

const makeConnectionWithDB = async () => {
  try {
    await sequelize.authenticate();
    // if (process.env.NODE_ENV === "development") {
    await sequelize.sync({
      force: true,
      logging: (sql) => console.log(sql),
    });
    // }
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

export { sequelize, makeConnectionWithDB };
