import { AUTH, GENERAL } from "./../utils/ErrorCodes";
import { createSession } from "../utils/auth-functions";
import { Session } from "./../models/User";
import { db, redisClient } from "./../dbConfig";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const handleLogin = async (req: Request) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject({ code: AUTH.INVALID_CREDENTIALS });
  }
  try {
    const emailToLogin = await db
      .select("email", "hash")
      .from("login")
      .where("email", "=", email);

    if (emailToLogin.length === 0) {
      return Promise.reject({ code: AUTH.INVALID_CREDENTIALS });
    }
    const isValid = bcrypt.compareSync(password, emailToLogin[0].hash);
    if (isValid) {
      try {
        const userToLogin = await db
          .select("*")
          .from("users")
          .where("email", "=", email);
        return userToLogin[0];
      } catch {
        return Promise.reject({ code: GENERAL.INTERNAL_SERVER_ERROR });
      }
    } else {
      return Promise.reject({ code: AUTH.INVALID_CREDENTIALS });
    }
  } catch {
    return Promise.reject({ code: AUTH.INVALID_CREDENTIALS });
  }
};

const getAuthTokenId = (req: any, res: Response): boolean => {
  const { authorization } = req.headers;
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(401).json({ code: AUTH.UNAUTHORIZED });
    }
    return res.status(200).json({ id: reply });
  });
};

export const loginAuthentication = () => async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { authorization } = req.headers;

    const userToLogin = authorization
      ? getAuthTokenId(req, res)
      : await handleLogin(req);

    if (userToLogin.id && userToLogin.email) {
      const session: Session = await createSession(userToLogin);
      return res.json(session);
    } else {
      return Promise.resolve(userToLogin);
    }
  } catch {
    return res.status(400).json({ code: AUTH.INVALID_CREDENTIALS });
  }
};
