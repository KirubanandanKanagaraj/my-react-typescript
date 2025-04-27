const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.ATLAS_URI);

async function run() {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(process.env.COLLECTION_NAME);

    // GET all documents
    app.get("/api/todos", async (req, res) => {
      const todoList = await collection.find({}).toArray();
      res.json(todoList);
    });

    // POST new document
    app.post("/api/todos", async (req, res) => {
      const newTodo = req.body;
      const result = await collection.insertOne(newTodo);
      res.json(result);
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

run();

// const { MongoClient } = require("mongodb");
// require("dotenv").config({ path: "./config.env" });

// async function main() {
//   const Db = process.env.ATLAS_URI;
//   const collectionName = process.env.COLLECTION_NAME;
//   const client = new MongoClient(Db);

//   try {
//     await client.connect();
//     console.log("Connected to MongoDB Atlas");

//     const collections = await client.db(collectionName).collections();
//     collections.forEach((collection) => {
//       console.log(`Collection: ${collection.s.namespace.collection}`);
//     });
//   } catch (error) {
//     console.error("Error connecting to MongoDB Atlas:", error);
//     throw error;
//   } finally {
//     await client.close();
//     console.log("Connection closed");
//   }
// }

// main();
