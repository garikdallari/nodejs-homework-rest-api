const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { sendSuccessRes, sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verificationToken = nanoid();
  const newUser = {
    email,
    password: hashPassword,
    avatarURL: gravatar.url(email),
    verificationToken,
  };
  const { subscription, avatarURL } = await User.create(newUser);
  const userEmailcontent = {
    to: email,
    subject: "Email verifying",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm your email</a>`,
  };
  await sendEmail(userEmailcontent);
  sendSuccessRes(res, { email, subscription, avatarURL }, 201);
};

module.exports = register;
