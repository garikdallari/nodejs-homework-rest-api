const { User } = require("../../models");
const { BadRequest } = require("http-errors");
const { sendSuccessRes, sendEmail } = require("../../helpers");

const resendEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequest("missing required field email");
  }
  const user = await User.findOne({ email });
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  const userEmailcontent = {
    to: email,
    subject: "Email verifying",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Confirm your email</a>`,
  };
  await sendEmail(userEmailcontent);
  sendSuccessRes(res, { message: "Verification email sent" });
};

module.exports = resendEmail;
