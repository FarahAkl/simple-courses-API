import { validationResult } from "express-validator";
import { courseModel as Course } from "../models/course.model.js";
import { ERROR, FAIL, SUCCESS, appError } from "../utils/helper.js";
import { asyncWrapper } from "../middleware/asyncWrapper.js";

const getCourses = asyncWrapper(async (req, res) => {
  const query = req.query;

  const limit = query.limit || 8;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  if (!courses) throw new appError("Course not found", 404, FAIL);
  return res.json({ status: SUCCESS, data: { courses } });
});

const getCourseById = asyncWrapper(async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) throw new appError("Course not found", 404, FAIL);
  return res.json({ status: SUCCESS, data: { course } });
});

const addCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    throw new appError(
      errors
        .array()
        .map((error) => error.msg)
        .join(", "),
      400,
      FAIL,
    );

  const newCourse = new Course(req.body);
  await newCourse.save();

  res.status(201).json({ status: SUCCESS, data: { course: newCourse } });
};

const updateCourse = asyncWrapper(async (req, res) => {
  const updatedCourse = await Course.updateOne(
    { _id: req.params.courseId },
    {
      $set: { ...req.body },
    },
  );
  if (updatedCourse.matchedCount === 0) {
    throw new appError("Course not found", 404, FAIL);
  }
  return res.status(200).json({
    status: SUCCESS,
    data: { course: "Course updated successfully" },
  });
});

const deleteCourse = asyncWrapper(async (req, res) => {
  const deletedCourse = await Course.findByIdAndDelete({
    _id: req.params.courseId,
  });
  if (!deletedCourse) throw new appError("Course not found", 404, FAIL);
  return res.status(200).json({ status: SUCCESS, data: null });
});

export default {
  getCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
};
