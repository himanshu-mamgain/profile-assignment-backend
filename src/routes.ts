import authRoute from "./routes/auth.route";
import profileRoute from "./routes/profile.route";
import pingRoute from "./routes/ping.route";
import { Router } from "express";

export default function routes(appRouter: Router) {
  authRoute(appRouter);
  profileRoute(appRouter);
  pingRoute(appRouter);
}
