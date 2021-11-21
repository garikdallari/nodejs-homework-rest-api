const { User } = require("../../models");

const currentUser = async (req, res) => {
  const { _id } = req.user;
  const currentUser = await User.findById(_id);

  if (!currentUser) {
    res.status(401).json({
      status: "error",
      code: 401,
      message: "Not authorized",
    });
    return;
  }
  const { email, subscription } = currentUser;
  res.status(200).json({
    email,
    subscription,
  });
};

module.exports = currentUser;
