import { Response } from "express";

const successResponse = (response: Response, statsCode: number, body: any) => {
  return response.status(statsCode).send({
    message: "success",
    body,
  });
};

const errorResponse = (response: Response, statsCode: number, error: any) => {
  return response.status(statsCode).send({
    message: "failed",
    error,
  });
};

export { successResponse, errorResponse };
