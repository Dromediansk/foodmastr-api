import { db, redisClient } from "./../dbConfig";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface Session {
  userId: number;
  success: boolean;
  token: string;
}

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
    return res.json({ id: reply });
  });
};

const signToken = (email: string): string => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, "JWT_SECRET", { expiresIn: "2 days" });
};

const setToken = (key: string, id: number): Promise<boolean> => {
  return Promise.resolve(redisClient.set(key, id.toString()));
};

const createSession = async (user: {
  id: number;
  email: string;
}): Promise<Session> => {
  try {
    //JWT token, return user data
    const { email, id } = user;
    const token = signToken(email);

    await setToken(token, id);
    return { success: true, userId: id, token };
  } catch (err) {
    return err;
  }
};

export const loginAuthentication = () => async (
  req: Request,
  res: Response
) => {
  try {
    const { authorization } = req.headers;

    const userToLogin = authorization
      ? getAuthTokenId(req, res)
      : await handleLogin(req);

    if (userToLogin.id && userToLogin.email) {
      const session = await createSession(userToLogin);
      return res.json(session);
    } else {
      Promise.reject(userToLogin);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};
