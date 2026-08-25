import express from "express";
import { router as coursesRouter } from "./routes/courses.route.js";
import { router as usersRouter } from "./routes/users.route.js";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path, { dirname } from "path";
import { ERROR } from "./utils/helper.js";
import { fileURLToPath } from "url";

dotenv.config();

const url = process.env.DB_URL;
const port = process.env.PORT;

// Mongoose

mongoose.connect(url).then(() => {
  console.log("mongoDB connected successfully");
});

const app = express();
app.use(express.json());
app.use( cors() );

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname,'uploads')));

app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);

app.all("/*splat", (req, res, next) => {
  res
    .status(404)
    .json({ status: ERROR, message: "This resource is not available" });
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || ERROR,
    message: error.message || "Something is wrong!",
    code: error.statusCode || 500,
    data: null,
  });
});

app.listen(port, () => {
  console.log(`listenning on port ${port}`);
});

export { app };
