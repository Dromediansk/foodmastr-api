"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Records_1 = require("./models/Records");
var auth_1 = require("./middlewares/auth");
var AppRouter_1 = require("./AppRouter");
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var Login_1 = require("./controllers/Login");
var Register_1 = require("./controllers/Register");
var Records_2 = require("./controllers/Records");
var app = express_1.default();
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(AppRouter_1.AppRouter.getInstance());
// controllers
app.get("/", function (req, res) { return res.send("It's working!"); });
// auth
app.post("/login", Login_1.loginAuthentication());
app.post("/register", function (req, res) {
    Register_1.handleRegister(req, res);
});
// records
app.get("/expenses/:userId", auth_1.requireAuth, function (req, res) {
    Records_2.handleRecordsGet(req, res, Records_1.Records.EXPENSE);
});
app.get("/incomes/:userId", auth_1.requireAuth, function (req, res) {
    Records_2.handleRecordsGet(req, res, Records_1.Records.INCOME);
});
app.post("/expenses/:userId", auth_1.requireAuth, function (req, res) {
    Records_2.handleRecordAdd(req, res, Records_1.Records.EXPENSE);
});
app.post("/incomes/:userId", auth_1.requireAuth, function (req, res) {
    Records_2.handleRecordAdd(req, res, Records_1.Records.INCOME);
});
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("App listening on port " + PORT);
});
