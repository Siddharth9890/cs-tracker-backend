import express from "express";
import authController from "../controller/auth.controller";
import auth2FaController from "../controller/auth2Fa.controller";
import { validate, validateAsync } from "../middleware/validateResources";
import {
  backupSchema,
  createUserSchema,
  emailSchema,
  otpSchema,
  tokenSchema,
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

// send email to the user
// localhost:5000/api/v2/auth/send-mail/
router.post("/send-mail", validateAsync(emailSchema), authController.sendEmail);

// validate account of the  user
// localhost:5000/api/v2/auth/validate/
router.post(
  "/validate",
  validateAsync(otpSchema),
  authController.verifyAndValidateUser
);

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

// register for 2 fa
// localhost:5000/api/v2/auth/register-2fa/
router.post("/register-2fa", auth2FaController.register2Fa);

// verify 2 fa
// localhost:5000/api/v2/auth/validate-2fa/
router.post(
  "/validate-2fa",
  validate(tokenSchema),
  auth2FaController.verify2Fa
);

// verify 2 fa for future request
// localhost:5000/api/v2/auth/verify-2fa/
router.post(
  "/verify-2fa",
  validate(tokenSchema),
  auth2FaController.verify2FaFuture
);

// verify backup code
// localhost:5000/api/v2/auth/verify-backup/
router.post(
  "/verify-backup",
  validate(backupSchema),
  auth2FaController.verifyBackupCode
);

export default router;
