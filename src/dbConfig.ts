import { Knex, knex } from "knex";
import redis, { RedisClient } from "redis";

// setup postgres
export const db: Knex = knex({
  client: "pg",
  connection: process.env.POSTGRES_URI,
});

//setup Redis
export const redisClient = redis.createClient({
  host: "redis",
  port: 6379,
});
