import { object, string, z } from "zod";
import { Question } from "../models/Question";
import { TopicUnderSubject } from "../models/TopicUnderSubject";
import User from "../models/User";

const dateSchema = z.preprocess((arg) => {
  if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
}, z.date());

export const createSubmissionSchema = object({
  body: object({
    questionId: string({
      required_error: "questionId is required",
    })
      .nonempty({ message: "questionId can't be empty" })
      .trim()
      .refine(
        async (questionId) => {
          const topic = await Question.findByPk(questionId);
          if (topic) return true;
          else return false;
        },
        { message: "questionId does not exist" }
      ),
    topicId: string({
      required_error: "topicId is required",
    })
      .nonempty({ message: "topicId can't be empty" })
      .trim()
      .refine(
        async (questionTopic) => {
          const topic = await TopicUnderSubject.findByPk(questionTopic);
          if (topic) return true;
          else return false;
        },
        { message: "topicId does not exist" }
      ),
    completionDate: dateSchema,
    revisionDate: dateSchema.optional(),
    submittedBy: string({
      required_error: "submittedBy is required",
    })
      .nonempty({ message: "submittedBy can't be empty" })
      .trim(),
    notes: string().max(500, "notes should not be greater than 500 characters"),
  }),
});

export const userIdSchema = object({
  query: object({
    userId: string({ required_error: "userId is required" })
      .nonempty({ message: "userId can't be empty" })
      .trim()
      .refine(
        async (userId) => {
          const user = await User.findByPk(userId);
          if (user) return true;
          else return false;
        },
        { message: "The user does not exists" }
      ),
  }),
});

export const userIdAndQuestionIdSchema = object({
  query: object({
    userId: string({ required_error: "userId is required" })
      .nonempty({ message: "emauuserIdserIdil can't be empty" })
      .trim()
      .refine(
        async (userId) => {
          const user = await User.findByPk(userId);
          if (user) return true;
          else return false;
        },
        { message: "The user does not exists" }
      ),
    questionId: string({
      required_error: "questionId is required",
    })
      .nonempty({ message: "questionId can't be empty" })
      .trim()
      .refine(
        async (questionId) => {
          const topic = await Question.findByPk(questionId);
          if (topic) return true;
          else return false;
        },
        { message: "questionId does not exist" }
      ),
  }),
});

export const idSchema = object({
  body: object({
    id: string({ required_error: "id is required" }).nonempty({
      message: "id can't be empty",
    }),
  }),
});
