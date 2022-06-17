import { Question, QuestionInput, QuestionOutput } from "../models/Question";

export const createQuestionDal = async (
  payload: QuestionInput
): Promise<QuestionOutput> => {
  return await Question.create(payload);
};

export const updateQuestionDal = async (
  questionName: string,
  payload: Partial<QuestionInput>
): Promise<QuestionOutput> => {
  const question = await Question.findOne({
    where: { question_name: questionName },
  });
  if (!question) throw "Question not found";

  const updatedQuestion = question.set({
    question_description: payload.question_description,
    difficulty: payload.difficulty,
    leet_code_problem_link: payload.leet_code_problem_link,
    question_name: payload.question_name,
    youtube_video_link: payload.youtube_video_link,
    under_which_topic: payload.under_which_topic,
  });
  await updatedQuestion.save();
  return updatedQuestion;
};

export const getQuestionsUnderTopicDal = async (
  topicName: string
): Promise<QuestionOutput[]> => {
  const questions = await Question.findAll({
    where: { under_which_topic: topicName },
    limit: 20,
  });
  if (questions.length === 0) throw `questions not found for ${topicName}`;
  return questions;
};

export const getQuestionByNameDal = async (
  questionName: string
): Promise<QuestionOutput> => {
  const question = await Question.findOne({
    where: { question_name: questionName },
  });
  if (!question) throw "Question not found";
  return question;
};

export const deleteQuestionByNameDal = async (questionName: string) => {
  return await Question.destroy({ where: { question_name: questionName } });
};
