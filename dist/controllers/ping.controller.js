"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingServer = void 0;
const pingServer = (req, res) => {
    res.status(200).send({
        message: "Server ping successfull",
    });
};
exports.pingServer = pingServer;
