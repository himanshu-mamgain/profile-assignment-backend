"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth.controller");
const authRoute = (router) => {
    router.post("/register", auth_controller_1.registerUser);
    router.post("/login", auth_controller_1.loginUser);
    router.post("/verify-otp", auth_controller_1.verifyOtp);
};
exports.default = authRoute;
