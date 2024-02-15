import { Request, Response } from "express";
import {
  createSubjectDal,
  deleteSubjectByIdDal,
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
    console.log(error);
    return errorResponse(response, 500, error);
  }
}

async function updateSubject(request: Request, response: Response) {
  const subjectId = request.params.subjectId;
  const body = request.body;
  try {
    const subject = await updateSubjectDal(parseInt(subjectId), body);
    return successResponse(response, 201, subject);
  } catch (error: any) {
    console.log(error);
    return errorResponse(response, 500, error);
  }
}

async function getAllSubject(request: Request, response: Response) {
  try {
    const subjects = await getAllSubjectsDal();
    return successResponse(response, 200, subjects);
  } catch (error) {
    console.log(error);
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
  const subjectId = request.params.subjectId;
  try {
    await deleteSubjectByIdDal(parseInt(subjectId));
    return successResponse(response, 200, { deleted: subjectId });
  } catch (error) {
    console.log(error);
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
