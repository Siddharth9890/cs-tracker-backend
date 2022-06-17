import { Request, Response } from "express";
import {
  createQuestionDal,
  deleteQuestionByNameDal,
  getQuestionByNameDal,
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
  const questionName = request.params.questionName;
  try {
    const updatedQuestion = await updateQuestionDal(questionName, body);
    successResponse(response, 201, updatedQuestion);
  } catch (error) {
    return errorResponse(response, 500, error);
  }
}

async function getQuestionsUnderATopic(request: Request, response: Response) {
  const topicName = request.params.topicName;
  try {
    const questions = await getQuestionsUnderTopicDal(topicName);
    successResponse(response, 200, questions);
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

async function getQuestionByName(request: Request, response: Response) {
  const questionName = request.params.questionName;
  try {
    const question = await getQuestionByNameDal(questionName);
    successResponse(response, 200, question);
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

async function deleteQuestion(request: Request, response: Response) {
  const questionName = request.params.questionName;
  try {
    await deleteQuestionByNameDal(questionName);
    successResponse(response, 200, "Deleted successfully");
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

export default {
  createQuestion,
  deleteQuestion,
  getQuestionByName,
  getQuestionsUnderATopic,
  updateQuestion,
};
