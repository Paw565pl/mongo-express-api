const express = require("express");
const router = express.Router();
const getDb = require("../db/connection").getDb;
const data = require("../db/sample_data.json");

router.post("/", async (req, res) => {
  const db = getDb();

  const { seed } = req.body;

  if (!seed && !seed !== "yes") return res.status(400).json({});

  await db.drop();
  const insertResult = await db.insertMany(data);

  return res.send(insertResult);
});

module.exports = router;
