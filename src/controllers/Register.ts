import { db } from "./../dbConfig";
import bcrypt from "bcrypt";
import { Knex } from "knex";
import { Request, Response } from "express";

export const handleRegister = (req: Request, res: Response) => {
  const { email, first_name, last_name, password, current_lang } = req.body;
  if (!email || !first_name || !last_name || !password) {
    return res.status(400).json("incorrect form submission");
  }

  db.transaction(async (trx: Knex.Transaction) => {
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
        res.status(400).json("email address already in use!");
      }
      const newUser: any = await trx("users").returning("*").insert({
        email: loginEmail[0],
        first_name,
        last_name,
        current_lang,
        joined: new Date(),
      });
      res.json(newUser[0]);
      trx.commit;
    } catch (err) {
      console.log("err", err);
      res.status(400).json("unable to register");
    }
  });
};
