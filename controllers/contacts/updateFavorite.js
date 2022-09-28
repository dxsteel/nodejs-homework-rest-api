const {Contact} = require("../../models/contacts");
const { requestError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const {favorite} = req.body
  const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true});
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = updateFavorite;