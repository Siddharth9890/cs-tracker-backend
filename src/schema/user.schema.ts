import { object, string } from "zod";
import User from "../models/User";

export const createUserSchema = object({
  body: object({
    userName: string({
      required_error: "Name is required",
    })
      .nonempty({ message: "name  can't be empty" })
      .min(5, "name should not be less than 5 characters")
      .max(20, "name should be not be greater than 20 characters")
      .trim()
      .regex(/^[a-z0-9]+$/i, {
        message: "Name should have only A-Z/a-z and 0-9 numbers characters",
      })
      .refine(
        async (userName) => {
          const user = await User.findOne({ where: { userName } });
          if (!user) return true;
          else return false;
        },
        { message: "The entered email is already registered with us" }
      ),

    email: string({ required_error: "Email is required" })
      .nonempty({ message: "email can't be empty" })
      .email("Not a valid email")
      .min(5, "email should not be less than 5 characters")
      .max(50, "email should not be greater than 50 characters")
      .trim()
      .refine(
        async (email) => {
          const user = await User.findOne({ where: { email } });
          if (!user) return true;
          else return false;
        },
        { message: "The entered email is already registered with us" }
      ),
  }),
});

export const emailSchema = object({
  body: object({
    email: string({ required_error: "Email is required" })
      .nonempty({ message: "email can't be empty" })
      .email("Not a valid email")
      .min(5, "email should not be less than 5 characters")
      .max(50, "email should not be greater than 50 characters")
      .trim()
      .refine(
        async (email) => {
          const user = await User.findOne({ where: { email } });
          if (!user) return false;
          else return true;
        },
        {
          message:
            "The entered email is does not exist. Please check the email",
        }
      )
      .refine(
        async (email) => {
          const user = await User.findOne({ where: { email } });
          if (!user) return false;
          else return user.accountStatus === "active";
        },
        { message: "You account is not active.Please contact support" }
      ),
  }),
});

export const otpSchema = object({
  body: object({
    email: string({ required_error: "Email is required" })
      .nonempty({ message: "email can't be empty" })
      .email("Not a valid email")
      .min(5, "email should not be less than 5 characters")
      .max(50, "email should not be greater than 50 characters")
      .trim()
      .refine(
        async (email) => {
          const user = await User.findOne({ where: { email } });
          if (!user) return false;
          else return true;
        },
        {
          message:
            "The entered email is does not exist. Please check the email",
        }
      )
      .refine(
        async (email) => {
          const user = await User.findOne({ where: { email } });
          if (!user) return false;
          else return user.accountStatus === "active";
        },
        { message: "You account is not active.Please contact support" }
      ),
    otp: string({ required_error: "otp is required" })
      .nonempty({ message: "otp can't be empty" })
      .trim()
      .length(6, "otp should be 6 characters only")
      .regex(/[0-9]/, {
        message: "otp should have only and 0-9 numbers characters",
      }),
  }),
});

export const updateSchema = object({
  body: object({
    email: string({ required_error: "Email is required" })
      .nonempty({ message: "email can't be empty" })
      .email("Not a valid email")
      .min(5, "email should not be less than 5 characters")
      .max(50, "email should not be greater than 50 characters")
      .trim()
      .refine(
        async (email) => {
          const user = await User.findOne({ where: { email } });
          if (!user) return false;
          else return true;
        },
        {
          message:
            "The entered email is does not exist. Please check the email",
        }
      )
      .refine(
        async (email) => {
          const user = await User.findOne({ where: { email } });
          if (!user) return false;
          else return user.accountStatus === "active";
        },
        { message: "You account is not active.Please contact support" }
      ),
  }),
});
