import express from "express";

import revisionController from "../controller/revision.controller";
import { validate, validateAsync } from "../middleware/validateResources";
import { emailSchema } from "../schema/revision.schema";
import { idSchema } from "../schema/submission.schema";

const router = express.Router();

router.get(
  "/:email",
  validateAsync(emailSchema),
  revisionController.getAllQuestionsDoneByUser
);

router.delete(
  "/question/:id",
  validate(idSchema),
  revisionController.removeQuestionFromList
);

export default router;
