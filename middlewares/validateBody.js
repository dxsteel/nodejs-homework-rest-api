const { requestError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(requestError(400, "missing required name field"));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
