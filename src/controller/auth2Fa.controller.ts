import speakeasy from "speakeasy";
import { customAlphabet } from "nanoid";
import { Request, Response } from "express";

import { getUserByEmailDal, updateUserDal } from "../DataAccessLayer/user.dal";
import { errorResponse, successResponse } from "../utils/response.utils";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  20
);

async function register2Fa(request: Request, response: Response) {
  const { email } = request.body;

  try {
    let user = await getUserByEmailDal(email);
    if (!user) return response.sendStatus(403);

    if (!user.verified)
      return successResponse(
        response,
        400,
        "You have not verified email please verify it before registering for 2 fa"
      );

    if (user.account_status !== "active")
      return successResponse(
        response,
        400,
        "You account is not active contact support"
      );
    if (user.multi_factor_enabled)
      return successResponse(response, 200, "You have already enabled 2 fa");

    const tempSecret = speakeasy.generateSecret();
    user.secret = tempSecret.base32;
    await updateUserDal(user.user_id, user);
    return successResponse(response, 200, { secret: tempSecret });
  } catch (error) {
    return errorResponse(response, 500, "Error generating secret key");
  }
}

async function verify2Fa(request: Request, response: Response) {
  const { email } = request.body;

  const { token }: { token: string } = request.body;

  try {
    let user = await getUserByEmailDal(email);
    if (!user) return response.sendStatus(403);

    if (!user.verified)
      return successResponse(
        response,
        400,
        "You have not verified email please verify it before verifying for 2 fa"
      );

    if (user.account_status !== "active")
      return successResponse(
        response,
        400,
        "You account is not active contact support"
      );
    if (user.multi_factor_enabled)
      return successResponse(response, 200, "You have already enabled 2 fa");

    const tempSecret = user.secret;
    const tokenValidates = speakeasy.totp.verify({
      secret: tempSecret,
      encoding: "base32",
      token,
      window: 2,
    });

    if (tokenValidates) {
      const backup = nanoid();
      user.secret_backup = backup;
      user.multi_factor_enabled = true;
      await updateUserDal(user.user_id, user);
      return successResponse(response, 200, { validated: true, backup });
    } else {
      return successResponse(response, 200, { validated: false });
    }
  } catch (error) {
    return errorResponse(response, 500, "Error generating secret key");
  }
}

async function verify2FaFuture(request: Request, response: Response) {
  const { email } = request.body;

  const { token }: { token: string } = request.body;

  try {
    let user = await getUserByEmailDal(email);
    if (!user) return response.sendStatus(403);

    if (!user.verified)
      return successResponse(
        response,
        400,
        "You have not verified email please verify it before verifying for 2 fa"
      );

    if (user.account_status !== "active")
      return successResponse(
        response,
        400,
        "You account is not active contact support"
      );
    if (!user.multi_factor_enabled)
      return successResponse(response, 200, "You have not enabled 2 fa yet");

    const tempSecret = user.secret;
    const tokenValidates = speakeasy.totp.verify({
      secret: tempSecret,
      encoding: "base32",
      token,
      window: 2,
    });

    if (tokenValidates) {
      return successResponse(response, 200, { validated: true });
    } else {
      return successResponse(response, 200, { validated: false });
    }
  } catch (error) {
    return errorResponse(response, 500, "Error generating secret key");
  }
}

async function verifyBackupCode(request: Request, response: Response) {
  const { email } = request.body;

  const { backup }: { backup: string } = request.body;

  try {
    let user = await getUserByEmailDal(email);
    if (!user) return response.sendStatus(403);

    if (!user.verified)
      return successResponse(
        response,
        400,
        "You have not verified email please verify it before verifying for backup code"
      );

    if (user.account_status !== "active")
      return successResponse(
        response,
        400,
        "You account is not active contact support"
      );
    if (!user.multi_factor_enabled)
      return successResponse(response, 200, "You have not enabled 2 fa yet");

    if (user.secret_backup === backup) {
      return successResponse(response, 200, { validated: true });
    } else {
      user.account_status = "disabled";
      await updateUserDal(user.user_id, user);
      return successResponse(response, 200, { validated: false });
    }
  } catch (error) {
    return errorResponse(response, 500, error);
  }
}

export default {
  register2Fa,
  verify2Fa,
  verify2FaFuture,
  verifyBackupCode,
};
