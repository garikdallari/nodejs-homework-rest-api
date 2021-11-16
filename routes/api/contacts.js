const express = require("express");
const router = express.Router();
const { contactSchema, contactPatchSchema } = require("../../schemas");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactById,
} = require("../../model/");

const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrl.getContacts);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.addCont);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", ctrl.changeContact);

router.patch("/:contactId", ctrl.changeContactStats);

module.exports = router;
