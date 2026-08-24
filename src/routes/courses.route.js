import express from "express";
import CoursesController from "../controllers/courses.controller.js";
import validationSchema from "../middleware/validationSchema.js";
import allowedTo from "../middleware/roleVerificattion.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { userRoles } from "../utils/helper.js";

const router = express.Router();

router
  .route("/")
  .get(CoursesController.getCourses)
  .post(validationSchema(), verifyToken, CoursesController.addCourse);

router
  .route("/:courseId")
  .get(CoursesController.getCourseById)
  .patch(verifyToken, CoursesController.updateCourse)
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.MANAGER),
    CoursesController.deleteCourse,
  );

export { router };
