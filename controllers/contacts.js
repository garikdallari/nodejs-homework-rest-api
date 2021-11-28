const createError = require("http-errors");

const { Contact } = require("../models");

const { sendSuccessRes } = require("../helpers");

const getContacts = async (_, res) => {
  const result = await Contact.find({});
  sendSuccessRes(res, { data: result });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw new createError(404);
  }
  sendSuccessRes(res, { data: result });
};

const addCont = async (req, res) => {
  const result = await Contact.create(req.body);
  sendSuccessRes(res, { data: result }, 201);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw new createError(404);
  }
  sendSuccessRes(res, { message: "Contact Deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new createError(404);
  }
  sendSuccessRes(res, { data: result });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new createError(404);
  }
  sendSuccessRes(res, { data: result });
};

module.exports = {
  getContacts,
  getById,
  addCont,
  deleteContact,
  updateContact,
  updateStatusContact,
};
