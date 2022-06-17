import { Request, Response } from "express";
import {
  createSubjectDal,
  deleteSubjectByNameDal,
  getAllSubjectsDal,
  getSubjectByNameDal,
  updateSubjectDal,
} from "../DataAccessLayer/subject.dal";

import { successResponse, errorResponse } from "../utils/response.utils";

async function createSubject(request: Request, response: Response) {
  const body = request.body;
  try {
    const subject = await createSubjectDal(body);
    return successResponse(response, 201, subject);
  } catch (error) {
    return errorResponse(response, 500, error);
  }
}

async function updateSubject(request: Request, response: Response) {
  const subjectName = request.params.subjectName;
  const body = request.body;
  try {
    const subject = await updateSubjectDal(subjectName, body);
    return successResponse(response, 201, subject);
  } catch (error: any) {
    return errorResponse(response, 500, error);
  }
}

async function getAllSubject(request: Request, response: Response) {
  try {
    const subjects = await getAllSubjectsDal();
    return successResponse(response, 200, subjects);
  } catch (error) {
    return errorResponse(response, 500, error);
  }
}

async function getSubjectByName(request: Request, response: Response) {
  const subjectName = request.params.subjectName;
  try {
    const result = await getSubjectByNameDal(subjectName);
    return successResponse(response, 200, result);
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

async function deleteSubjectByName(request: Request, response: Response) {
  const subjectName = request.params.subjectName;
  try {
    await deleteSubjectByNameDal(subjectName);
    return successResponse(response, 200, "Deleted successfully");
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

export default {
  createSubject,
  getAllSubject,
  deleteSubjectByName,
  getSubjectByName,
  updateSubject,
};
