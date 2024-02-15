import { object, string, TypeOf, number } from "zod";
import { Subject } from "../models/Subject";

export const createSubjectSchema = object({
  body: object({
    name: string({
      required_error: "subjectName is required",
    })
      .nonempty({ message: "name can't be empty" })
      .min(5, "subjectName should not be less than 5 characters")
      .max(30, "subjectName should be not be greater than 30 characters")
      .trim()
      .refine(
        async (subjectName) => {
          const subject = await Subject.findOne({
            where: { name: subjectName },
          });
          if (subject) return false;
          else return true;
        },
        { message: "Subject already existed" }
      ),
    description: string({
      required_error: "subjectDescription is required",
    })
      .nonempty({ message: "description can't be empty" })
      .min(5, "subjectDescription should not be less than 5 characters")
      .max(50, "subjectDescription should not be greater than 50 characters")
      .trim(),
    topicCount: number({
      required_error: "topicCount is required",
    })
      .int("topicCount should be a integer")
      .lt(100, "topicCount should be less than 100")
      .gt(0, "topicCount should be greater than 0"),
    imageUrl: string({
      required_error: "imageUrl is required",
    })
      .url("imageUrl should be a url")
      .trim(),
  }),
});

export const updateSubjectSchema = object({
  body: object({
    subjectId: string({ required_error: "subjectId is required" }).refine(
      async (subjectId) => {
        const subject = await Subject.findByPk(subjectId);
        console.log(subject);
        if (subject) return true;
        else return false;
      },
      { message: "Subject does not exist" }
    ),
    name: string({ required_error: "subject_name is required" })
      .nonempty({ message: "name can't be empty" })
      .min(5, "subjectName should not be less than 5 characters")
      .max(30, "subjectName should be not be greater than 30 characters")
      .trim(),
    description: string({
      required_error: "topic_description is required",
    })
      .nonempty({ message: "description can't be empty" })
      .min(5, "subjectDescription should not be less than 5 characters")
      .max(50, "subjectDescription should not be greater than 50 characters")
      .trim(),
    topicCount: number({ required_error: "topic_count is required" })
      .int("topicCount should be a integer")
      .lt(100, "topicCount should be less than 100")
      .gt(0, "topicCount should be greater than 0"),
    imageUrl: string({ required_error: "image_url is required" })
      .url("imageUrl should be a url")
      .trim(),
  }),
});

export const getSubjectByIdSchema = object({
  query: object({
    subjectId: number({ required_error: "subjectId is required" }).refine(
      async (subjectId) => {
        const subject = await Subject.findByPk(subjectId);
        if (subject) return true;
        else return false;
      },
      { message: "Subject does not existed" }
    ),
  }),
});

export const deleteSubjectByIdSchema = object({
  body: object({
    subjectId: string({ required_error: "subjectId is required" }).refine(
      async (subjectId) => {
        const subject = await Subject.findByPk(subjectId);
        if (subject) return true;
        else return false;
      },
      { message: "Subject does not exist" }
    ),
  }),
});
