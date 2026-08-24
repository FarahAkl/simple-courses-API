import mongoose from "mongoose";
import validate from "validator";

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
});

export const userModel = mongoose.model("User", userSchema);
