"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPasswordHash = exports.generatePasswordHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const generatePasswordHash = (password) => {
    try {
        return bcrypt_1.default.hash(password, 10);
    }
    catch (err) {
        throw new Error(err === null || err === void 0 ? void 0 : err.message);
    }
};
exports.generatePasswordHash = generatePasswordHash;
const verifyPasswordHash = (password, hashedPassword) => {
    try {
        return bcrypt_1.default.compare(password, hashedPassword);
    }
    catch (err) {
        throw new Error(err === null || err === void 0 ? void 0 : err.message);
    }
};
exports.verifyPasswordHash = verifyPasswordHash;
