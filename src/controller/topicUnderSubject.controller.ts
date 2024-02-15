import { Request, Response } from "express";

import {
  createTopicUnderSubjectDal,
  deleteTopicByIdDal,
  getAllTopicsUnderSubjectDal,
  getTopicByNameDal,
  updateTopicUnderSubjectDal,
} from "../DataAccessLayer/topicUnderSubject.dal";
import { successResponse, errorResponse } from "../utils/response.utils";

async function createTopic(request: Request, response: Response) {
  const body = request.body;
  try {
    const topic = await createTopicUnderSubjectDal(body);
    successResponse(response, 201, topic);
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

async function updateTopic(request: Request, response: Response) {
  const body = request.body;
  try {
    const updatedTopic = await updateTopicUnderSubjectDal(
      parseInt(body.topicId as string),
      body
    );
    successResponse(response, 200, updatedTopic);
  } catch (error) {
    return errorResponse(response, 500, error);
  }
}

async function getAllTopicsUnderSubject(request: Request, response: Response) {
  const subjectId = request.query.subjectId;
  try {
    const topics = await getAllTopicsUnderSubjectDal(
      parseInt(subjectId as string)
    );
    successResponse(response, 200, topics);
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

async function getTopicById(request: Request, response: Response) {
  const topicId = request.query.topicId;
  try {
    const topic = await getTopicByNameDal(parseInt(topicId as string));
    successResponse(response, 200, topic);
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

async function deleteTopic(request: Request, response: Response) {
  const body = request.body;
  try {
    await deleteTopicByIdDal(parseInt(body.topicId as string));
    successResponse(response, 200, { deleted: body.topicId });
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

export default {
  createTopic,
  updateTopic,
  getTopicById,
  deleteTopic,
  getAllTopicsUnderSubject,
};
