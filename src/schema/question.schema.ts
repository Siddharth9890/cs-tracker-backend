import { object, string } from "zod";
import { Question } from "../models/Question";
import { TopicUnderSubject } from "../models/TopicUnderSubject";

export const createQuestionSchema = object({
  body: object({
    question_name: string({
      required_error: "questionName is required",
    })
      .nonempty({ message: "name can't be empty" })
      .min(5, "questionName should not be less than 5 characters")
      .max(30, "questionName should be not be greater than 30 characters")
      .trim()
      .refine(
        async (questionName) => {
          const question = await Question.findOne({
            where: { question_name: questionName },
          });
          if (question) return false;
          else return true;
        },
        { message: "question name already exists" }
      ),
    question_description: string({
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
    youtube_video_link: string({
      required_error: "youtubeVideoLink is required",
    })
      .url("should be a url")
      .nonempty({ message: "youtube link can't be empty" })
      .trim()
      .refine(
        (value) => {
          if (value.includes("https://www.youtube.com/watch?v=")) return true;
          else return false;
        },
        {
          message: "Invalid youtube link format",
        }
      )
      .refine(
        async (value) => {
          const question = await Question.findOne({
            where: { youtube_video_link: value },
          });
          if (question) return false;
          else return true;
        },
        {
          message:
            "Question video link exists for the question.The solution will be different for all questions so change link",
        }
      ),
    leet_code_problem_link: string({
      required_error: "leetCodeProblemLink is required",
    })
      .url("should be a url")
      .nonempty({ message: "leetcode link can't be empty" })
      .trim()
      .refine(
        (value) => {
          if (value.includes("https://leetcode.com/problems")) return true;
          else return false;
        },
        {
          message: "Invalid leetcode link format",
        }
      )
      .refine(
        async (value) => {
          const question = await Question.findOne({
            where: { leet_code_problem_link: value },
          });
          if (question) return false;
          else return true;
        },
        {
          message:
            "Leet code link cannot be duplicate for 2 questions change leetcode link",
        }
      ),
    under_which_topic: string({
      required_error: "under which topic is required",
    })
      .trim()
      .nonempty({ message: "under which topic link can't be empty" })
      .refine(
        async (topicName) => {
          const topic = await TopicUnderSubject.findOne({
            where: { topic_name: topicName },
          });
          if (topic) return true;
          else return false;
        },
        { message: " Entered topic name does not exists" }
      ),
  }),
});

export const updateQuestionSchema = object({
  params: object({
    questionName: string()
      .nonempty({ message: "name can't be empty" })
      .min(5, "question_name should not be less than 5 characters")
      .max(30, "question_name should be not be greater than 30 characters")
      .trim()
      .refine(
        async (questionName) => {
          const question = await Question.findOne({
            where: { question_name: questionName },
          });
          if (question) return true;
          else return false;
        },
        { message: "question_name does not exist" }
      ),
  }),
  body: object({
    question_name: string({
      required_error: "questionName is required",
    })
      .nonempty({ message: "name can't be empty" })
      .min(5, "questionName should not be less than 5 characters")
      .max(30, "questionName should be not be greater than 30 characters")
      .trim()
      .refine(
        async (questionName) => {
          const question = await Question.findOne({
            where: { question_name: questionName },
          });
          if (question) return true;
          else return false;
        },
        { message: "question name does not  exists" }
      ),
    question_description: string({
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
    youtube_video_link: string({
      required_error: "youtubeVideoLink is required",
    })
      .url("should be a url")
      .nonempty({ message: "youtube link can't be empty" })
      .trim()
      .refine(
        (value) => {
          if (value.includes("https://www.youtube.com/watch?v=")) return true;
          else return false;
        },
        {
          message: "Invalid youtube link format",
        }
      ),

    leet_code_problem_link: string({
      required_error: "leetCodeProblemLink is required",
    })
      .url("should be a url")
      .nonempty({ message: "leetcode link can't be empty" })
      .trim()
      .refine(
        (value) => {
          if (value.includes("https://leetcode.com/problems")) return true;
          else return false;
        },
        {
          message: "Invalid leetcode link format",
        }
      ),
    under_which_topic: string({
      required_error: "under which topic is required",
    })
      .nonempty({ message: "under which topic link can't be empty" })
      .trim()
      .refine(
        async (topicName) => {
          const topic = await TopicUnderSubject.findOne({
            where: { topic_name: topicName },
          });
          if (topic) return true;
          else return false;
        },
        { message: " Entered topic name does not exists" }
      ),
  }),
});

export const deleteQuestionSchema = object({
  params: object({
    questionName: string({ required_error: "question_name is required" })
      .nonempty({ message: "name can't be empty" })
      .min(5, "question_name should not be less than 5 characters")
      .max(30, "question_name should be not be greater than 30 characters")
      .trim()
      .refine(
        async (questionName) => {
          const question = await Question.findOne({
            where: { question_name: questionName },
          });
          if (question) return true;
          else return false;
        },
        { message: "question_name does not exist" }
      ),
  }),
});
