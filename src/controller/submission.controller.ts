import { Request, Response } from "express";

import { successResponse, errorResponse } from "../utils/response.utils";
import {
  createSubmissionDal,
  getLatestSubmissionDal,
  getOneQuestionDoneByUserDal,
  getSubmissionsDoneByUserDal,
} from "../DataAccessLayer/submission.dal";
import { createRevisionDal } from "../DataAccessLayer/revision.dal";
import Sequelize from "sequelize/types/sequelize";

async function createSubmission(request: Request, response: Response) {
  let body = request.body;
  try {
    let submission;
    if (body.revisionDate) {
      submission = await createSubmissionDal(body);
      body.notes = "";
      await createRevisionDal(body);
      return successResponse(response, 201, submission);
    } else {
      submission = await createSubmissionDal(body);
      return successResponse(response, 201, submission);
    }
  } catch (error) {
    console.log(error)
    errorResponse(response, 500, error);
  }
}

async function getAllQuestionsDoneByUser(request: Request, response: Response) {
  const userId = request.query.userId;
  try {
    const submissions = await getSubmissionsDoneByUserDal(userId as string);
    successResponse(response, 200, submissions);
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

async function getOneQuestionDoneByUser(request: Request, response: Response) {
  const id = request.query.id;
  try {
    const submission = await getOneQuestionDoneByUserDal(id as string);
    successResponse(response, 200, submission);
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

async function getLatestSubmission(request: Request, response: Response) {
  const userId = request.query.userId;
  const questionId = request.query.questionId;
  try {
    const latestSubmission = await getLatestSubmissionDal(
      userId as string,
      questionId as string
    );
    successResponse(response, 200, latestSubmission);
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

export default {
  getAllQuestionsDoneByUser,
  createSubmission,
  getOneQuestionDoneByUser,
  getLatestSubmission,
};
