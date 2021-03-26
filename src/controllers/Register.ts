import { createSession } from "../utils/auth-functions";
import { User } from "./../models/User";
import { db } from "./../dbConfig";
import bcrypt from "bcrypt";
import { Knex } from "knex";
import { Request, Response } from "express";

export const handleRegister = (req: Request, res: Response) => {
  const {
    email,
    firstName,
    lastName,
    password,
    currentLang,
    balance,
    currency,
  } = req.body;

  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }

  db.transaction(
    async (trx: Knex.Transaction): Promise<Response> => {
      try {
        const saltRounds: number = 9;
        const hash: string = bcrypt.hashSync(password, saltRounds);
        const loginEmail: string[] = await trx
          .insert({
            hash: hash,
            email: email,
          })
          .into("login")
          .returning("email");

        const emailInUse: string[] = await trx.select("*").from("users").where({
          email: loginEmail[0],
        });
        if (emailInUse.length !== 0) {
          return res.status(400).json("email address already in use!");
        }
        const newUser: User[] = await trx("users").returning("*").insert({
          email: loginEmail[0],
          firstName,
          lastName,
          currentLang,
          balance,
          currency,
          joined: new Date(),
        });
        const session = await createSession({
          id: newUser[0].id,
          email: newUser[0].email,
        });
        return res.json(session);
      } catch {
        return res.status(400).json("unable to register");
      }
    }
  );
};
