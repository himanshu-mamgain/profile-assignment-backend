import { Router } from "express";
import { pingServer } from "../controllers/ping.controller";

const pingRoute = (router: Router) => {
    router.get("/ping", pingServer);
}

export default pingRoute;