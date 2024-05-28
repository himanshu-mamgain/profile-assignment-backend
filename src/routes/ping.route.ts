import { Router } from "express";
import { pingServer } from "../controllers/ping.controller";

/**
 * @swagger
 * description: Ping
 */
const pingRoute = (router: Router) => {
  /**
   * @swagger
   * /ping:
   *  get:
   *      summary: Ping server
   *      description: Ping server to check if it is active or not
   */
  router.get("/ping", pingServer);
};

export default pingRoute;
