import cors from "cors";
import express, { json } from "express";
import routes from "./routes/routes.js";

const app = express();

app.use(cors());
app.use(json());
routes(app);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
