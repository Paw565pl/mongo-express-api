const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let _db;

const connectToDb = async () => {
  try {
    await client.connect();
    _db = client.db("products").collection("products");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const getDb = () => _db;

module.exports = {
  connectToDb,
  getDb,
};
