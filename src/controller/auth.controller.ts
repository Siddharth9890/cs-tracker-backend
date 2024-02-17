import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";

import { errorResponse, successResponse } from "../utils/response.utils";
import {
  createUserDal,
  getUserByEmailDal,
  getUserByRefreshTokenDal,
  updateUserDal,
} from "../DataAccessLayer/user.dal";
import { sendMail } from "../utils/email";
import generateTokens from "../utils/generateToken";
import { UserOutput } from "../models/User";

dotenv.config();

export async function createUser(request: Request, response: Response) {
  let payload = request.body;
  try {
    let user = await createUserDal(payload);
    await sendEmail(user);
    const detailsToSend = {
      email: user.email,
      verified: false,
      codeSend: user.verificationCode,
    };
    return successResponse(response, 201, { detailsToSend });
  } catch (error: any) {
    console.log(error);
    const message = "Something went wrong please try again";
    return errorResponse(response, 500, message);
  }
}

async function login(request: Request, response: Response) {
  const { email } = request.body;
  try {
    let user = await getUserByEmailDal(email);
    if (user.accountStatus !== "active")
      return successResponse(response, 400, {
        message: "You account is not active contact support",
      });
    await sendEmail(user);

    const detailsToSend = {
      email: user.email,
      verified: user.verified,
      codeSend: true,
    };
    return successResponse(response, 200, { detailsToSend });
  } catch (error) {
    return errorResponse(response, 500, error);
  }
}

async function getUserAndGenerateTokens(request: Request, response: Response) {
  const { email } = request.body;
  try {
    let user = await getUserByEmailDal(email);
    const { accessToken, refreshToken } = generateTokens(user);
    console.log(accessToken, refreshToken);
    user.refreshToken = refreshToken;
    user = await updateUserDal(user.id, user);
    user.refreshToken = "";
    const date = new Date();
    date.setDate(date.getDate() + parseInt(process.env.COOKIE_MAX_AGE!));
    response.cookie("jwt", refreshToken, {
      httpOnly: false,
      expires: date,
      path: "/",
      sameSite: "none",
    });
    return successResponse(response, 200, { user, accessToken });
  } catch (error) {
    return errorResponse(response, 500, error);
  }
}

async function updateUser(request: Request, response: Response) {
  const { user }: { user: UserOutput } = request.body;
  const cookies = request.cookies;
  if (!cookies?.jwt) return response.sendStatus(204);
  try {
    const refreshToken = cookies.jwt;
    if (!user.verified) {
      return successResponse(response, 200, {
        message: "Account is not verified!",
      });
    }
    await updateUserDal(user.id, user);
    return successResponse(response, 201, { user });
  } catch (error) {
    return errorResponse(response, 500, error);
  }
}

async function sendEmail(user: UserOutput) {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);

    // await sendMail(user.userName, user.email, otp);
    user.verificationCode = otp;
    user.accountStatus = "admin";
    user.verified = true;
    await updateUserDal(user.id, user);
  } catch (error) {
    console.log(error);
  }
}

async function verifyAndValidateUser(request: Request, response: Response) {
  const { email } = request.body;
  const { otp } = request.body;
  try {
    const user = await getUserByEmailDal(email);

    if (user.accountStatus !== "active")
      return successResponse(response, 400, {
        message: "You account is not active contact support",
      });

    if (user.verificationCode !== otp)
      return successResponse(response, 400, {
        message: "Otp entered is incorrect",
      });

    user.verified = true;
    user.verificationCode = 0;
    await updateUserDal(user.id, user);
    return successResponse(response, 200, { verified: true });
  } catch (error) {
    return errorResponse(response, 500, {
      message: "Something went wrong please try again or contact support",
    });
  }
}

// add secure :- true and same site as none
async function logout(request: Request, response: Response) {
  const cookies = request.cookies;
  if (!cookies?.jwt) return response.sendStatus(204);

  try {
    const refreshToken: string = cookies.jwt;

    let user = await getUserByRefreshTokenDal(refreshToken);
    if (!user) {
      response.clearCookie("jwt", { httpOnly: true });
      return response.sendStatus(400);
    }

    user.refreshToken = "";
    await updateUserDal(user.id, user);
    response.clearCookie("jwt", { httpOnly: true });
    return response.sendStatus(204);
  } catch (error) {
    return response.sendStatus(403);
  }
}

async function handleRefreshToken(request: Request, response: Response) {
  const cookies = request.cookies;
  console.log(cookies);
  if (!cookies?.jwt) return response.sendStatus(204);

  try {
    const refreshToken: string = cookies.jwt;
    console.log(refreshToken.length);

    let user = await getUserByRefreshTokenDal(refreshToken);
    if (!user) return response.sendStatus(403);

    if (user.accountStatus !== "active")
      return successResponse(response, 400, {
        message: "You account is not active contact support",
      });
    jwt.verify(refreshToken, process.env.JWT_SECRET!);

    const { accessToken } = generateTokens(user);
    return response.json({ accessToken });
  } catch (error) {
    return response.sendStatus(403);
  }
}

async function getUserRefreshToken(request: Request, response: Response) {
  const cookies = request.cookies;
  if (!cookies?.jwt) return response.sendStatus(204);

  try {
    const refreshToken: string = cookies.jwt;

    let user = await getUserByRefreshTokenDal(refreshToken);
    if (!user) return response.sendStatus(404);

    if (user.accountStatus !== "active")
      return successResponse(response, 400, {
        message: "You account is not active contact support",
      });
    user.refreshToken = "";
    return response.json({ user });
  } catch (error) {
    console.log(error);
    return response.sendStatus(500);
  }
}

export default {
  createUser,
  login,
  logout,
  handleRefreshToken,
  sendEmail,
  verifyAndValidateUser,
  getUserRefreshToken,
  getUserAndGenerateTokens,
  updateUser,
};
