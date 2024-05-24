"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        require: false,
    },
    isVerified: {
        type: Boolean,
        required: false,
        default: false,
    },
    createdAt: {
        type: String,
        required: false,
        default: () => new Date().toString(),
    },
});
module.exports = mongoose_1.default.model("User", userSchema);
