require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { SECRET_KEY } = process.env;
const { Unauthorized } = require("http-errors");

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    Unauthorized("Not authorized");
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    Unauthorized("Not authorized");
  }
  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(_id);
    if (!user.token || !user) {
      res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    Unauthorized("Not authorized");
  }
};

module.exports = authenticate;
