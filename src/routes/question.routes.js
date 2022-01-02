const express = require("express");
const questionController = require("../controller/question.controller");

const router = express.Router();

// create a question
// localhost:5000/api/v1/question
router.post("/", questionController.createQuestion);

// get all questions under a topic
// localhost:5000/api/v1/question/:topicName
router.get("/:topicName", questionController.getAllQuestionsUnderATopic);

// get one question under topic
// localhost:5000/api/v1/question/:topicName/:questionName
router.get(
  "/:topicName/:questionName",
  questionController.getOneQuestionUnderATopic
);

module.exports = router;
