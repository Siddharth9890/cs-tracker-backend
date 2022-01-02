const SubmissionModel = require("../models/Submission");
const RevisionModel = require("../models/Revision");
const { successResponse, errorResponse } = require("../utils/response.utils");

// create submission
async function createSubmission(request, response) {
  const body = request.body;
  if (!body) return errorResponse(response, 400, "body cannot be empty");
  try {
    const result = await SubmissionModel.create(body);
    const result1 = await RevisionModel.create(body);
    successResponse(response, 201, result);
  } catch (error) {
    errorResponse(response, 400, error);
  }
}

// get all questions done by user via email
async function getAllQuestionsDoneByUser(request, response) {
  const email = request.params.email;
  if (!email) return errorResponse(response, 400, "email cannot be empty");
  try {
    const result = await SubmissionModel.find({
      submittedBy: email,
    });
    successResponse(response, 200, result);
  } catch (error) {
    errorResponse(response, 400, error);
  }
}

// get all questions done by user via email
async function getOneQuestionDoneByUser(request, response) {
  const email = request.params.email;
  const questionName = request.params.questionName;
  if (!email || !questionName)
    return errorResponse(response, 400, "email cannot be empty");
  try {
    const result = await SubmissionModel.find({
      submittedBy: email,
      questionName: questionName,
    });

    successResponse(response, 200, result);
  } catch (error) {
    errorResponse(response, 400, error);
  }
}

module.exports = {
  getAllQuestionsDoneByUser,
  createSubmission,
  getOneQuestionDoneByUser,
};
