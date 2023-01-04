const express = require("express");
const controller = require("../controllers/cart");
const app = express.Router();
const validation = require("../lib/validators/cart");
const auth = require("../lib/middlewares/auth");
require("express-async-errors");

app.get("/", auth, controller.getCart);
app.post("/addProduct", auth, validation.addProduct, controller.addProduct);
app.post("/buyCart", auth, validation.buyCart, controller.buyCart);
app.delete(
  "/deletProduct",
  auth,
  validation.deletProduct,
  controller.deletProduct
);
app.delete(
  "/deletProducts",
  auth,

  controller.deletProducts
);
app.patch(
  "/updateProduct",
  auth,
  validation.updateProduct,
  controller.updateProduct
);

module.exports = app;
