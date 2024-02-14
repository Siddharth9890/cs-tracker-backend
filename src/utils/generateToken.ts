import { UserOutput } from "../models/User";
import jwt from "jsonwebtoken";

function generateTokens(user: UserOutput) {
  // this token is to be used everywhere to make access on behalf of the user
  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY,
    }
  );

  // this is the main cookie hidden from the user
  const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY,
  });
  return { accessToken, refreshToken };
}

export default generateTokens;
