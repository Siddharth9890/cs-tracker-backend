const NodeCache = require("node-cache");
const myCache = new NodeCache();
const { successResponse, errorResponse } = require("../utils/response.utils");
const SubjectModel = require("../models/Subjects");

// create a subject
async function createSubject(request, response) {
  const body = request.body;
  if (!body) return errorResponse(response, 400, "body cannot be empty");
  try {
    const result = await SubjectModel.create(body);
    successResponse(response, 201, result);
  } catch (error) {
    errorResponse(response, 400, error);
  }
}

// get subject by name
async function getSubjectByName(request, response) {
  const subjectName = request.params.subjectName;
  if (!subjectName)
    return errorResponse(response, 400, "subject name cannot be empty");
  // if (myCache.has(subjectName))
  //   return successResponse(response, 200, myCache.get(subjectName));
  else {
    try {
      const result = await SubjectModel.findOne({ name: subjectName });
      myCache.set(subjectName, result);
      successResponse(response, 200, result);
    } catch (error) {
      errorResponse(response, 400, error);
    }
  }
}

// get all subjects
async function getAllSubjects(request, response) {
  if (myCache.has("subjects")) {
    return successResponse(response, 200, myCache.get("subjects"));
  } else {
    try {
      const result = await SubjectModel.find();
      myCache.set("subjects", result);
      successResponse(response, 200, result);
    } catch (error) {
      errorResponse(response, 400, error);
    }
  }
}

module.exports = {
  createSubject,
  getSubjectByName,
  getAllSubjects,
};
