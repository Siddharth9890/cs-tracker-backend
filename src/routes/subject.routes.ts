import express from "express";

import subjectController from "../controller/subject.controller";
import { validateAsync } from "../middleware/validateResources";
import verifyAdminPermission from "../middleware/verifyAdminPermission";
import {
  createSubjectSchema,
  updateSubjectSchema,
  deleteSubjectByIdSchema,
  getSubjectByIdSchema,
} from "../schema/subject.schema";

const router = express.Router();

// create a subject
// localhost:5000/api/v2/subject/
router.post(
  "/",
  verifyAdminPermission,
  validateAsync(createSubjectSchema),
  subjectController.createSubject
);

// update a subject by name
// localhost:5000/api/v2/subject/:subjectName
router.put(
  "/",
  verifyAdminPermission,
  validateAsync(updateSubjectSchema),
  subjectController.updateSubject
);

// delete a subject by name
// localhost:5000/api/v2/subject/:subjectName
router.delete(
  "/",
  verifyAdminPermission,
  validateAsync(deleteSubjectByIdSchema),
  subjectController.deleteSubjectByName
);

// get all subjects
// localhost:5000/api/v2/subject/
router.get("/", verifyAdminPermission, subjectController.getAllSubject);

// get one subject by name
// localhost:5000/api/v2/subject/:subjectName
router.get(
  "/",
  verifyAdminPermission,
  validateAsync(getSubjectByIdSchema),
  subjectController.getSubjectById
);

export default router;
