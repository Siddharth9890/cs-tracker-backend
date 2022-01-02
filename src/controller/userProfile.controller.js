const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const validator = require("validator");

const UserProfileModel = require("../models/UserProfile");
const { errorResponse, successResponse } = require("../utils/response.utils");

// create user
async function createUser(request, response) {
  const body = request.body;
  if (!body) return errorResponse(response, 400, "No data found in body!");
  if (!validator.isEmail(body.email))
    return errorResponse(response, 400, "invalid email");
  try {
    const result = await UserProfileModel.create(body);
    console.log(result);
    const token = await result.generateJWTToken();
    result.password = null;
    successResponse(response, 201, result);
  } catch (error) {
    errorResponse(response, 400, error);
  }
}

// test function for getting user by email
async function getUserByEmail(request, response) {
  const { email } = request.body;
  if (!email) return errorResponse(response, 400, "missing value email");
  try {
    const result = await UserProfileModel.findOne({ email: email });
    successResponse(response, 200, result);
  } catch (error) {
    errorResponse(response, 400, error);
  }
}

// login in user
async function login(request, response) {
  const { email, password } = request.body;
  if (!email || !password)
    return errorResponse(response, 400, "no email or password found");
  try {
    const result = await UserProfileModel.findOne({ email: email }).select(
      "+password"
    );
    if (!result || !(await result.correctPassword(password, result.password))) {
      return errorResponse(
        response,
        400,
        "Wrong email or password please check once"
      );
    }
    const token = await result.generateJWTToken();
    successResponse(response, 200, { result: result, token: token });
  } catch (error) {
    errorResponse(response, 400, error);
  }
}

// verify the token
async function verifyToken(request, response) {
  const { token } = request.body;
  if (!token) return errorResponse(response, 400, "no token found");
  try {
    const { iat, exp } = jwt.verify(token, process.env.JWT_SECRET);
    successResponse(response, 200, "token is valid");
  } catch (error) {
    errorResponse(response, 400, "token is invalid");
  }
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_LOGIN,
    pass: process.env.SMTP_PASSWORD,
  },
});

let otp;

// async function sendOtp(request, response) {
//   email = request.body.email;
//   if (!email) return errorResponse(response, 400, "email cannot be empty");
//   if (!validator.isEmail(email))
//     return errorResponse(response, 400, "invalid email");
//   otp = Math.random();
//   otp = otp * 1000000;
//   otp = parseInt(otp);
//   console.log(otp);
//   // send mail with defined transport object
//   const mailOptions = {
//     to: request.body.email,
//     subject: "Otp for registration is: ",
//     html:
//       "<h3>OTP for account verification is </h3>" +
//       "<h1 style='font-weight:bold;'>" +
//       otp +
//       "</h1>", // html body
//   };
//   try {
//     const result = await transporter.sendMail(mailOptions);
//     successResponse(response, 200, { result: result, otp: otp });
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function verifyOtp(request, response) {
//   if (request.body.otp == otp) {
//     response.send("You has been successfully registered");
//   } else {
//     response.send("otp is incorrect");
//   }
// }

// async function resendOtp(req, res) {
//   otp = Math.random();
//   otp = otp * 1000000;
//   otp = parseInt(otp);
//   console.log(otp);
//   var mailOptions = {
//     to: email,
//     subject: "Otp for registration is: ",
//     html:
//       "<h3>OTP for account verification is </h3>" +
//       "<h1 style='font-weight:bold;'>" +
//       otp +
//       "</h1>", // html body
//   };
//   try {
//     const result = await transporter.sendMail(mailOptions);
//   } catch (error) {}
// }

module.exports = {
  createUser,
  login,
  verifyToken,
  getUserByEmail,
  
};
