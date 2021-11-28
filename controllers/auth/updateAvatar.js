const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { sendSuccessRes } = require("../../helpers");

const { User } = require("../../models");
const avatarDir = path.join(__dirname, "../../public/avatars");

const updateAvatar = async (req, res) => {
  const { path: tempPath, originalname } = req.file;
  const { _id } = req.user;
  const [extention] = originalname.split(".").reverse();
  const newAvatarName = `avatar_${_id.toString()}.${extention}`;
  const uploadPath = path.join(avatarDir, newAvatarName);
  const file = await Jimp.read(tempPath);
  await file.resize(250, 250).write(tempPath);
  await fs.rename(tempPath, uploadPath);
  const avatarURL = `/avatars/${newAvatarName}`;
  await User.findByIdAndUpdate(_id, { avatarURL });
  sendSuccessRes(res, { avatarURL });
};

module.exports = updateAvatar;
