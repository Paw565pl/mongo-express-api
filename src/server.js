import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import routes from "./routes/routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(json());
routes(app);

import { connectToDb } from "./db/connection.js";
const port = process.env.PORT;

app.listen(port, async () => {
  await connectToDb();
  console.log(`Server is running on port ${port}`);
});
