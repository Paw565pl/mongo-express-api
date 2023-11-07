const ObjectId = require("mongodb").ObjectId;
const getDb = require("../db/connection").getDb;

const getProductById = async (req, res, next) => {
  const db = getDb();

  const _id = new ObjectId(req.params.id);

  try {
    const product = await db.findOne({ _id });
    if (!product) return res.status(404).json({});
    res.product = product;
    next();
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
};

module.exports = getProductById;
