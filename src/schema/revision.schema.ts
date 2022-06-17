import { object, string } from "zod";
import User from "../models/User";

export const emailSchema = object({
  params: object({
    email: string({ required_error: "Email is required" })
      .nonempty({ message: "email can't be empty" })
      .email("Not a valid email")
      .min(5, "email should not be less than 5 characters")
      .max(50, "email should not be greater than 50 characters")
      .trim()
      .refine(
        async (email) => {
          const user = await User.findOne({ where: { email } });
          if (user) return true;
          else return false;
        },
        { message: "The user does not exists" }
      ),
  }),
});

export const idSchema = object({
  params: object({
    id: string({ required_error: "id is required" })
      .uuid({ message: "Should be uuid only" })
      .nonempty({
        message: "id can't be empty",
      }),
  }),
});
