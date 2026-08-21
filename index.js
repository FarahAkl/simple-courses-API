import express from "express";
import { router as coursesRouter } from "./routes/courses.route.js";

const app = express();
app.use(express.json());
app.use("/api/courses", coursesRouter);

app.listen(5000, () => {
  console.log("listenning on port 5000");
});
