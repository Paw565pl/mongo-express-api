const express = require("express");
const router = express.Router();
const getDb = require("../db/connection").getDb;
const getProductById = require("../middleware/getProductById");

router.get("/", async (req, res) => {
  const db = getDb();
  const queryParams = req.query;

  const queryFilters = {};
  const querySort = {};

  if (Object.keys(queryParams).length !== 0) {
    const { minPrice, maxPrice, sortField, sortOrder } = queryParams;

    if (minPrice)
      queryFilters.price_in_usd = {
        ...queryFilters.price_in_usd,
        $gt: parseFloat(minPrice),
      };

    if (maxPrice)
      queryFilters.price_in_usd = {
        ...queryFilters.price_in_usd,
        $lt: parseFloat(maxPrice),
      };

    if (sortField) querySort[sortField] = parseInt(sortOrder) || 1;
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

router.put("/:id", getProductById, async (req, res) => {
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

router.delete("/:id", getProductById, async (req, res) => {
  const db = getDb();
  const product = res.product;

  try {
    const deletedProduct = await db.deleteOne(product);
    return res.json(deletedProduct);
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
});

router.get("/raport", async (req, res) => {
  const db = getDb();

  const aggregation = [
    {
      $addFields: {
        total_value: {
          $round: [
            {
              $multiply: ["$price_in_usd", "$amount"],
            },
            2,
          ],
        },
      },
    },
    {
      $project: {
        _id: 0,
        name: 1,
        amount: 1,
        total_value: 1,
      },
    },
  ];

  try {
    const results = await db.aggregate(aggregation).toArray();
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
});

module.exports = router;
