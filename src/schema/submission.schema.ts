import { object, string, z } from "zod";
import { Question } from "../models/Question";
import { TopicUnderSubject } from "../models/TopicUnderSubject";
import User from "../models/User";

const dateSchema = z.preprocess((arg) => {
  if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
}, z.date());

export const createSubmissionSchema = object({
  body: object({
    question_name: string({
      required_error: "question_name is required",
    })
      .nonempty({ message: "question_name can't be empty" })
      .min(5, "question_name should not be less than 5 characters")
      .max(30, "question_name should be not be greater than 30 characters")
      .trim()
      .refine(
        async (questionName) => {
          const topic = await Question.findOne({
            where: { question_name: questionName },
          });
          if (topic) return true;
          else return false;
        },
        { message: "question_name does not exist" }
      ),
    question_topic: string({
      required_error: "question_topic is required",
    })
      .nonempty({ message: "question_topic can't be empty" })
      .min(5, "question_topic should not be less than 5 characters")
      .max(30, "question_topic should be not be greater than 30 characters")
      .trim()
      .refine(
        async (questionTopic) => {
          const topic = await TopicUnderSubject.findOne({
            where: { topic_name: questionTopic },
          });
          if (topic) return true;
          else return false;
        },
        { message: "question_topic does not exist" }
      ),

    completion_date: dateSchema,
    revision_date: dateSchema.optional(),
    submitted_by: string({
      required_error: "submitted_by is required",
    })
      .nonempty({ message: "submitted_by can't be empty" })
      .min(5, "submitted_by should not be less than 5 characters")
      .max(30, "submitted_by should be not be greater than 30 characters")
      .trim()
      .refine(
        async (email) => {
          const user = await User.findOne({
            where: { email },
          });
          if (user) return true;
          else return false;
        },
        { message: "User does not exists" }
      ),
    notes: string().max(500, "notes should not be greater than 500 characters"),
  }),
});

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

export const emailAndQuestionSchema = object({
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
    question_name: string({
      required_error: "question_name is required",
    })
      .nonempty({ message: "question_name can't be empty" })
      .min(5, "question_name should not be less than 5 characters")
      .max(30, "question_name should be not be greater than 30 characters")
      .trim()
      .refine(
        async (questionName) => {
          const topic = await Question.findOne({
            where: { question_name: questionName },
          });
          if (topic) return true;
          else return false;
        },
        { message: "question_name does not exist" }
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
