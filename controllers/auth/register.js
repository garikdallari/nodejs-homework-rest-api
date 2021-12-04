const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { sendSuccessRes } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const newUser = {
    email,
    password: hashPassword,
    avatarURL: gravatar.url(email),
  };
  const { subscription, avatarURL } = await User.create(newUser);
  sendSuccessRes(res, { email, subscription, avatarURL }, 201);
};

module.exports = register;
