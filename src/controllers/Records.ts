import { Knex } from "knex";
import { db } from "./../dbConfig";
import { Records, Record } from "./../models/Records";
import { Request, Response } from "express";

export const handleRecordsGet = async (
  req: Request,
  res: Response,
  type: Records
): Promise<Response> => {
  try {
    const { userId } = req.params;
    const { dateFrom, dateTo } = req.body;

    if (!dateFrom || !dateTo) {
      return res.status(400).json("Please add correct date range!");
    }
    if (dateTo < dateFrom) {
      return res.status(400).json("Incorrect date range!");
    }

    const records: Record[] = await db
      .select("*")
      .from("records")
      .where({ user_id: userId, type })
      .whereBetween("created", [dateFrom, dateTo]);

    if (!records) {
      throw Error();
    }
    if (records.length === 0) {
      return res.status(200).json("No records found!");
    } else {
      return res.json(records);
    }
  } catch {
    return res.status(500).json("Unable to get records!");
  }
};

export const handleRecordAdd = (req: Request, res: Response, type: Records) => {
  const { userId } = req.params;
  const { amount, currency, categoryId, accountId, description } = req.body;

  if (!categoryId || !accountId) {
    return res.status(400).json("Missing category or account!");
  }

  db.transaction(
    async (trx: Knex.Transaction): Promise<Response> => {
      try {
        const newRecord = await trx("records").returning("*").insert({
          type,
          user_id: userId,
          amount,
          currency,
          category_id: categoryId,
          account_id: accountId,
          description,
          created: new Date(),
        });
        return res.json(newRecord[0]);
      } catch {
        return res.status(500).json("Unable to add record!");
      }
    }
  );
};

export const handleRecordDelete = (
  req: Request,
  res: Response,
  type: Records
) => {
  const { userId } = req.params;
  const { recordId } = req.body;

  if (!recordId) {
    return res.status(400).json("Missing record!");
  }

  db.transaction(
    async (trx: Knex.Transaction): Promise<Response> => {
      try {
        await trx("records")
          .del()
          .where({ user_id: userId, id: recordId, type });
        return res.status(200).json("Record deleted successfully!");
      } catch {
        return res.status(500).json("Unable to delete record!");
      }
    }
  );
};
