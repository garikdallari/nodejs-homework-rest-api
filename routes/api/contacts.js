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

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json({
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);

    if (!result) {
      const error = new Error("Not Found");
      error.status = 404;
      throw error;
    }
    res.json({
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }

    const result = await addContact(req.body);
    res.status(201).json({
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await removeContact(contactId);

    if (!result) {
      const error = new Error("Not Found");
      error.status = 404;
      throw error;
    }

    res.json({
      message: "Contact Deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }

    const { contactId } = req.params;
    const result = await updateContactById(contactId, req.body);
    console.log(result);
    if (!result) {
      const error = new Error("Not Found");
      error.status = 404;
      throw error;
    }
    res.json({
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});
router.patch("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactPatchSchema.validate(req.body);
    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }

    const { contactId } = req.params;
    const result = await updateContactById(contactId, req.body);
    console.log(result);
    if (!result) {
      const error = new Error("Not Found");
      error.status = 404;
      throw error;
    }
    res.json({
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
