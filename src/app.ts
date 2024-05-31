import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoute from "./routes/auth.route";
import profileRoute from "./routes/profile.route";
import pingRoute from "./routes/ping.route";

const app = express();

// Handle cors
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.options("*", cors({ credentials: true }));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// route setup
authRoute(app.use(express.Router()));
profileRoute(app.use(express.Router()));
pingRoute(app.use(express.Router()));

export default app;
