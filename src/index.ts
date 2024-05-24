import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import { mongoDBConnection } from "./services/database.service";
import authRoute from "./routes/auth.route";
import profileRoute from "./routes/profile.route";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// hanlding cors
app.use(cors());

// database setup
mongoDBConnection();

// route setup
authRoute(app.use(express.Router()));
profileRoute(app.use(express.Router()));

const port = process.env.PORT || process.env.port || 3000;

app.listen(port, () => {
  console.log(`Server is listening to port: ${port}`);
});
