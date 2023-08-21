const express = require('express');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
  getByFavorite,
} = require('../../controllers/contacts');
const ctrlTask = require('../../helpers/ctrlTask');
const validateBody = require('../../middleware/validateBody');
const validateId = require('../../middleware/validateId');
const { Schemas } = require('../../models/schemas');
const router = express.Router();

router.get('/', ctrlTask(listContacts));

router.get(
  '/:contactId',
  validateId,
  ctrlTask(getContactById)
);

router.post(
  '/',
  validateBody(Schemas.schema),
  ctrlTask(addContact)
);

router.delete(
  '/:contactId',
  validateId,
  ctrlTask(removeContact)
);

router.put(
  '/:contactId',
  validateId,
  validateBody(Schemas.schema),
  ctrlTask(updateContact)
);

router.patch(
  '/:contactId/favorite',
  validateId,
  validateBody(Schemas.updateFavoriteSchema),
  ctrlTask(updateFavorite)
);

module.exports = router;
