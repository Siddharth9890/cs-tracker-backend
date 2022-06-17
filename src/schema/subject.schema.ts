import { object, string, TypeOf, number } from "zod";
import { Subject } from "../models/Subject";

export const createSubjectSchema = object({
  body: object({
    subject_name: string({
      required_error: "subjectName is required",
    })
      .nonempty({ message: "name can't be empty" })
      .min(5, "subjectName should not be less than 5 characters")
      .max(30, "subjectName should be not be greater than 30 characters")
      .trim()
      .refine(
        async (subjectName) => {
          const subject = await Subject.findOne({
            where: { subject_name: subjectName },
          });
          if (subject) return false;
          else return true;
        },
        { message: "Subject already existed" }
      ),
    subject_description: string({
      required_error: "subjectDescription is required",
    })
      .nonempty({ message: "description can't be empty" })
      .min(5, "subjectDescription should not be less than 5 characters")
      .max(50, "subjectDescription should not be greater than 50 characters")
      .trim(),
    topic_count: number({
      required_error: "topicCount is required",
    })
      .int("topicCount should be a integer")
      .lt(100, "topicCount should be less than 100")
      .gt(0, "topicCount should be greater than 0"),
    image_url: string({
      required_error: "imageUrl is required",
    })
      .url("imageUrl should be a url")
      .trim(),
  }),
});

export const updateSubjectSchema = object({
  params: object({
    subjectName: string({ required_error: "subject_name is required" })
      .nonempty({ message: "name can't be empty" })
      .min(5, "subjectName should not be less than 5 characters")
      .max(30, "subjectName should be not be greater than 30 characters")
      .trim()
      .refine(
        async (subjectName) => {
          const subject = await Subject.findOne({
            where: { subject_name: subjectName },
          });
          if (subject) return true;
          else return false;
        },
        { message: "Subject does not exist" }
      ),
  }),
  body: object({
    subject_name: string({ required_error: "subject_name is required" })
      .nonempty({ message: "name can't be empty" })
      .min(5, "subjectName should not be less than 5 characters")
      .max(30, "subjectName should be not be greater than 30 characters")
      .trim(),
    subject_description: string({
      required_error: "topic_description is required",
    })
      .nonempty({ message: "description can't be empty" })
      .min(5, "subjectDescription should not be less than 5 characters")
      .max(50, "subjectDescription should not be greater than 50 characters")
      .trim(),
    topic_count: number({ required_error: "topic_count is required" })
      .int("topicCount should be a integer")
      .lt(100, "topicCount should be less than 100")
      .gt(0, "topicCount should be greater than 0"),
    image_url: string({ required_error: "image_url is required" })
      .url("imageUrl should be a url")
      .trim(),
  }),
});

export const deleteSubjectSchema = object({
  params: object({
    subjectName: string({ required_error: "subject_name is required" })
      .nonempty({ message: "name can't be empty" })
      .min(5, "subjectName should not be less than 5 characters")
      .max(30, "subjectName should be not be greater than 30 characters")
      .trim()
      .refine(
        async (subjectName) => {
          const subject = await Subject.findOne({
            where: { subject_name: subjectName },
          });
          if (subject) return true;
          else return false;
        },
        { message: "Subject does not existed" }
      ),
  }),
});
