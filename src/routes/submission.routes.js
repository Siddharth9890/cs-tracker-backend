const express = require("express");
const submissionController = require("../controller/submission.controller");

const router = express.Router();

// create a submission
// localhost:5000/api/v1/submission
router.post("/", submissionController.createSubmission);

// get all submissions under email
// localhost:5000/api/v1/submission/:email
router.get("/:email", submissionController.getAllQuestionsDoneByUser);

// get one question done by user
// localhost:5000/api/v1/submission/:email/:questionName
router.get(
  "/:email/:questionName",
  submissionController.getOneQuestionDoneByUser
);

module.exports = router;
