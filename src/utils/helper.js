import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const SUCCESS = "success";
const FAIL = "fail";
const ERROR = "error";

class appError extends Error {
  constructor(message, statusCode, statusText) {
    super(message);
    this.statusCode = statusCode;
    this.statusText = statusText;
  }
}

const generate_JWT = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "15m",
  });
  return token;
};

export { SUCCESS, FAIL, ERROR, appError, generate_JWT };
