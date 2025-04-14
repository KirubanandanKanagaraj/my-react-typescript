const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

async function main() {
  const Db = process.env.ATLAS_URI;
  const client = new MongoClient(Db);

  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    const collections = await client.db("todoList").collections();
    collections.forEach((collection) => {
      console.log(`Collection: ${collection.s.namespace.collection}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    throw error;
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

main();
