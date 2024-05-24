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
exports.verifyOtp = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const email_service_1 = require("../services/email.service");
const hash_1 = require("../utils/hash");
const otp_1 = require("../utils/otp");
const email_template_1 = require("../utils/email.template");
const auth_1 = require("../utils/auth");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, password } = req.body;
        if (name && email && phone && password) {
            const userExists = yield user_model_1.default.findOne({
                phone,
            });
            if (!userExists) {
                const otp = (0, otp_1.generateOTP)();
                const hashedPassword = yield (0, hash_1.generatePasswordHash)(password);
                const user = new user_model_1.default({
                    name,
                    email,
                    phone,
                    password: hashedPassword,
                    otp,
                });
                try {
                    const userData = yield user.save();
                    const mailOptions = {
                        to: userData.email,
                        from: process.env.USER,
                        subject: "Verification OTP",
                        html: (0, email_template_1.emailTemplate)(otp),
                    };
                    (0, email_service_1.sendMail)(mailOptions);
                    res.status(200).send({
                        message: "User registered successfully!",
                        userId: userData._id,
                    });
                }
                catch (err) {
                    res.status(500).send({
                        message: err === null || err === void 0 ? void 0 : err.message,
                    });
                    throw new Error(err.message);
                }
            }
            else {
                res.status(400).send({
                    message: "User already exists!",
                });
            }
        }
        else {
            res.status(400).send({
                message: "Please provide all parameters!",
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: err === null || err === void 0 ? void 0 : err.message,
        });
        throw new Error(err.message);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone, password } = req.body;
        if (phone && password) {
            const user = yield user_model_1.default.findOne({ phone });
            if (user && user.password && user.phone && user.email) {
                const decryptedPassword = yield (0, hash_1.verifyPasswordHash)(password, user.password);
                if (decryptedPassword) {
                    const checkUserPassword = yield user_model_1.default.findOne({
                        phone,
                        password: user.password,
                    });
                    if (checkUserPassword) {
                        const token = (0, auth_1.createToken)({
                            _id: user._id,
                            phone: user.phone,
                            email: user.email,
                        });
                        res.status(200).send({
                            message: "User logged in successfully!",
                            accessToken: token,
                            userId: user._id
                        });
                    }
                    else {
                        res.status(401).send({
                            message: "Password is incorrect!",
                        });
                    }
                }
                else {
                    res.status(500).send({
                        message: "Something went wrong!",
                    });
                }
            }
            else {
                res.status(401).send({
                    message: "User not found!",
                });
            }
        }
        else {
            res.status(400).send({
                message: "Please provide all parameters!",
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: err === null || err === void 0 ? void 0 : err.message,
        });
        throw new Error(err.message);
    }
});
exports.loginUser = loginUser;
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, otp } = req.body;
        if (userId && otp) {
            const user = yield user_model_1.default.findById({ _id: userId });
            if (user) {
                if (user.otp === otp) {
                    yield user_model_1.default.updateOne({ _id: user._id }, { isVerified: true });
                    res.status(200).send({
                        message: "User verified successfully!",
                    });
                }
                else {
                    res.status(401).send({
                        message: "Invalid Otp!",
                    });
                }
            }
            else {
                res.status(404).send({
                    message: "User not found!",
                });
            }
        }
        else {
            res.status(400).send({
                message: "Please provide userId and otp!",
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: err === null || err === void 0 ? void 0 : err.message,
        });
        throw new Error(err.message);
    }
});
exports.verifyOtp = verifyOtp;
