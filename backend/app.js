const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { DB_URL, DB_PORT, DB_NAME, PORT } = process.env;

mongoose.connect(`mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`);
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static("mockProducts/image"));

const corsConfig = {
  // welche user darf rein
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use("/user", require("./src/routes/user"));
app.use("/cart", require("./src/routes/cart"));
app.use("/products", require("./src/routes/products"));

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: error.message,
  });
});
app.listen(PORT, () => {
  console.log("Server running on Port", PORT);
});
