"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var AppRouter_1 = require("./AppRouter");
var knex_1 = require("knex");
var db = knex_1.knex({
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
var app = express_1.default();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(AppRouter_1.AppRouter.getInstance());
app.get("/", function (req, res) {
    res.send("it is working!");
});
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("App listening on port " + PORT);
});
