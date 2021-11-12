const fs = require("fs/promises");
const path = require("path");
const contacts = require("./contacts.json");

const generateUniqueId = require("generate-unique-id");

const filePath = path.join(__dirname, "contacts.json");

const listContacts = async () => contacts;

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === Number(contactId));
  if (!contact) null;
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === Number(contactId));
  if (index === -1) {
    return null;
  }
  contacts.splice(index, 1);
  await updateContacts(contacts);
  return contacts;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: Number(
      generateUniqueId({
        useLetters: false,
        length: 10,
      })
    ),
    ...body,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContactById = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) => contact.id === Number(contactId)
  );

  if (index === -1) {
    return null;
  }

  const updatedContact = { ...contacts[index], ...body };
  contacts[index] = updatedContact;
  await updateContacts(contacts);
  return updatedContact;
};

const updateContacts = async (newContact) => {
  await fs.writeFile(filePath, JSON.stringify(newContact));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
