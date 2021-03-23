"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAuthentication = void 0;
var dbConfig_1 = require("./../dbConfig");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var handleLogin = function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (!email || !password) {
        return Promise.reject("incorrect form submission");
    }
    return dbConfig_1.db
        .select("email", "hash")
        .from("login")
        .where("email", "=", email)
        .then(function (data) {
        var isValid = bcrypt_1.default.compareSync(password, data[0].hash);
        if (isValid) {
            return dbConfig_1.db
                .select("*")
                .from("users")
                .where("email", "=", email)
                .then(function (user) { return user[0]; })
                .catch(function () { return Promise.reject("unable to get user"); });
        }
        else {
            Promise.reject("wrong credentials");
        }
    })
        .catch(function () { return Promise.reject("wrong credentials"); });
};
var getAuthTokenId = function (req, res) {
    var authorization = req.headers.authorization;
    return dbConfig_1.redisClient.get(authorization, function (err, reply) {
        if (err || !reply) {
            return res.status(400).json("Unauthorized");
        }
        return res.json({ id: reply });
    });
};
var signToken = function (email) {
    var jwtPayload = { email: email };
    return jsonwebtoken_1.default.sign(jwtPayload, "JWT_SECRET", { expiresIn: "2 days" });
};
var setToken = function (key, value) {
    return Promise.resolve(dbConfig_1.redisClient.set(key, value));
};
var createSessions = function (user) {
    //JWT token, return user data
    var email = user.email, id = user.id;
    var token = signToken(email);
    return setToken(token, id)
        .then(function () {
        return { success: "true", userId: id, token: token };
    })
        .catch(console.log);
};
var loginAuthentication = function () { return function (req, res) {
    var authorization = req.headers.authorization;
    return authorization
        ? getAuthTokenId(req, res)
        : handleLogin(req, res)
            .then(function (data) {
            return data.id && data.email
                ? createSessions(data)
                : Promise.reject(data);
        })
            .then(function (session) { return res.json(session); })
            .catch(function (err) { return res.status(400).json(err); });
}; };
exports.loginAuthentication = loginAuthentication;
