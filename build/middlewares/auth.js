"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
var dbConfig_1 = require("../dbConfig");
var requireAuth = function (req, res, next) {
    var authorization = req.headers.authorization;
    // when testing in Postman, insert in headers:
    // authorization: <token>
    if (!authorization) {
        return res.status(401).json("Unauthorized!");
    }
    return dbConfig_1.redisClient.get(authorization, function (err, reply) {
        if (err || !reply) {
            return res.status(401).json("Unauthorized!");
        }
        return next();
    });
};
exports.requireAuth = requireAuth;
