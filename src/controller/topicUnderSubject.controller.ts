import { Request, Response } from "express";

import {
  createTopicUnderSubjectDal,
  deleteTopicByNameDal,
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
  const topicName = request.params.topicName;
  try {
    const updatedTopic = await updateTopicUnderSubjectDal(topicName, body);
    successResponse(response, 200, updatedTopic);
  } catch (error) {
    return errorResponse(response, 500, error);
  }
}

async function getAllTopicsUnderSubject(request: Request, response: Response) {
  const subjectName = request.params.subjectName;
  try {
    const topics = await getAllTopicsUnderSubjectDal(subjectName);
    successResponse(response, 200, topics);
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

async function getTopicByName(request: Request, response: Response) {
  const topicName = request.params.topicName;
  try {
    const topic = await getTopicByNameDal(topicName);
    successResponse(response, 200, topic);
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

async function deleteTopic(request: Request, response: Response) {
  const topicName = request.params.topicName;
  try {
    await deleteTopicByNameDal(topicName);
    successResponse(response, 200, "Deleted successfully");
  } catch (error) {
    errorResponse(response, 500, error);
  }
}

export default {
  createTopic,
  updateTopic,
  getTopicByName,
  deleteTopic,
  getAllTopicsUnderSubject,
};
