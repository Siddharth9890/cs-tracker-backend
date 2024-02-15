import express from "express";

import topicUnderSubject from "../controller/topicUnderSubject.controller";
import { validateAsync } from "../middleware/validateResources";
import verifyAdminPermission from "../middleware/verifyAdminPermission";
import { deleteSubjectByIdSchema } from "../schema/subject.schema";

import {
  createTopicUnderSubjectSchema,
  deleteTopicUnderSubjectSchema,
  getTopicByIdSchema,
  updateTopicUnderSubjectSchema,
} from "../schema/topicUnderSubject.schema";

const router = express.Router();

// create a topic
// localhost:5000/api/v2/topic/
router.post(
  "/",
  verifyAdminPermission,
  validateAsync(createTopicUnderSubjectSchema),
  topicUnderSubject.createTopic
);

// update a topic by name
// localhost:5000/api/v2/topic/
router.put(
  "/",
  verifyAdminPermission,
  validateAsync(updateTopicUnderSubjectSchema),
  topicUnderSubject.updateTopic
);

// delete a topic by name
// localhost:5000/api/v2/topic/:topicName
router.delete(
  "/",
  verifyAdminPermission,
  validateAsync(deleteTopicUnderSubjectSchema),
  topicUnderSubject.deleteTopic
);

// get a topic by name
// localhost:5000/api/v2/topic/:topicName
router.get(
  "/",
  verifyAdminPermission,
  validateAsync(getTopicByIdSchema),
  topicUnderSubject.getTopicById
);

// get all topics under a subject
// localhost:5000/api/v2/topic/subject/:subjectName
router.get(
  "/subject",
  verifyAdminPermission,
  validateAsync(deleteSubjectByIdSchema),
  topicUnderSubject.getAllTopicsUnderSubject
);

export default router;
