import { NextFunction, Request, Response } from "express";
import { redisClient } from "../dbConfig";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization, userid } = req.headers; // token + user id
  // when testing in Postman, insert in headers:
  // authorization: <token>
  if (!authorization || !userid) {
    return res.status(401).json("Unauthorized!");
  }
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply || reply !== userid) {
      return res.status(401).json("Unauthorized!");
    }
    return next();
  });
};
