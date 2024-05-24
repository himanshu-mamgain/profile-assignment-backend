"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailService = process.env.MAIL_SERVICE;
const user = process.env.USER;
const pass = process.env.PASS;
const sendMail = (mailOptions) => {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: mailService,
            auth: {
                user: user,
                pass: pass,
            },
        });
        return transporter.sendMail(mailOptions);
    }
    catch (err) {
        throw new Error(err === null || err === void 0 ? void 0 : err.message);
    }
};
exports.sendMail = sendMail;
