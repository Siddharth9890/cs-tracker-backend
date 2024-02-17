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
      .trim(),
    topicId: string({
      required_error: "topicId is required",
    })
      .nonempty({ message: "topicId can't be empty" })
      .trim(),
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
      .trim(),
  }),
});

export const userIdAndQuestionIdSchema = object({
  query: object({
    userId: string({ required_error: "userId is required" })
      .nonempty({ message: "emauuserIdserIdil can't be empty" })
      .trim(),
    questionId: string({
      required_error: "questionId is required",
    })
      .nonempty({ message: "questionId can't be empty" })
      .trim(),
  }),
});

export const idSchema = object({
  body: object({
    id: string({ required_error: "id is required" })
      .nonempty({
        message: "id can't be empty",
      }),
  }),
});
