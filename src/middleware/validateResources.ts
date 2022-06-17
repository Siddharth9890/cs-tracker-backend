import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

const validate =
  (schema: AnyZodObject) =>
  (request: Request, response: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: request.body,
        params: request.params,
        query: request.query,
      });
      next();
    } catch (error: any) {
      response.status(400).send(error.format());
    }
  };

const validateAsync =
  (schema: AnyZodObject) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: request.body,
        params: request.params,
        query: request.query,
      });
      next();
    } catch (error: any) {
      return response.status(400).send(error.format());
    }
  };

export { validate, validateAsync };
