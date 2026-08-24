import { appError, ERROR } from "../utils/helper.js";

const allowedTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role))
      next(new appError("User not authorized", 401, ERROR));
    next();
  };
};

export default allowedTo;
