import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

const verifyJWT = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader: string | undefined = request.headers["authorization"];
  if (!authHeader) return response.sendStatus(401);
  const token = authHeader.split(" ")[1];
  console.log(token);
  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch (error) {
    return response.sendStatus(403);
  }
};

export default verifyJWT;
