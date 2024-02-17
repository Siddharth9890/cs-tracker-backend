import { Request, Response } from "express";

import {
  deleteRevisionByEmailDal,
  getRevisionsDoneByUserDal,
} from "../DataAccessLayer/revision.dal";
import { successResponse, errorResponse } from "../utils/response.utils";

async function getAllQuestionsDoneByUser(request: Request, response: Response) {
  const userId = request.query.userId;
  try {
    const revisions = await getRevisionsDoneByUserDal(userId as string);
    successResponse(response, 200, revisions);
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

async function removeQuestionFromList(request: Request, response: Response) {
  const id = request.body.id;
  try {
    await deleteRevisionByEmailDal(id as string);
    successResponse(response, 200, { deleted: id });
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

export default {
  getAllQuestionsDoneByUser,
  removeQuestionFromList,
};
