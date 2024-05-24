"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const database_service_1 = require("./services/database.service");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const profile_route_1 = __importDefault(require("./routes/profile.route"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
(0, database_service_1.mongoDBConnection)();
(0, auth_route_1.default)(app.use(express_1.default.Router()));
(0, profile_route_1.default)(app.use(express_1.default.Router()));
const port = process.env.PORT || process.env.port || 3000;
app.listen(port, () => {
    console.log(`Server is listening to port: ${port}`);
});
