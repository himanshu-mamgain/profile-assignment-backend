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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const secretKey = process.env.SECRET_KEY;
const maxAge = 3 * 24 * 60 * 60;
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            if (token) {
                if (secretKey) {
                    const tokenData = jsonwebtoken_1.default.verify(token, secretKey);
                    if (tokenData) {
                        const userId = tokenData._id;
                        const checkUser = yield checkUserId(userId, req, res);
                        if (checkUser) {
                            return next();
                        }
                    }
                    else {
                        res.status(500).send({
                            message: "Internal Server Error",
                        });
                        throw new Error("tokenData is undefined!");
                    }
                }
                else {
                    res.status(500).send({
                        message: "Internal Server Error",
                    });
                    throw new Error("Secret key is missing!");
                }
            }
            else {
                res.status(401).send({
                    message: "Authorizatin token missing!",
                });
            }
        }
        else {
            res.status(400).send({
                message: "Authorization header is missing!",
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: err === null || err === void 0 ? void 0 : err.message,
        });
    }
});
exports.auth = auth;
const checkUserId = (userId, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById({ _id: userId });
        if (user) {
            req.user = user;
            return true;
        }
        throw new Error("Token is Invalid!");
    }
    catch (err) {
        res.status(500).send({
            message: err === null || err === void 0 ? void 0 : err.message,
        });
    }
});
const createToken = (tokenPayload) => {
    try {
        if (secretKey) {
            return jsonwebtoken_1.default.sign(tokenPayload, secretKey, {
                expiresIn: maxAge,
            });
        }
        throw new Error("Secret key is missing!");
    }
    catch (err) {
        throw new Error(err.message);
    }
};
exports.createToken = createToken;
