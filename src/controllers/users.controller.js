import bcrypt from "bcryptjs";
import { userModel as User } from "../models/user.model.js";
import {
  ERROR,
  FAIL,
  SUCCESS,
  appError,
  generate_JWT,
} from "../utils/helper.js";
import { asyncWrapper } from "../middleware/asyncWrapper.js";

const getUsers = asyncWrapper(async (req, res) => {
  const query = req.query;

  const limit = query.limit || 8;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);
  if (!users) throw new appError("Users not found", 404, FAIL);
  return res.json({ status: SUCCESS, data: { users } });
});

const register = asyncWrapper(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const oldUser = await User.findOne({ email });
  if (oldUser) throw new appError("User already exists", 400, FAIL);

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  const token = await generate_JWT({ email: newUser.email, id: newUser._id });

  await newUser.save();

  return res
    .status(201)
    .json({ status: SUCCESS, data: { user: newUser, accessToken: token } });
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    throw new appError("Email and password are required", 400, FAIL);
  } else if (!email) {
    throw new appError("Email is required", 400, FAIL);
  } else if (!password) {
    throw new appError("Password is required", 400, FAIL);
  }

  const user = await User.findOne({ email });
  if (!user) throw new appError("Incorrect user cardinalities", 400, FAIL);

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (isValidPassword) {
    const token = await generate_JWT({ email: user.email, id: user._id });
    return res.status(200).json({
      status: SUCCESS,
      data: {
        user: "Logged in successfully",
        token,
      },
    });
  } else throw new appError("Incorrect user cardinalities", 400, FAIL);
});

export default { getUsers, register, login };
