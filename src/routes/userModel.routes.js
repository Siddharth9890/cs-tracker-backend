const express = require("express");
const userController = require("../controller/userProfile.controller");

const router = express.Router();

// create a user
// localhost:5000/api/v1/user/
router.post("/signUp", userController.createUser);

// login a user
// localhost:5000/api/v1/login/
router.post("/login", userController.login);

// login a user
// localhost:5000/api/v1/login/
router.post("/findUser", userController.getUserByEmail);

// verify token of  a user
// localhost:5000/api/v1/verifyToken/
router.post("/verifyToken", userController.verifyToken);

// send otp to user
// localhost:5000/api/v1/sendOtp/
// router.post("/sendOtp", userController.sendOtp);

module.exports = router;
