import { Knex, knex } from "knex";
import redis from "redis";

// setup postgres
export const db: Knex = knex({
  client: "pg",
  // connection: {
  //   host: "127.0.0.1",
  //   user: "root",
  //   password: "root",
  //   database: "xpense",
  // },
  connection: process.env.POSTGRES_URI,
});

//setup Redis
export const redisClient = redis.createClient({
  host: "redis",
  port: 6379,
});
