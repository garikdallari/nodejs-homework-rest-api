const express = require("express");
const router = express.Router();

const {
  controllerWrapper,
  validation,
  authenticate,
  upload,
} = require("../../middlewares");
const { joiSchema } = require("../../models/user");

const { auth: ctrl } = require("../../controllers");

router.post("/signup", validation(joiSchema), controllerWrapper(ctrl.register));
router.post("/login", validation(joiSchema), controllerWrapper(ctrl.login));
router.post("/logout", authenticate, controllerWrapper(ctrl.logout));
router.get("/current", authenticate, controllerWrapper(ctrl.currentUser));
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(ctrl.updateAvatar)
);

module.exports = router;
