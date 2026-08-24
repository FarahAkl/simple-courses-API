import express from "express";
import CoursesController from "../controllers/courses.controller.js";
import validationSchema from "../middleware/validationSchema.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router
  .route("/")
  .get(CoursesController.getCourses)
  .post(validationSchema(), verifyToken, CoursesController.addCourse);

router
  .route("/:courseId")
  .get(CoursesController.getCourseById)
  .patch(verifyToken, CoursesController.updateCourse)
  .delete(verifyToken, CoursesController.deleteCourse);

export { router };
