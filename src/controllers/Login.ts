import { createSession } from "./../utils/functions";
import { Session } from "./../models/User";
import { db, redisClient } from "./../dbConfig";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const handleLogin = async (req: Request) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject("incorrect form submission");
  }
  try {
    const emailToLogin = await db
      .select("email", "hash")
      .from("login")
      .where("email", "=", email);

    const isValid = bcrypt.compareSync(password, emailToLogin[0].hash);
    if (isValid) {
      try {
        const userToLogin = await db
          .select("*")
          .from("users")
          .where("email", "=", email);
        return userToLogin[0];
      } catch {
        return Promise.reject("Unable to get user!");
      }
    } else {
      throw Error();
    }
  } catch {
    return Promise.reject("Wrong credentials!");
  }
};

const getAuthTokenId = (req: any, res: Response): boolean => {
  const { authorization } = req.headers;
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(400).json("Unauthorized");
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
  } catch (err) {
    return res.status(400).json(err);
  }
};
