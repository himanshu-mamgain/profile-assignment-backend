import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoute from "./routes/auth.route";
import profileRoute from "./routes/profile.route";
import pingRoute from "./routes/ping.route";

const app = express();

// Handle cors
app.use(cors());
app.options("*", cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// route setup
authRoute(app.use(express.Router()));
profileRoute(app.use(express.Router()));
pingRoute(app.use(express.Router()));

export default app;
