const { body } = require("express-validator");

const validator = require("../middlewares/valdators");
exports.register = [
  body("email").isEmail().withMessage("we need a valid email"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Your password is not strong enough"),
  body("name").exists().trim().withMessage("Your name cannot be empty"),
  validator,
];

exports.login = [
  body("email").isEmail().withMessage("we need a valid email"),
  body("password").isLength({ min: 4 }).withMessage("that's not your password"),
  validator,
];
