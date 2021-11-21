const express = require("express");
const router = express.Router();

const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middlewares");
const { joiSchema } = require("../../models/user");

const { auth: ctrl } = require("../../controllers");

router.post("/signup", validation(joiSchema), controllerWrapper(ctrl.register));
router.post("/login", validation(joiSchema), controllerWrapper(ctrl.login));
router.post("/logout", authenticate, controllerWrapper(ctrl.logout));

module.exports = router;
