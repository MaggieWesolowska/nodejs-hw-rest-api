const { isValidObjectId } = require('mongoose');

const validateId = (req, res, next) => {
  const { contactId } = req.params;
  const result = isValidObjectId(contactId);
  if (!result) {
    throw (400, 'Invalid id format');
  }
  next();
};

module.exports = validateId;
