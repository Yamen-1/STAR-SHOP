const User = require("../../models/user");
// prüfen wir ob User gibt befor add Proudect to Cart
module.exports = async (req, res, next) => {
  const token = req.cookies["user-token"];
  if (!token) {
    const error = new Error("you are not logged in ");
    error.status = 401;
    return next(error);
  }
  const user = await User.findOne().where("token").equals(token);

  if (!user) {
    const error = new Error(" your token is not valid");
    error.status = 401;
    return next(error);
  }
  req.user = user;
  next();
};
