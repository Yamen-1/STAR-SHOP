const Cart = require("../models/cart");
const product = require("../models/product");
const Product = require("../models/product");

exports.getCart = async (req, res, next) => {
  let cart = await Cart.findById(req.user.cart).populate("products.product");
  if (!cart) {
    cart = new Cart({
      address: {
        street: "?",
        zipcode: "?",
        city: "?",
      },
      buyMethode: "?",
      products: [],
    });
    req.user.cart = cart._id;
    await cart.save();
    await req.user.save();
  }
  if (cart.products.find((row) => !row.product)) {
    cart.products = cart.products.filter((row) => row.product);
    await cart.save();
  }

  res.status(200).send(cart);
};

exports.buyCart = async (req, res, next) => {
  let cart = await Cart.findById(req.user.cart).populate("products.product");
  cart.address = req.body.address;
  cart.buyMethode = req.body.buyMethode;
  await cart.save();

  res.status(200).send(cart);
};

exports.addProduct = async (req, res) => {
  let cart = await Cart.findById(req.user.cart).populate("products.product");
  if (!cart) {
    cart = new Cart({
      address: {
        street: "?",
        zipcode: "?",
        city: "?",
      },
      buyMethode: "?",
      products: [],
    });
    console.log(cart);
    req.user.cart = cart._id;
    await cart.save();
    await req.user.save();
  }
  const product = cart.products.find(
    (item) => item.product._id == req.body.product
  );
  if (product) {
    product.amount = product.amount + 1;
  } else {
    cart.products.push({
      product: req.body.product,
      amount: req.body.amount,
    });
  }

  await cart.save();
  cart = await Cart.findById(req.user.cart).populate("products.product");
  res.status(200).send(cart);
};

exports.deletProduct = async (req, res) => {
  //remove Item
  const productId = req.body.productId; // aus validators
  console.log(productId);

  let cart = await Cart.findById(req.user.cart).populate("products.product");
  console.log(cart.products.length);
  cart.products = cart.products.filter((item) => item.product._id != productId);
  console.log(cart.products.length);

  await cart.save();
  res.status(200).send(cart);
};

exports.deletProducts = async (req, res) => {
  let cart = await Cart.findById(req.user.cart).populate("products.product");
  cart.products = [];

  await cart.save();
  res.status(200).send(cart);
};
exports.updateProduct = async (req, res) => {
  //anzahl item
  let cart = await Cart.findById(req.user.cart).populate("products.product");
  const productId = req.body.productId;
  const amount = req.body.amount;
  cart.products = cart.products.map((item) => {
    if (item.product._id == productId) {
      item.amount = amount;
    }
    return item;
  });
  await cart.save();
  res.status(200).send(cart);
};
