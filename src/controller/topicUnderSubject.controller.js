const NodeCache = require("node-cache");
const myCache = new NodeCache();
const { successResponse, errorResponse } = require("../utils/response.utils");
const TopicUnderSubject = require("../models/TopicUnderSubject");

// create a topic
async function createTopic(request, response) {
  const body = request.body;
  if (!body) return errorResponse(response, 400, "body cannot be empty");
  try {
    const result = await TopicUnderSubject.create(body);
    successResponse(response, 201, result);
  } catch (error) {
    errorResponse(response, 400, error);
  }
}

// get all topics under a subject
async function getTopicUnderSubject(request, response) {
  const subjectName = request.params.subjectName;
  if (!subjectName)
    return errorResponse(response, 400, "subject name cannot be empty");
  try {
    const result = await TopicUnderSubject.find({ subject: subjectName });
    successResponse(response, 200, result);
  } catch (error) {
    errorResponse(response, 400, error);
  }
}

// get all topics
async function getAllTopics(request, response) {
  if (myCache.has("topics")) {
    return successResponse(response, 200, myCache.get("topics"));
  } else {
    try {
      const result = await TopicUnderSubject.find();
      myCache.set("topics", result);
      successResponse(response, 200, result);
    } catch (error) {
      errorResponse(response, 400, error);
    }
  }
}

module.exports = {
  createTopic,
  getTopicUnderSubject,
  getAllTopics,
};
