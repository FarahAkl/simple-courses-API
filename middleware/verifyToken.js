import { appError, ERROR } from "../utils/helper.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];

  if (!authHeader) throw new appError("User not authorized", 401, ERROR);

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (error) {
    throw new appError(error.message, 401, ERROR);
  }
};
