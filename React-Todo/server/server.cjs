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

    // GET document by ID
    app.get("/api/todos/:id", async (req, res) => {
      const id = req.params.id;
      const todo = await collection.findOne({ _id: new ObjectId(id) });
      res.json(todo);
    });

    // POST new document
    app.post("/api/todos", async (req, res) => {
      const newTodo = req.body;
      const result = await collection.insertOne(newTodo);
      res.json(result);
    });

    // DELETE document by ID
    app.delete("/api/todos/:id", async (req, res) => {
      const id = req.params.id;
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
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
