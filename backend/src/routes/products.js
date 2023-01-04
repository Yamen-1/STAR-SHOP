const express = require("express");
const controller = require("../controllers/products");

const app = express.Router();
app.get("/", controller.getProducts);
app.get("/:id", controller.getProductById);

module.exports = app;
