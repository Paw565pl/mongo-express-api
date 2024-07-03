import data from "../data/sample_data.json" assert { type: "json" };
import getDb from "./connection.js";

const db = getDb();

try {
  await db.drop();
  const insertResult = await db.insertMany(data);

  console.log(insertResult);
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
