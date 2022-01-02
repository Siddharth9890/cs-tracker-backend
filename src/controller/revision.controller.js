const RevisionModel = require("../models/Revision");
const { successResponse, errorResponse } = require("../utils/response.utils");

// same as submission
async function createRevision(request, response) {
  const body = request.body;
  if (!body) return errorResponse(response, 400, "body cannot be empty");
  try {
    const result = await RevisionModel.create(body);
    successResponse(response, 201, result);
  } catch (error) {
    errorResponse(response, 400, error);
  }
}

// get all questions done by user
async function getAllQuestionsDoneByUser(request, response) {
  const email = request.params.email;
  if (!email) return errorResponse(response, 400, "email cannot be empty");
  try {
    const result = await RevisionModel.find({
      submittedBy: email,
      revisionDate: { $ne: undefined },
    });
    successResponse(response, 200, result);
  } catch (error) {
    errorResponse(response, 400, error);
  }
}

// removes the question done by user
async function removeQuestionFromList(request, response) {
  const email = request.params.email;
  const questionName = request.params.questionName;
  if (!email || !questionName)
    return errorResponse("email or question name cannot be empty");
  try {
    const result = await RevisionModel.deleteOne({
      submittedBy: email,
      questionName: questionName,
    });
    successResponse(response, 200, result);
  } catch (error) {
    errorResponse(response, 404, error);
  }
}

module.exports = {
  getAllQuestionsDoneByUser,
  createRevision,
  removeQuestionFromList,
};
