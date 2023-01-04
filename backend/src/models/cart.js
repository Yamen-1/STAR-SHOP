const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  address: {
    street: { type: String, required: true },
    zipcode: { type: String, required: true },
    city: { type: String, required: true },
  },
  buyMethode: { type: String, required: true },

  products: [
    {
      product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Product",
        required: true,
      },
      amount: { type: Number, required: true },
    },
  ],
});
module.exports = mongoose.model("Cart", Schema, "carts");
