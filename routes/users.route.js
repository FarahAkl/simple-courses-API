import express from "express";
import usersController from "../controllers/users.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/").get(verifyToken, usersController.getUsers);

router.route("/login").post(usersController.login);

router.route("/register").post(usersController.register);

export { router };
