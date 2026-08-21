import express from "express";
import CoursesController from "../controllers/courses.controller.js";
import validationSchema from "../middleware/validationSchema.js";

const router = express.Router();

router
  .route("/")
  .get(CoursesController.getCourses)
  .post(validationSchema(), CoursesController.addCourse);

router
  .route("/:courseId")
  .get(CoursesController.getCourseById)
  .patch(CoursesController.updateCourse)
  .delete(CoursesController.deleteCourse);

export { router };
