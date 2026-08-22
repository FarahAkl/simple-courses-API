import { validationResult } from "express-validator";
import { courseModel as Course } from "../models/course.model.js";

const getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).send({ message: "Course not found" });
    return res.json(course);
  } catch (error) {
    return res.status(400).send({ message: "invalid Object Id" });
  }
};

const addCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors.array());

  const newCourse = new Course(req.body);
  await newCourse.save();

  res.status(201).json(newCourse);
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
      return res.status(404).send({ message: "Course not found" });
    return res.status(200).json({ message: "Course updated successfully" });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete({ _id: req.params.courseId });
    if (!deletedCourse)
      return res.status(404).send({ message: "Course not found" });
    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};

export default {
  getCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
};
