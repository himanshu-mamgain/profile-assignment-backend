import { Router } from "express";
import { loginUser, registerUser, verifyOtp } from "../controllers/auth.controller";

const authRoute = (router: Router) => {
  router.post("/register", registerUser);

  router.post("/login", loginUser);

  router.post("/verify-otp", verifyOtp);
};

export default authRoute;
