import { number, object, string } from "zod";
import { Question } from "../models/Question";
import { TopicUnderSubject } from "../models/TopicUnderSubject";

export const createQuestionSchema = object({
  body: object({
    name: string({
      required_error: "questionName is required",
    })
      .nonempty({ message: "name can't be empty" })
      .min(5, "questionName should not be less than 5 characters")
      .max(30, "questionName should be not be greater than 30 characters")
      .trim()
      .refine(
        async (questionName) => {
          const question = await Question.findOne({
            where: { name: questionName },
          });
          if (question) return false;
          else return true;
        },
        { message: "question name already exists" }
      ),
    description: string({
      required_error: "questionDescription is required",
    })
      .nonempty({ message: "description can't be empty" })
      .min(
        5,
        "questionDescription questionDescription not be less than 5 characters"
      )
      .max(50, "questionDescription should not be greater than 50 characters")
      .trim(),

    difficulty: string({
      required_error: "difficulty is required",
    })
      .nonempty({ message: "difficulty can't be empty" })
      .trim()
      .refine(
        (value) => {
          if (value === "easy" || value === "medium" || value === "hard")
            return true;
          else return false;
        },
        {
          message: "Difficulty should be easy,medium,hard only",
        }
      ),
    videoLink: string({
      required_error: "videoLink is required",
    })
      .url("should be a url")
      .nonempty({ message: "videoLink can't be empty" })
      .trim()
      .refine(
        (value) => {
          if (value.includes("https://")) return true;
          else return false;
        },
        {
          message: "Invalid youtube link format",
        }
      )
      .refine(
        async (value) => {
          const question = await Question.findOne({
            where: { videoLink: value },
          });
          if (question) return false;
          else return true;
        },
        {
          message:
            "Question video link exists for the question.The solution will be different for all questions so change link",
        }
      ),
    problemLink: string({
      required_error: "problemLink is required",
    })
      .url("should be a url")
      .nonempty({ message: "problemLink  can't be empty" })
      .trim()

      .refine(
        async (value) => {
          const question = await Question.findOne({
            where: { problemLink: value },
          });
          if (question) return false;
          else return true;
        },
        {
          message:
            "problemLink cannot be duplicate for 2 questions change leetcode link",
        }
      ),
    underWhichTopic: number({
      required_error: "under which topic is required",
    }).refine(
      async (topicId) => {
        const topic = await TopicUnderSubject.findByPk(topicId);
        if (topic) return true;
        else return false;
      },
      { message: " Entered topic name does not exists" }
    ),
  }),
});

export const updateQuestionSchema = object({
  body: object({
    questionId: number({ required_error: "questionId is required" }).refine(
      async (questionId) => {
        const question = await Question.findByPk(questionId);
        if (question) return true;
        else return false;
      },
      { message: "questionId does not exist" }
    ),
    name: string({
      required_error: "questionName is required",
    })
      .nonempty({ message: "name can't be empty" })
      .min(5, "questionName should not be less than 5 characters")
      .max(30, "questionName should be not be greater than 30 characters")
      .trim()
      .refine(
        async (questionName) => {
          const question = await Question.findOne({
            where: { name: questionName },
          });
          if (question) return true;
          else return false;
        },
        { message: "question name does not  exists" }
      ),
    description: string({
      required_error: "questionDescription is required",
    })
      .nonempty({ message: "description can't be empty" })
      .min(
        5,
        "questionDescription questionDescription not be less than 5 characters"
      )
      .max(50, "questionDescription should not be greater than 50 characters")
      .trim(),

    difficulty: string({
      required_error: "difficulty is required",
    })
      .nonempty({ message: "difficulty can't be empty" })
      .trim()
      .refine(
        (value) => {
          if (value === "easy" || value === "medium" || value === "hard")
            return true;
          else return false;
        },
        {
          message: "Difficulty should be easy,medium,hard only",
        }
      ),
    videoLink: string({
      required_error: "videoLink is required",
    })
      .url("should be a url")
      .nonempty({ message: "youtube link can't be empty" })
      .trim()
      .refine(
        (value) => {
          if (value.includes("https://")) return true;
          else return false;
        },
        {
          message: "Invalid link format",
        }
      ),

    problemLink: string({
      required_error: "problemLink is required",
    })
      .url("should be a url")
      .nonempty({ message: "leetcode link can't be empty" })
      .trim()
      .refine(
        (value) => {
          if (value.includes("https://")) return true;
          else return false;
        },
        {
          message: "Invalid link format",
        }
      ),
    underWhichTopic: number({
      required_error: "under which topic is required",
    }).refine(
      async (topicId) => {
        const topic = await TopicUnderSubject.findByPk(topicId);
        if (topic) return true;
        else return false;
      },
      { message: "Entered topicId does not exists" }
    ),
  }),
});

export const deleteQuestionSchema = object({
  body: object({
    questionId: number({ required_error: "questionId is required" }).refine(
      async (questionId) => {
        const question = await Question.findByPk(questionId);
        if (question) return true;
        else return false;
      },
      { message: "questionId does not exist" }
    ),
  }),
});
