import { Router } from "express";
import getDb from "../db/connection.js";
import data from "../db/sample_data.json" assert { type: "json" };
const router = Router();

router.post("/", async (req, res) => {
  const db = getDb();

  const { seed } = req.body;

  if (!seed && !seed !== "yes") return res.status(400).json({});

  try {
    await db.drop();
    const insertResult = await db.insertMany(data);

    return res.json(insertResult);
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
});

export default router;
