const User = require("../models/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
exports.logout = (req, res, next) => {
  throw new Error("not implemented");
};

exports.register = async (req, res) => {
  const user = new User(req.body);
  user.password = await bcrypt.hash(user.password, 10);
  user.token = crypto.randomBytes(64).toString("hex");

  await user.save();

  res.cookie("user-token", user.token, {
    maxAge: 2592000000,
    sameSite: "strict",
    httponly: true,
  });
  res.status(200).send(user);
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne().where("email").equals(email);

  if (!user) {
    const error = new Error("Diese Email kennen wir nicht");
    error.status = 400;
    return next(error);
  }
  const passwordCorrect = await bcrypt.compare(password, user.password);

  if (!passwordCorrect) {
    const error = new Error("Password nicht correkt");
    error.status = 401;
    return next(error);
  }
  user.token = crypto.randomBytes(64).toString("hex");
  await user.save();
  res.cookie("user-token", user.token, {
    maxAge: 2592000000,
    sameSite: "strict",
    httponly: true,
  });
  res.status(200).send(user);
};

exports.getCurrentUser = async (req, res) => {
  const token = req.cookies["user-token"];
  if (!token) {
    return res.status(200).json(null);
  }
  const user = await User.findOne().where("token").equals(token);
  return res.status(200).json(user);
};

exports.logout = async (req, res) => {
  const token = req.cookies["user-token"];
  const user = await User.findOne().where("token").equals(token);
  if (user) {
    user.token = "";
    await user.save();
  }
  res.cookie("user-token", "", {
    maxAge: 2592000000,
    sameSite: "strict",
    httponly: true,
  });
  res.status(200).send();
};
