const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const { sendSuccessRes } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const newUser = { email, password: hashPassword };
  const { subscription } = await User.create(newUser);
  sendSuccessRes(res, { email, subscription }, 201);
};

module.exports = register;
