import { Question, QuestionInput, QuestionOutput } from "../models/Question";

export const createQuestionDal = async (
  payload: QuestionInput
): Promise<QuestionOutput> => {
  return await Question.create(payload);
};

export const updateQuestionDal = async (
  questionId: number,
  payload: Partial<QuestionInput>
): Promise<QuestionOutput> => {
  const question = await Question.findByPk(questionId);
  if (!question) throw "Question not found";

  const updatedQuestion = question.set({
    description: payload.description,
    difficulty: payload.difficulty,
    problemLink: payload.problemLink,
    name: payload.name,
    videoLink: payload.videoLink,
    underWhichTopic: payload.underWhichTopic,
  });
  await updatedQuestion.save();
  return updatedQuestion;
};

export const getQuestionsUnderTopicDal = async (
  topicId: number
): Promise<QuestionOutput[]> => {
  const questions = await Question.findAll({
    where: { underWhichTopic: topicId },
    limit: 20,
  });
  if (questions.length === 0) throw `questions not found for ${topicId}`;
  return questions;
};

export const getQuestionByIdDal = async (
  questionId: number
): Promise<QuestionOutput> => {
  const question = await Question.findByPk(questionId);
  if (!question) throw "Question not found";
  return question;
};

export const deleteQuestionByIdDal = async (questionId: number) => {
  return await Question.destroy({ where: { id: questionId } });
};
