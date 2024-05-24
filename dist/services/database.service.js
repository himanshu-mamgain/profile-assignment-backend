"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoDBConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoDBConnection = () => {
    const dbConnUrl = process.env.DATABASE_URL;
    try {
        if (dbConnUrl) {
            mongoose_1.default.connect(dbConnUrl);
            const db = mongoose_1.default.connection;
            db.on("error", (error) => console.log(error.message));
            db.once("connected", (connected) => console.log("Successfully connected to database!"));
            return db;
        }
        throw new Error("Database connection url is missing!");
    }
    catch (err) {
        throw new Error(err === null || err === void 0 ? void 0 : err.message);
    }
};
exports.mongoDBConnection = mongoDBConnection;
