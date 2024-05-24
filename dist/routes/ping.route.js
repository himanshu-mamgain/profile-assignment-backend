"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ping_controller_1 = require("../controllers/ping.controller");
const pingRoute = (router) => {
    router.get("/ping", ping_controller_1.pingServer);
};
exports.default = pingRoute;
