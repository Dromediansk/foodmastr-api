import { Session } from "../models/User";
import { redisClient } from "../dbConfig";
import jwt from "jsonwebtoken";

const signToken = (email: string): string => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, "JWT_SECRET", { expiresIn: "2 days" });
};

const setToken = (key: string, id: string): Promise<boolean> => {
  return Promise.resolve(redisClient.set(key, id));
};

export const deleteSession = async (
  authorization: string,
  userId: string
): Promise<boolean> => {
  return Promise.resolve(redisClient.del(authorization, userId));
};

export const createSession = async (user: {
  id: number;
  email: string;
}): Promise<Session> => {
  try {
    //JWT token, return user data
    const { email, id } = user;
    const token = signToken(email);
    await setToken(token, id.toString());

    return { success: true, userId: id, token };
  } catch (err) {
    return err;
  }
};
