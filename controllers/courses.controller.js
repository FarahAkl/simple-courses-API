import { validationResult } from "express-validator";
import { courseModel as Course } from "../models/course.model.js";
import { ERROR, FAIL, SUCCESS } from "../utils/helper.js";

const getCourses = async (req, res) => {
  const query = req.query;

  const limit = query.limit || 8;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  try {
    const courses = await Course.find({}, { __v: false })
      .limit(limit)
      .skip(skip);
    if (!courses)
      return res
        .status(404)
        .send({ status: FAIL, data: { courses: "Course not found" } });
    return res.json({ status: SUCCESS, data: { courses } });
  } catch (error) {
    return res.json({ status: ERROR, message: error });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course)
      return res
        .status(404)
        .send({ status: FAIL, data: { course: "Course not found" } });
    return res.json({ status: SUCCESS, data: { course } });
  } catch (error) {
    return res.status(400).send({
      status: ERROR,
      code: 400,
      data: null,
      message: error.message,
    });
  }
};

const addCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res
      .status(400)
      .json({ status: FAIL, data: { errors: errors.array() } });

  const newCourse = new Course(req.body);
  await newCourse.save();

  res.status(201).json({ status: SUCCESS, data: { course: newCourse } });
};

const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.updateOne(
      { _id: req.params.courseId },
      {
        $set: { ...req.body },
      },
    );
    if (!updatedCourse)
      return res
        .status(404)
        .send({ status: FAIL, data: { message: "Course not found" } });
    return res.status(200).json({
      status: SUCCESS,
      data: { course: "Course updated successfully" },
    });
  } catch (error) {
    return res.status(400).json({ status: ERROR, message: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete({
      _id: req.params.courseId,
    });
    if (!deletedCourse)
      return res
        .status(404)
        .send({ status: FAIL, data: { message: "Course not found" } });
    return res.status(200).json({ status: SUCCESS, data: null });
  } catch (e) {
    return res.status(400).json({ status: ERROR, error: e });
  }
};

export default {
  getCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
};
