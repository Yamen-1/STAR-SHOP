const Product = require("../models/product");
exports.getProducts = async (req, res, next) => {
  // all products
  const category = req.query.category;

  let query = Product.find();
  if (category) {
    query = query.where("category").equals(category);
  }
  const liste = await query;
  res.status(200).send(liste);
};

exports.getProductById = async (req, res, next) => {
  // view product
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    const error = new Error("there is no Product");
    error.status = 400;
    return next(error);
  }
  res.status(200).send(product);
};
