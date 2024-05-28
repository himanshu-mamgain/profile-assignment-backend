import "dotenv/config";
import app from "./app";
import { mongoDBConnection } from "./services/database.service";
import { swaggerSetup } from "./utils/swagger";

// database setup
mongoDBConnection();

const port = process.env.PORT || process.env.port || 3000;

// swagger setup
swaggerSetup(app, port);

app.listen(port, () => {
  console.log(`Server is listening to port: ${port}`);
});
