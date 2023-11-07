const express = require("express");
const router = express.Router();
const getDb = require("../db/connection").getDb;

router.get("/", async (req, res) => {
  const db = getDb();

  const { minPrice, maxPrice, sortField, sortOrder } = req.query;

  const querySort = {
    [sortField]: sortOrder || 1,
  };

  const queryFilters = {
    price_in_usd: {},
  };

  if (minPrice) queryFilters["price_in_usd"]["$gt"] = parseFloat(minPrice);
  if (maxPrice) queryFilters["price_in_usd"]["$lt"] = parseFloat(maxPrice);

  if (Object.keys(queryFilters).length === 0) {
    queryFilters = {};
  }

  try {
    const results = await db.find(queryFilters).sort(querySort).toArray();
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const db = getDb();

  const { name, description, price_in_usd, amount, rating, supplier } =
    req.body;

  product = await db.find({ name }).toArray();

  if (product.length > 0) return res.json({ message: "name is not unique" });

  newProduct = await db.insertOne({
    name,
    description,
    price_in_usd,
    amount,
    rating,
    supplier,
  });

  return res.status(201).json(newProduct);
});

module.exports = router;
