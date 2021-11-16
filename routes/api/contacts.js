const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { controllerWrapper } = require("../../middlewares");

router.get("/", controllerWrapper(ctrl.getContacts));

router.get("/:contactId", controllerWrapper(ctrl.getById));

router.post("/", controllerWrapper(ctrl.addCont));

router.delete("/:contactId", controllerWrapper(ctrl.deleteContact));

router.put("/:contactId", controllerWrapper(ctrl.updateContact));

router.patch(
  "/:contactId/favorite",
  controllerWrapper(ctrl.updateStatusContact)
);

module.exports = router;
