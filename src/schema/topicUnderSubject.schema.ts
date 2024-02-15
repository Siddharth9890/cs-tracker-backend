import { object, string, number } from "zod";
import { Subject } from "../models/Subject";
import { TopicUnderSubject } from "../models/TopicUnderSubject";

export const createTopicUnderSubjectSchema = object({
  body: object({
    name: string({
      required_error: "topicName is required",
    })
      .nonempty({ message: "topicName can't be empty" })
      .min(5, "topicName should not be less than 5 characters")
      .max(30, "topicName should be not be greater than 30 characters")
      .trim()
      .refine(
        async (name) => {
          const topic = await TopicUnderSubject.findOne({
            where: { name: name },
          });
          if (topic) return false;
          else return true;
        },
        { message: "topic name  already existed" }
      ),
    description: string({
      required_error: "topicDescription is required",
    })
      .nonempty({ message: "topicName can't be empty" })
      .min(5, "topicDescription should not be less than 5 characters")
      .max(50, "topicDescription should not be greater than 50 characters")
      .trim(),
    questionCount: number({
      required_error: "questionCount is required",
    })
      .int("questionCount should be a integer")
      .lt(100, "questionCount should be less than 100")
      .gt(0, "questionCount should be greater than 0"),
    underWhichSubject: number({
      required_error: "underWhichSubject is required",
    }).refine(
      async (underWhichSubject) => {
        const subject = await Subject.findOne({
          where: { id: underWhichSubject },
        });
        if (subject) return true;
        else return false;
      },
      { message: "Entered subject name does not exists" }
    ),
  }),
});

export const updateTopicUnderSubjectSchema = object({
  body: object({
    topicId: number({ required_error: "topicId is required" }).refine(
      async (topicId) => {
        const topic = await TopicUnderSubject.findByPk(topicId);
        if (topic) return true;
        else return false;
      },
      { message: "topicId does not exist" }
    ),
    name: string({ required_error: "topic_name is required" })
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
    questionCount: number({ required_error: "question_count is required" })
      .int("topicCount should be a integer")
      .lt(100, "topicCount should be less than 100")
      .gt(0, "topicCount should be greater than 0"),
    underWhichSubject: number({
      required_error: "underWhichSubject is required",
    }).refine(
      async (underWhichSubject) => {
        const subject = await Subject.findByPk(underWhichSubject);
        if (subject) return true;
        else return false;
      },
      { message: "Entered subject id does not exists" }
    ),
  }),
});

export const deleteTopicUnderSubjectSchema = object({
  body: object({
    topicId: number({ required_error: "topicId is required" }).refine(
      async (topicId) => {
        const topic = await TopicUnderSubject.findByPk(topicId);
        if (topic) return true;
        else return false;
      },
      { message: "topic_name does not exist" }
    ),
  }),
});

export const getTopicByIdSchema = object({
  query: object({
    topicId: number({ required_error: "topicId is required" }).refine(
      async (topicId) => {
        const topic = await TopicUnderSubject.findByPk(topicId);
        if (topic) return true;
        else return false;
      },
      { message: "topic_name does not exist" }
    ),
  }),
});
