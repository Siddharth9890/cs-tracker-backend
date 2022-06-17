import { Request, Response } from "express";

import { successResponse, errorResponse } from "../utils/response.utils";
import {
  createSubmissionDal,
  getLatestSubmissionDal,
  getOneQuestionDoneByUserDal,
  getSubmissionsDoneByUserDal,
} from "../DataAccessLayer/submission.dal";
import { createRevisionDal } from "../DataAccessLayer/revision.dal";

async function createSubmission(request: Request, response: Response) {
  let body = request.body;
  try {
    let submission;
    if (body.revision_date) {
      submission = await createSubmissionDal(body);
      body.notes = "";
      await createRevisionDal(body);
      return successResponse(response, 201, submission);
    } else {
      submission = await createSubmissionDal(body);
      return successResponse(response, 201, submission);
    }
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

async function getAllQuestionsDoneByUser(request: Request, response: Response) {
  const email = request.params.email;
  try {
    const submissions = await getSubmissionsDoneByUserDal(email);
    successResponse(response, 200, submissions);
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

async function getOneQuestionDoneByUser(request: Request, response: Response) {
  const id = request.params.id;
  try {
    const submission = await getOneQuestionDoneByUserDal(id);
    successResponse(response, 200, submission);
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

async function getLatestSubmission(request: Request, response: Response) {
  const email = request.params.email;
  const question_name = request.params.question_name;
  try {
    const latestSubmission = await getLatestSubmissionDal(email, question_name);
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
