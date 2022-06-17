import { Request, Response } from "express";

import {
  deleteRevisionByEmailDal,
  getRevisionsDoneByUserDal,
} from "../DataAccessLayer/revision.dal";
import { successResponse, errorResponse } from "../utils/response.utils";

async function getAllQuestionsDoneByUser(request: Request, response: Response) {
  const email = request.params.email;
  try {
    const revisions = await getRevisionsDoneByUserDal(email);
    successResponse(response, 200, revisions);
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

async function removeQuestionFromList(request: Request, response: Response) {
  const id = request.params.id;
  try {
    await deleteRevisionByEmailDal(id);
    successResponse(response, 200, "Successfully deleted");
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

export default {
  getAllQuestionsDoneByUser,
  removeQuestionFromList,
};
