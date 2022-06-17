import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

type JwtPayload = {
  role: string;
  _id: string;
};

const verifyAdminPermission = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader: string | undefined = request.headers["authorization"];
  if (!authHeader) return response.sendStatus(401);
  const token = authHeader.split(" ")[1];
  try {
    const { role, _id } = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;
    if (role === "user") return response.sendStatus(403);
    next();
  } catch (error) {
    return response.sendStatus(403);
  }
};

export default verifyAdminPermission;
