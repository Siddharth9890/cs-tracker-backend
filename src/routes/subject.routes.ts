import express from "express";

import subjectController from "../controller/subject.controller";
import { validateAsync } from "../middleware/validateResources";
import verifyAdminPermission from "../middleware/verifyAdminPermission";
import {
  createSubjectSchema,
  getSubjectByNameSchema,
  updateSubjectSchema,
  deleteSubjectByIdSchema,
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
  "/:subjectName",
  verifyAdminPermission,
  validateAsync(updateSubjectSchema),
  subjectController.updateSubject
);

// delete a subject by name
// localhost:5000/api/v2/subject/:subjectName
router.delete(
  "/:subjectName",
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
  "/:subjectName",
  verifyAdminPermission,
  validateAsync(getSubjectByNameSchema),
  subjectController.getSubjectByName
);

export default router;
