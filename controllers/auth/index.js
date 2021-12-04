const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const currentUser = require("./currentUser");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify");

module.exports = {
  register,
  verify,
  login,
  logout,
  currentUser,
  updateAvatar,
};
