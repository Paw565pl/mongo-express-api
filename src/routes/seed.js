const express = require("express");
const router = express.Router();
const getDb = require("../db/connection").getDb;
const data = require("../db/sample_data.json");

router.post("/", async (req, res) => {
  const db = getDb();

  if (!req.body.seed && !req.body.seed !== "yes")
    return res.status(400).json({});

  await db.drop();
  const insertResult = await db.insertMany(data);

  return res.send(insertResult);
});

module.exports = router;
