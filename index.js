import express from "express";
import { router as coursesRouter } from "./routes/courses.route.js";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.DB_URL;

// MongoDB
// const client = new MongoClient(url);

// const main = async () => {
//   await client.connect();
//   const db = client.db("codezone");
//   const collection = db.collection("courses");
// //   await collection.insertOne({
// //     title: "CSS course",
// //     price: 50,
// //   });
//   const data = await collection.find().toArray();
// };
// main();

// Mongoose

mongoose.connect(url).then(() => {
  console.log("mongoDB connected successfully");
});

const app = express();
app.use(express.json());
app.use("/api/courses", coursesRouter);

app.listen(5000, () => {
  console.log("listenning on port 5000");
});
