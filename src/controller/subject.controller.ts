import { Request, Response } from "express";
import {
  createSubjectDal,
  deleteSubjectByIdDal,
  getAllSubjectsDal,
  getSubjectByIdDal,
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
  const body = request.body;
  try {
    const subject = await updateSubjectDal(
      body.subjectId as string,
      body
    );
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

async function getSubjectById(request: Request, response: Response) {
  const subjectId = request.query.subjectId;
  try {
    const result = await getSubjectByIdDal(parseInt(subjectId as string));
    return successResponse(response, 200, result);
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

async function deleteSubjectByName(request: Request, response: Response) {
  const body = request.body;
  try {
    await deleteSubjectByIdDal(body.subjectId as string);
    return successResponse(response, 200, { deleted: body.subjectId });
  } catch (error) {
    console.log(error);
    errorResponse(response, 500, error);
  }
}

export default {
  createSubject,
  getAllSubject,
  deleteSubjectByName,
  getSubjectById,
  updateSubject,
};
