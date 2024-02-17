import express from "express";

import submissionController from "../controller/submission.controller";
import { validate, validateAsync } from "../middleware/validateResources";
import {
  createSubmissionSchema,
  idSchema,
  userIdAndQuestionIdSchema,
  userIdSchema,
} from "../schema/submission.schema";

const router = express.Router();

// create a submission
// localhost:5000/api/v1/submission
router.post(
  "/",
  validateAsync(createSubmissionSchema),
  submissionController.createSubmission
);

// get all submissions under email
// localhost:5000/api/v1/submission/:email
router.get(
  "/",
  validateAsync(userIdSchema),
  submissionController.getAllQuestionsDoneByUser
);

// get one question done by user
// localhost:5000/api/v1/submission/question/:id
router.get(
  "/question/",
  validate(idSchema),
  submissionController.getOneQuestionDoneByUser
);

// get latest submission of the question done by user
// localhost:5000/api/v1/submission/:email/:question
router.get(
  "/latest",
  validateAsync(userIdAndQuestionIdSchema),
  submissionController.getLatestSubmission
);

export default router;
