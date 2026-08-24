import { body } from "express-validator";

const validationSchema = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("title is required")
      .isLength({ min: 2 })
      .withMessage("title must be more than 2 characters"),
    body("price").notEmpty().withMessage("price is required"),
  ];
};

export default validationSchema;
