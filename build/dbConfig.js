"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = exports.db = void 0;
var knex_1 = require("knex");
var redis_1 = __importDefault(require("redis"));
// setup postgres
exports.db = knex_1.knex({
    client: "pg",
    connection: process.env.POSTGRES_URI,
});
//setup Redis
exports.redisClient = redis_1.default.createClient({
    host: "redis",
    port: 6379,
});
