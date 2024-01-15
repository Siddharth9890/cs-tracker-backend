import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { customAlphabet } from "nanoid";

import { errorResponse, successResponse } from "../utils/response.utils";
import {
  createUserDal,
  deleteUserByIdDal,
  getUserByEmailDal,
  getUserByRefreshTokenDal,
  updateUserDal,
} from "../DataAccessLayer/user.dal";
import { sendMail } from "../utils/email";
import generateTokens from "../utils/generateToken";
import { UserOutput } from "../models/User";

dotenv.config();

const nanoid = customAlphabet("0123456789", 6);

export async function createUser(request: Request, response: Response) {
  let payload = request.body;
  try {
    let user = await createUserDal(payload);

    const detailsToSend = {
      email: user.email,
      multi_factor_enabled: user.multi_factor_enabled,
      verified: user.verified,
    };
    return successResponse(response, 201, { detailsToSend });
  } catch (error: any) {
    const message = "Something went wrong please try again";
    return errorResponse(response, 500, message);
  }
}

async function login(request: Request, response: Response) {
  const { email } = request.body;
  try {
    let user = await getUserByEmailDal(email);

    const detailsToSend = {
      email: user.email,
      multi_factor_enabled: user.multi_factor_enabled,
      verified: user.verified,
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
    user.refresh_token = refreshToken;
    user = await updateUserDal(user.user_id, user);
    user.refresh_token = "";
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
    if (refreshToken.length !== 187) return response.sendStatus(401);
    if (!user.verified || !user.multi_factor_enabled) {
      return successResponse(
        response,
        200,
        "Account is not verified or mfa is not enabled"
      );
    }
    await updateUserDal(user.user_id, user);
    return successResponse(response, 201, { user });
  } catch (error) {
    return errorResponse(response, 500, error);
  }
}

async function sendEmail(request: Request, response: Response) {
  const { email } = request.body;
  try {
    const user = await getUserByEmailDal(email);

    if (user.verified) {
      return successResponse(response, 200, "Account is already verified");
    }

    const otp = nanoid();
    await sendMail(user.user_name, email, otp);
    return successResponse(response, 201, { otp });
  } catch (error) {
    return errorResponse(response, 500, error);
  }
}

async function verifyAndValidateUser(request: Request, response: Response) {
  const { email } = request.body;
  const { otp } = request.body;
  try {
    const user = await getUserByEmailDal(email);

    if (user.verified) {
      return successResponse(response, 200, "Account is already verified");
    }

    user.verified = true;
    await updateUserDal(user.user_id, user);
    return successResponse(response, 200, "Account is verified");
  } catch (error) {
    return errorResponse(
      response,
      500,
      "Something went wrong please try again or contact support"
    );
  }
}

// add secure :- true and same site as none
async function logout(request: Request, response: Response) {
  const cookies = request.cookies;
  if (!cookies?.jwt) return response.sendStatus(204);

  try {
    const refreshToken: string = cookies.jwt;
    if (refreshToken.length !== 187) return response.sendStatus(401);

    let user = await getUserByRefreshTokenDal(refreshToken);
    if (!user) {
      response.clearCookie("jwt", { httpOnly: true });
      return response.sendStatus(400);
    }

    user.refresh_token = "";
    await updateUserDal(user.user_id, user);
    response.clearCookie("jwt", { httpOnly: true });
    return response.sendStatus(204);
  } catch (error) {
    return response.sendStatus(403);
  }
}

async function handleRefreshToken(request: Request, response: Response) {
  const cookies = request.cookies;
  if (!cookies?.jwt) return response.sendStatus(204);

  try {
    const refreshToken: string = cookies.jwt;
    if (refreshToken.length !== 187) return response.sendStatus(401);

    let user = await getUserByRefreshTokenDal(refreshToken);
    if (!user) return response.sendStatus(403);

    if (user.account_status !== "active")
      return successResponse(
        response,
        400,
        "You account is not active contact support"
      );
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
    if (refreshToken.length !== 187) return response.sendStatus(401);

    let user = await getUserByRefreshTokenDal(refreshToken);
    if (!user) return response.sendStatus(404);

    if (user.account_status !== "active")
      return successResponse(
        response,
        400,
        "You account is not active contact support"
      );
    user.refresh_token = "";
    return response.json({ user });
  } catch (error) {
    console.log(error);
    return response.sendStatus(500);
  }
}

async function deleteAccount(request: Request, response: Response) {
  const cookies = request.cookies;
  if (!cookies?.jwt) return response.sendStatus(204);

  try {
    const refreshToken: string = cookies.jwt;
    if (refreshToken.length !== 187) return response.sendStatus(401);

    let user = await getUserByRefreshTokenDal(refreshToken);
    if (!user) return response.sendStatus(404);

    await deleteUserByIdDal(user.user_id);
    user.account_status = "deleted";
    await updateUserDal(user.user_id, user);
    return response.json({ deleted: "true" });
  } catch (error) {
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
  deleteAccount,
  getUserAndGenerateTokens,
  updateUser,
};
