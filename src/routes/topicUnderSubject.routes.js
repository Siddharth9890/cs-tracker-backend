const express = require("express");
const topicUnderSubject = require("../controller/topicUnderSubject.controller");
const router = express.Router();

// create a subject
// localhost:5000/api/v1/topic/
router.post("/", topicUnderSubject.createTopic);

// get subject by name
// localhost:5000/api/v1/topic/:subjectName
router.get("/:subjectName", topicUnderSubject.getTopicUnderSubject);

// get all subjects
// localhost:5000/api/v1/topic/
router.get("/", topicUnderSubject.getAllTopics);

module.exports = router;
