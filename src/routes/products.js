const express = require("express");
const router = express.Router();
const getDb = require("../db/connection").getDb;
const getProduct = require("../middleware/getProduct");

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
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
});

router.post("/", async (req, res) => {
  const db = getDb();

  const { name, description, price_in_usd, amount, rating, supplier } =
    req.body;

  try {
    const product = await db.findOne({ name });
    if (product !== null) return res.json({ message: "name is not unique" });

    const newProduct = await db.insertOne({
      name,
      description,
      price_in_usd,
      amount,
      rating,
      supplier,
    });
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
});

router.put("/:id", getProduct, async (req, res) => {
  const db = getDb();
  const product = res.product;

  const { name, description, price_in_usd, amount, rating, supplier } =
    req.body;

  const update = {
    $set: {
      name,
      description,
      price_in_usd,
      amount,
      rating,
      supplier,
    },
  };

  try {
    const updatedProduct = await db.updateOne(product, update);
    return res.json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
});

module.exports = router;
