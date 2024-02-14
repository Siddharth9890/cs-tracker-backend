import express from "express";
import authController from "../controller/auth.controller";
import { validate, validateAsync } from "../middleware/validateResources";
import {
  createUserSchema,
  emailSchema,
  otpSchema,
  updateSchema,
} from "../schema/user.schema";

const router = express.Router();

// create a user
// localhost:5000/api/v2/auth/signUp
router.post(
  "/signUp",
  validateAsync(createUserSchema),
  authController.createUser
);

// login a user
// localhost:5000/api/v2/auth/login/
router.post("/login", validateAsync(emailSchema), authController.login);

router.post(
  "/get-user",
  validateAsync(emailSchema),
  authController.getUserAndGenerateTokens
);

// validate account of the  user
// localhost:5000/api/v2/auth/validate/
router.post(
  "/validate",
  validateAsync(otpSchema),
  authController.verifyAndValidateUser
);

// TODOD need to add stronger validation
router.put("/update", validateAsync(updateSchema), authController.updateUser);

// logout a user
// localhost:5000/api/v2/auth/logout/
router.get("/logout", authController.logout);

// delete a user
// localhost:5000/api/v2/auth/delete/
// router.delete("/delete", authController.deleteAccount);

// refresh token
// localhost:5000/api/v2/auth/refresh/
router.get("/refresh", authController.handleRefreshToken);

router.get("/getUser", authController.getUserRefreshToken);

export default router;
