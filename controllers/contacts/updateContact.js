const {Contact} = require("../../models/contacts");
const { requestError } = require("../../helpers");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = updateContact;
