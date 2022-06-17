import express from "express";
import questionController from "../controller/question.controller";
import { validateAsync } from "../middleware/validateResources";
import verifyAdminPermission from "../middleware/verifyAdminPermission";
import {
  createQuestionSchema,
  deleteQuestionSchema,
  updateQuestionSchema,
} from "../schema/question.schema";
import { deleteTopicUnderSubjectSchema } from "../schema/topicUnderSubject.schema";

const router = express.Router();

// create a question
// localhost:5000/api/v2/question
router.post(
  "/",
  verifyAdminPermission,
  validateAsync(createQuestionSchema),
  questionController.createQuestion
);

// update a question by name
// localhost:5000/api/v2/question
router.put(
  "/:questionName",
  verifyAdminPermission,
  validateAsync(updateQuestionSchema),
  questionController.updateQuestion
);

// delete a question by name
// localhost:5000/api/v2/question/:questionName
router.delete(
  "/:questionName",
  verifyAdminPermission,
  validateAsync(deleteQuestionSchema),
  questionController.deleteQuestion
);

// get a question by name
// localhost:5000/api/v2/question/:questionName
router.get(
  "/:questionName",
  verifyAdminPermission,
  validateAsync(deleteQuestionSchema),
  questionController.getQuestionByName
);

// get all questions under a topic
// localhost:5000/api/v2/question/topic/:topic
router.get(
  "/topic/:topicName",
  verifyAdminPermission,
  validateAsync(deleteTopicUnderSubjectSchema),
  questionController.getQuestionsUnderATopic
);

export default router;
