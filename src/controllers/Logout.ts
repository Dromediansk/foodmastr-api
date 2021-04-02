import { Response, Request } from "express";
import { deleteSession } from "../utils/auth-functions";

export const handleLogout = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId } = req.body;
    const { authorization } = req.headers;

    if (authorization) {
      await deleteSession(authorization, userId);
      return res.status(200).json("User logged out successfully!");
    } else {
      throw Error();
    }
  } catch {
    return res.status(500).json("Failed to log out the user!");
  }
};
