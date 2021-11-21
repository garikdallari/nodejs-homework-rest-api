const express = require("express");
const router = express.Router();

const { controllerWrapper, validation } = require("../../middlewares");
const { joiSchema } = require("../../models/user");

const { auth: ctrl } = require("../../controllers");

router.post("/signup", validation(joiSchema), controllerWrapper(ctrl.register));

module.exports = router;
