const express = require("express");

const subjectController = require("../controller/subject.controller");
const router = express.Router();

// create a subject
// localhost:5000/api/v1/subject/
router.post("/", subjectController.createSubject);

// get subject by name
// localhost:5000/api/v1/subject/:name
router.get("/:subjectName", subjectController.getSubjectByName);

// get subject by name
// localhost:5000/api/v1/subject/
router.get("/", subjectController.getAllSubjects);

module.exports = router;
