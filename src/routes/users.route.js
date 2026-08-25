import express from "express";
import multer from "multer";
import usersController from "../controllers/users.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { appError, ERROR } from "../utils/helper.js";

const router = express.Router();

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const type = file.mimetype.split("/")[0];
  if (type === "image") return cb(null, true);

  cb(new appError("Not valid image type", 400, ERROR), false);
};

const upload = multer({ storage: diskStorage, fileFilter });

router.route("/").get(verifyToken, usersController.getUsers);

router.route("/login").post(usersController.login);

router
  .route("/register")
  .post(upload.single("avatar"), usersController.register);

export { router };
