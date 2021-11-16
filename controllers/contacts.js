const createError = require("http-errors");

const {
  joiContactSchema,
  updateFavoriteJoiSchema,
} = require("../models/contact");

const { Contact } = require("../models");

const getContacts = async (_, res, next) => {
  const result = await Contact.find({});
  res.json({
    data: {
      result,
    },
  });
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw new createError(404);
  }

  res.json({
    data: {
      result,
    },
  });
};

const addCont = async (req, res, next) => {
  const { error } = joiContactSchema.validate(req.body);
  if (error) {
    throw new createError(400, error.message);
  }

  const result = await Contact.create(req.body);
  res.status(201).json({
    data: {
      result,
    },
  });
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw new createError(404);
  }

  res.json({
    message: "Contact Deleted",
  });
};

const updateContact = async (req, res, next) => {
  const { error } = joiContactSchema.validate(req.body);
  if (error) {
    throw new createError(400, error.message);
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  console.log(result);
  if (!result) {
    throw new createError(404);
  }
  res.json({
    data: {
      result,
    },
  });
};

const updateStatusContact = async (req, res, next) => {
  const { error } = updateFavoriteJoiSchema.validate(req.body);
  if (error) {
    throw new createError(400, error.message);
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new createError(404);
  }
  res.json({
    data: {
      result,
    },
  });
};

module.exports = {
  getContacts,
  getById,
  addCont,
  deleteContact,
  updateContact,
  updateStatusContact,
};
