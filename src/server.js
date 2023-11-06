require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");

const app = express();

app.use(cors());
app.use(express.json());
routes(app);

const dbo = require("./db/connection");
const port = process.env.PORT;

app.listen(port, async () => {
  await dbo.connectToDb();
  console.log("Server is running on port 3000");
});
