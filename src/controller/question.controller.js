const QuestionModel = require("../models/Question");
const { successResponse, errorResponse } = require("../utils/response.utils");

// create a question
async function createQuestion(request, response) {
  const body = request.body;
  if (!body) return errorResponse(response, 400, "body cannot be empty");
  try {
    const result = await QuestionModel.create(body);
    successResponse(response, 201, result);
  } catch (error) {
    errorResponse(response, 400, error);
  }
}

// get all questions under a topic
async function getAllQuestionsUnderATopic(request, response) {
  const topicName = request.params.topicName;
  if (!topicName)
    return errorResponse(response, 400, "topic name cannot be empty");
  try {
    const result = await QuestionModel.find({ topicUnderSubject: topicName });
    successResponse(response, 201, result);
  } catch (error) {
    errorResponse(response, 400, error);
  }
}

// get one question under a topic
async function getOneQuestionUnderATopic(request, response) {
  const topicName = request.params.topicName;
  const questionName = request.params.questionName;
  if (!topicName || !questionName)
    return errorResponse(
      response,
      400,
      "topic name and question name cannot be empty"
    );
  try {
    const result = await QuestionModel.findOne({
      topicUnderSubject: topicName,
      name: questionName,
    });
    successResponse(response, 201, result);
  } catch (error) {
    errorResponse(response, 400, error);
  }
}

module.exports = {
  createQuestion,
  getAllQuestionsUnderATopic,
  getOneQuestionUnderATopic,
};
