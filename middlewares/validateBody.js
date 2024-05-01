const {httpError} = require("../helpers");

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(httpError(400));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
