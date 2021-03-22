import express from "express";
import { AppRouter } from "./AppRouter";
import { Knex, knex } from "knex";

const db: Knex.Config = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "",
    database: "postgres",
  },
  // client: "pg",
  // connection: {
  //   connectionString: process.env.DATABASE_URL,
  //   ssl: true,
  // },
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(AppRouter.getInstance());

app.get("/", (req, res) => {
  res.send("it is working!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
