"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var Login_1 = require("./controllers/Login");
var Register_1 = require("./controllers/Register");
var app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
// controllers
app.get("/", function (req, res) { return res.send("It's working!"); });
app.post("/login", Login_1.loginAuthentication());
app.post("/register", function (req, res) {
    Register_1.handleRegister(req, res);
});
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("App listening on port " + PORT);
});
