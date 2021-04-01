import { NextFunction, Request, Response } from "express";
import { redisClient } from "../dbConfig";
import { AUTH } from "../utils/ErrorCodes";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers; // token + user id
  // when testing in Postman, insert in headers:
  // authorization: <token>
  if (!authorization) {
    return res.status(401).json({ code: AUTH.UNAUTHORIZED });
  }
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(401).json({ code: AUTH.UNAUTHORIZED });
    }
    return next();
  });
};
