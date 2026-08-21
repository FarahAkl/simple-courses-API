import { validationResult } from "express-validator";
import { courses } from "../data/courses.js";

const getCourses = (req, res) => {
  res.json(courses);
};

const getCourseById = (req, res) => {
  const course = courses.find((course) => course.id === +req.params.courseId);

  if (!course) return res.status(404).send({ message: "Course not found" });
  res.json(course);
};

const addCourse = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors.array());

  const course = {
    id: courses.length + 1,
    ...req.body,
  };

  courses.push(course);

  res.status(201).json(course);
};

const updateCourse = (req, res) => {
  const id = +req.params.courseId;

  let course = courses.find((course) => course.id === id);
  if (!course) return res.status(404).send({ message: "Course not found" });

  course = { ...course, ...req.body };
  res.status(200).json(course);
};

const deleteCourse = (req, res) => {
  const id = +req.params.courseId;

  const index = courses.findIndex((course) => course.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Course not found" });
  }

  courses.splice(index, 1);

  res.status(200).json(courses);
};

export default {
  getCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
};
