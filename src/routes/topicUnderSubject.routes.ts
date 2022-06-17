import express from "express";

import topicUnderSubject from "../controller/topicUnderSubject.controller";
import { validateAsync } from "../middleware/validateResources";
import verifyAdminPermission from "../middleware/verifyAdminPermission";
import { deleteSubjectSchema } from "../schema/subject.schema";

import {
  createTopicUnderSubjectSchema,
  deleteTopicUnderSubjectSchema,
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
  "/:topicName",
  verifyAdminPermission,
  validateAsync(updateTopicUnderSubjectSchema),
  topicUnderSubject.updateTopic
);

// delete a topic by name
// localhost:5000/api/v2/topic/:topicName
router.delete(
  "/:topicName",
  verifyAdminPermission,
  validateAsync(deleteTopicUnderSubjectSchema),
  topicUnderSubject.deleteTopic
);

// get a topic by name
// localhost:5000/api/v2/topic/:topicName
router.get(
  "/:topicName",
  verifyAdminPermission,
  validateAsync(deleteTopicUnderSubjectSchema),
  topicUnderSubject.getTopicByName
);

// get all topics under a subject
// localhost:5000/api/v2/topic/subject/:subjectName
router.get(
  "/subject/:subjectName",
  verifyAdminPermission,
  validateAsync(deleteSubjectSchema),
  topicUnderSubject.getAllTopicsUnderSubject
);

export default router;
