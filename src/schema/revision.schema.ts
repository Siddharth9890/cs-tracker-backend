import { object, string } from "zod";
import User from "../models/User";

export const userIdSchema = object({
  query: object({
    userId: string({ required_error: "userId is required" })
      .nonempty({ message: "userId can't be empty" })
      .trim(),
  }),
});

export const idSchema = object({
  query: object({
    id: string({ required_error: "id is required" })
      .uuid({ message: "Should be uuid only" })
      .nonempty({
        message: "id can't be empty",
      }),
  }),
});
