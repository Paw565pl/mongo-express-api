import { Router } from "express";
import getDb from "../db/connection.js";
import getProductById from "../middleware/getProductById.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
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

productsRouter.post("/", async (req, res) => {
  const db = getDb();

  const { name, description, price_in_usd, amount, rating, supplier } =
    req.body;

  if (!name || !description || !price_in_usd || !amount || !rating || !supplier)
    return res.status(400).json({ message: "all fields are required" });

  try {
    const product = await db.findOne({ name });
    if (product !== null) return res.json({ message: "name is not unique" });

    const { insertedId } = await db.insertOne({
      name,
      description,
      price_in_usd,
      amount,
      rating,
      supplier,
    });
    const newProduct = await db.findOne({ _id: insertedId });
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
});

productsRouter.get("/:id", getProductById, (_, res) => {
  const product = res.product;
  return res.json(product);
});

productsRouter.put("/:id", getProductById, async (req, res) => {
  const db = getDb();
  const product = res.product;

  const { name, description, price_in_usd, amount, rating, supplier } =
    req.body;

  if (!name || !description || !price_in_usd || !amount || !rating || !supplier)
    return res.status(400).json({ message: "all fields are required" });

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
    await db.updateOne(product, update);
    const updatedProduct = await db.findOne({ _id: product._id });
    return res.json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
});

productsRouter.delete("/:id", getProductById, async (_, res) => {
  const db = getDb();
  const product = res.product;

  try {
    await db.deleteOne(product);
    return res.status(204).json({});
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
});

productsRouter.get("/raport", async (req, res) => {
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

export default productsRouter;
