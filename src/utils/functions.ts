import { Session } from "./../models/User";
import { redisClient } from "./../dbConfig";
import jwt from "jsonwebtoken";

const signToken = (email: string): string => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, "JWT_SECRET", { expiresIn: "2 days" });
};

const setToken = (key: string, id: number): Promise<boolean> => {
  return Promise.resolve(redisClient.set(key, id.toString()));
};

export const deleteToken = async (
  authorization: string,
  userId: number
): Promise<boolean> => {
  return Promise.resolve(redisClient.del(authorization, userId.toString()));
};

export const createSession = async (user: {
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
