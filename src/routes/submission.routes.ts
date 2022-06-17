import express from "express";

import submissionController from "../controller/submission.controller";
import { validate, validateAsync } from "../middleware/validateResources";
import {
  createSubmissionSchema,
  emailAndQuestionSchema,
  emailSchema,
  idSchema,
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
  "/:email",
  validateAsync(emailSchema),
  submissionController.getAllQuestionsDoneByUser
);

// get one question done by user
// localhost:5000/api/v1/submission/question/:id
router.get(
  "/question/:id",
  validate(idSchema),
  submissionController.getOneQuestionDoneByUser
);

// get latest submission of the question done by user
// localhost:5000/api/v1/submission/:email/:question
router.get(
  "/:email/:question_name",
  validateAsync(emailAndQuestionSchema),
  submissionController.getLatestSubmission
);

export default router;
