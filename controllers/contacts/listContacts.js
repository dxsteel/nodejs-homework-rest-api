const contacts = require("../../models/contacts");

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = listContacts;
