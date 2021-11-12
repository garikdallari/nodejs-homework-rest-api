const createError = require("http-errors");
const { contactSchema, contactPatchSchema } = require("../schemas");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactById,
} = require("../model");

const getContacts = async (req, res, next) => {
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
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);

    if (!result) {
      throw new createError(404);
    }

    res.json({
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const addCont = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw new createError(400, error.message);
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
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await removeContact(contactId);

    if (!result) {
      throw new createError(404);
    }

    res.json({
      message: "Contact Deleted",
    });
  } catch (error) {
    next(error);
  }
};

const changeContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw new createError(400, error.message);
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
};

const changeContactStats = async (req, res, next) => {
  try {
    const { error } = contactPatchSchema.validate(req.body);
    if (error) {
      throw new createError(400, error.message);
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
};

module.exports = {
  getContacts,
  getById,
  addCont,
  deleteContact,
  changeContact,
  changeContactStats,
};
