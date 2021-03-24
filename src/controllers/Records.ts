import { Records } from "./../models/Records";
import { db } from "../dbConfig";
import { Request, Response } from "express";

export const handleRecordsGet = async (
  req: Request,
  res: Response,
  type: Records
) => {
  try {
    const { userId } = req.params;

    const records = await db
      .select("*")
      .from("records")
      .where({ user_id: userId })
      .where({ type });

    if (!records) {
      throw Error();
    }
    if (records.length === 0) {
      return res.status(200).json("No records found!");
    } else {
      res.json(records);
    }
  } catch (err) {
    return res.status(500).json("Unable to get records!");
  }
};
