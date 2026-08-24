import mongoose from "mongoose";
import validate from "validator";
import { userRoles } from "../utils/helper.js";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validate.isEmail, "field must be a email address"],
  },
  password: {
    type: String,
    required: true,
  },
  token: { type: String },
  role: {
    type: String,
    enum: [userRoles.ADMIN, userRoles.USER, userRoles.MANAGER],
    default: userRoles.USER,
  },
});

export const userModel = mongoose.model("User", userSchema);
