const path = require("path");
const fs = require("fs").promises;
const uuid = require("uuid");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const result = JSON.parse(data);
  return result;
};

const getContactById = async (contactId) => {
  const contactsId = await listContacts();
  const contact = contactsId.find((contact) => contact.id === contactId);
  return contact && contact;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  const deleteContact = allContacts[contactIndex];
  if (contactIndex !== -1) {
    allContacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  }
  return deleteContact && deleteContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const newContact = {
    id: uuid.v4(),
    name,
    email,
    phone,
  };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex !== -1) {
    allContacts[contactIndex].name = name;
    allContacts[contactIndex].email = email;
    allContacts[contactIndex].phone = phone;
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return allContacts[contactIndex];
  } else return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
