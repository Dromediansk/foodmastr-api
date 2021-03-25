"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRecordAdd = exports.handleRecordsGet = void 0;
var dbConfig_1 = require("./../dbConfig");
var handleRecordsGet = function (req, res, type) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, dateFrom, dateTo, records, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                _a = req.body, dateFrom = _a.dateFrom, dateTo = _a.dateTo;
                if (!dateFrom || !dateTo) {
                    return [2 /*return*/, res.status(400).json("Please add correct date range!")];
                }
                if (dateTo < dateFrom) {
                    return [2 /*return*/, res.status(400).json("Incorrect date range!")];
                }
                return [4 /*yield*/, dbConfig_1.db
                        .select("*")
                        .from("records")
                        .where({ user_id: userId })
                        .where({ type: type })
                        .whereBetween("created", [dateFrom, dateTo])];
            case 1:
                records = _c.sent();
                if (!records) {
                    throw Error();
                }
                if (records.length === 0) {
                    return [2 /*return*/, res.status(200).json("No records found!")];
                }
                else {
                    return [2 /*return*/, res.json(records)];
                }
                return [3 /*break*/, 3];
            case 2:
                _b = _c.sent();
                return [2 /*return*/, res.status(500).json("Unable to get records!")];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.handleRecordsGet = handleRecordsGet;
var handleRecordAdd = function (req, res, type) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, amount, currency, categoryId, accountId, description;
    return __generator(this, function (_b) {
        userId = req.params.userId;
        _a = req.body, amount = _a.amount, currency = _a.currency, categoryId = _a.categoryId, accountId = _a.accountId, description = _a.description;
        if (!categoryId || !accountId) {
            return [2 /*return*/, res.status(400).json("Missing category or account!")];
        }
        dbConfig_1.db.transaction(function (trx) { return __awaiter(void 0, void 0, void 0, function () {
            var newRecord, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, trx("records").returning("*").insert({
                                type: type,
                                user_id: userId,
                                amount: amount,
                                currency: currency,
                                category_id: categoryId,
                                account_id: accountId,
                                description: description,
                                created: new Date(),
                            })];
                    case 1:
                        newRecord = _b.sent();
                        res.json(newRecord[0]);
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, res.status(500).json("Unable to add record!")];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.handleRecordAdd = handleRecordAdd;
