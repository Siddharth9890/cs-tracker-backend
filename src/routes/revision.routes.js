const express = require("express");
const revisionController = require("../controller/revision.controller");

const router = express.Router();

// create submission
// localhost:5000/api/v1/
router.post("/", revisionController.createRevision);

router.get("/:email", revisionController.getAllQuestionsDoneByUser);

router.delete(
  "/:email/:questionName",
  revisionController.removeQuestionFromList
);

module.exports = router;
