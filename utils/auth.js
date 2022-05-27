const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const decoded = jwt.verify(token,"secretcodethisis");
    const user = User.findOne({ _id: decoded._id, "token.token": token });

    if (!user) {
      throw new Error("User not found");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(400).send("Please Authorise first");
  }
};

module.exports = auth;
