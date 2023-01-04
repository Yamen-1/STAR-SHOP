const express = require("express");
const controller = require("../controllers/user");
const app = express.Router();
const validation = require("../lib/validators/user");
require("express-async-middleware");

app.get("/", controller.getCurrentUser);
app.post("/logout", controller.logout);
app.post("/register", validation.register, controller.register);
app.post("/login", validation.login, controller.login);

module.exports = app;
