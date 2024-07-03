import { MongoClient } from "mongodb";

const url = process.env.MONGO_URL || "mongodb://localhost:27017";
const client = new MongoClient(url);

const getDb = () => client.db("database").collection("products");

export default getDb;
