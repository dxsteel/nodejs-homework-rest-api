const {Contact} = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const {favorite} = req.body
  const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true});
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = updateFavorite;