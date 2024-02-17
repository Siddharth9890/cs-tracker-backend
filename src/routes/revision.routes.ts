import express from "express";

import revisionController from "../controller/revision.controller";
import { validate, validateAsync } from "../middleware/validateResources";
import { userIdSchema } from "../schema/revision.schema";
import { idSchema } from "../schema/submission.schema";

const router = express.Router();

router.get(
  "/",
  validateAsync(userIdSchema),
  revisionController.getAllQuestionsDoneByUser
);

router.delete(
  "/question/",
  validate(idSchema),
  revisionController.removeQuestionFromList
);

export default router;
