import { Request, Response } from "express";
import {
  createQuestionDal,
  deleteQuestionByIdDal,
  getQuestionByIdDal,
  getQuestionsUnderTopicDal,
  updateQuestionDal,
} from "../DataAccessLayer/question.dal";
import { successResponse, errorResponse } from "../utils/response.utils";

async function createQuestion(request: Request, response: Response) {
  const body = request.body;
  try {
    const question = await createQuestionDal(body);
    successResponse(response, 201, question);
  } catch (error) {
    return errorResponse(response, 500, error);
  }
}

async function updateQuestion(request: Request, response: Response) {
  const body = request.body;
  try {
    const updatedQuestion = await updateQuestionDal(
      parseInt(body.questionId as string),
      body
    );
    successResponse(response, 201, updatedQuestion);
  } catch (error) {
    return errorResponse(response, 500, error);
  }
}

async function getQuestionsUnderATopic(request: Request, response: Response) {
  const topicId = request.query.topicId;
  try {
    const questions = await getQuestionsUnderTopicDal(
      parseInt(topicId as string)
    );
    successResponse(response, 200, questions);
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

async function getQuestionById(request: Request, response: Response) {
  const questionId = request.query.questionId;
  try {
    const question = await getQuestionByIdDal(parseInt(questionId as string));
    successResponse(response, 200, question);
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

async function deleteQuestion(request: Request, response: Response) {
  const questionId = request.body.questionId;
  try {
    await deleteQuestionByIdDal(parseInt(questionId as string));
    successResponse(response, 200, { deleted: questionId });
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

export default {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestionsUnderATopic,
  updateQuestion,
};
