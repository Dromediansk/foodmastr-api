import { db, redisClient } from "./../dbConfig";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface Session {
  userId: number;
  success: boolean;
  token: string;
}

const handleLogin = (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject("incorrect form submission");
  }
  return db
    .select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data: { hash: string }[]) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => user[0])
          .catch(() => Promise.reject("unable to get user"));
      } else {
        Promise.reject("wrong credentials");
      }
    })
    .catch(() => Promise.reject("wrong credentials"));
};

const getAuthTokenId = (req: any, res: Response) => {
  const { authorization } = req.headers;
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(400).json("Unauthorized");
    }
    return res.json({ id: reply });
  });
};

const signToken = (email: string) => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, "JWT_SECRET", { expiresIn: "2 days" });
};

const setToken = (key: string, value: string) => {
  return Promise.resolve(redisClient.set(key, value));
};

const createSessions = (user: {
  id: string;
  email: string;
}): Promise<Session> => {
  //JWT token, return user data
  const { email, id } = user;
  const token = signToken(email);
  return setToken(token, id)
    .then(() => {
      return { success: true, userId: id, token };
    })
    .catch((err) => {
      return err;
    });
};

export const loginAuthentication = () => (req: Request, res: Response) => {
  const { authorization } = req.headers;
  return authorization
    ? getAuthTokenId(req, res)
    : handleLogin(req, res)
        .then((data: { id: string; email: string }) => {
          return data.id && data.email
            ? createSessions(data)
            : Promise.reject(data);
        })
        .then((session): Response<Session> => res.json(session))
        .catch((err) => res.status(400).json(err));
};
