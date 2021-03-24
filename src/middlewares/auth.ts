import { NextFunction, Request, Response } from "express";
import { redisClient } from "../dbConfig";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json("Unauthorized!");
  }
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(401).json("Unauthorized!");
    }
    return next();
  });
};
