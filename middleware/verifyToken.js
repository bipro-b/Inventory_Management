const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];
    if (!token) {
      return res.status(401).json({
        status: "Fails",
        error: "Not logged in ",
      });
    }
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.TOKEN_SECRET
    );
    // const user = await User.findOne({ email: decoded.email });
  /*   if (!user) {
      return res.status(401).json({
        status: "Fails",
        error: "User not found",
      });
    } */
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      status: "Fails",
      message: "Fails to  login",
      error: error.message,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (error) {
    res.status(500).json({
      status: "Fails",
      message: "Fails to  login",
      error: error.message,
    });
  }
};
