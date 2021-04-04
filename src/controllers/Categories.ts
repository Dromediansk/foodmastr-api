import { db } from "./../dbConfig";
import { Category } from "./../models/Categories";
import { Request, Response } from "express";
import { GENERAL } from "../utils/ErrorCodes";

export const handleAllCategoriesGet = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId } = req.params;

    const categories: Category[] = await db
      .select("*")
      .from("record_categories")
      .where({ user_id: userId });

    return res.json(categories);
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ code: GENERAL.INTERNAL_SERVER_ERROR });
  }
};
