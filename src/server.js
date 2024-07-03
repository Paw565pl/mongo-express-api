import cors from "cors";
import express, { json } from "express";
import registerRoutes from "./routes/routes.js";

const app = express();

app.use(cors());
app.use(json());

registerRoutes(app);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
