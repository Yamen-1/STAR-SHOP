const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["men's clothing", "women's clothing", "electronics", "jewelery"],
    required: true,
  },
  rating: {
    rate: {
      type: Number,

      required: true,
    },
    count: { type: Number, required: true },
  },
  image: { type: String, required: true },
});
module.exports = mongoose.model("Product", Schema, "products");
