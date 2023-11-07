const getDb = require("../db/connection").getDb;

const getProduct = async (req, res, next) => {
  const db = getDb();

  const id = req.params.id;

  try {
    const product = await db.findOne({ id });
    if (!product) return res.status(404).json({});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.product = product;
  next();
};

module.exports = getProduct;
