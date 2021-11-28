const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { controllerWrapper, validation } = require("../../middlewares");

const {
  joiContactSchema,
  updateFavoriteJoiSchema,
} = require("../../models/contact");

router.get("/", controllerWrapper(ctrl.getContacts));

router.get("/:contactId", controllerWrapper(ctrl.getById));

router.post("/", validation(joiContactSchema), controllerWrapper(ctrl.addCont));

router.delete("/:contactId", controllerWrapper(ctrl.deleteContact));

router.put(
  "/:contactId",
  validation(joiContactSchema),
  controllerWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validation(updateFavoriteJoiSchema),
  controllerWrapper(ctrl.updateStatusContact)
);

module.exports = router;
