import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";

const app = express();

// Handle cors
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.options("*", cors({ credentials: true }));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// route setup
routes(app.use(express.Router()));

export default app;
