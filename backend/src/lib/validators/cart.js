const { body } = require("express-validator");

const validator = require("../middlewares/valdators");
exports.addProduct = [
  body("product").isLength({ min: 5 }).withMessage("we need the product_id"),

  body("amount").isNumeric().withMessage("we need the amount"),

  validator,
];

exports.buyCart = [
  body("address.street")
    .isLength({ min: 5 })
    .withMessage("strreet min 5 Chars "),
  body("address.zipcode")
    .isLength({ min: 5 })
    .withMessage("zipcode min 5 Chars "),
  body("address.city").isLength({ min: 5 }).withMessage("city min 5 Chars "),
  body("buyMethode")
    .isIn(["PayPal", "Visa", "MasterCard", "Discover", "Amex"])
    .withMessage("buyMethode inveld"),

  validator,
];

exports.deletProduct = [
  body("productId").isLength({ min: 5 }).withMessage("we need the products"),

  validator,
];

exports.updateProduct = [
  body("productId").isLength({ min: 5 }).withMessage("we need the products"),

  body("amount").isNumeric().withMessage("we need the  amount"),

  validator,
];
