import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let _db;

export const connectToDb = async () => {
  try {
    await client.connect();
    _db = client.db("products").collection("products");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export const getDb = () => _db;
