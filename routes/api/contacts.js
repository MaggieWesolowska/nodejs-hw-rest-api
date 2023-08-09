const express = require('express');
const { ctrl } = require('../../controllers/contacts');
const {
  ctrlWrapper,
} = require('../../helpers/ctrlWrapper');
const {
  validateBody,
  validateId,
} = require('../../middleware');
const { Schemas } = require('../../models/schemas');
const router = express.Router();

router.get('/', ctrlWrapper(ctrl.listContacts));

router.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(ctrl.getContactById)
);

router.post(
  '/',
  validateBody(Schemas.schema),
  ctrlWrapper(ctrl.addContact)
);

router.delete(
  '/:contactId',
  validateId,
  ctrlWrapper(ctrl.removeContact)
);

router.put(
  '/:contactId',
  validateId,
  validateBody(Schemas.schema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  '/:contactId/favorite',
  validateId,
  validateBody(Schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

// Old code:
// router.get('/', async (req, res) => {
//   const result = await ctrl.listContacts();
//   res.status(200).json(result);
// });

// router.get('/:contactId', async (req, res) => {
//   const result = await ctrl.getContactById(
//     req.params.contactId
//   );
//   if (!result) {
//     res.status(404).json({ message: 'Contact not found' });
//   }
//   res.status(200).json(result);
// });

// router.post('/', async (req, res) => {
//   const validate = schema.validate(req.body);
//   if (validate.error) {
//     res
//       .status(400)
//       .json({ message: validate.error.message });
//   } else {
//     const result = await ctrl.addContact(req.body);
//     res.status(201).json(result);
//   }
// });

// router.delete('/:contactId', async (req, res) => {
//   const deleteContact = await ctrl.removeContact(
//     req.params.contactId
//   );
//   if (!deleteContact) {
//     res.status(404).json({ message: 'Contact not found' });
//   }
//   res.status(200).json({ message: 'Contact deleted' });
// });

// router.put('/:contactId', async (req, res) => {
//   const validate = schema.validate(req.body);
//   if (validate.error) {
//     res
//       .status(400)
//       .json({ message: validate.error.message });
//   } else {
//     const result = await ctrl.updateContact(
//       req.params.contactId,
//       req.body
//     );
//     if (result) {
//       res.status(200).json(result);
//     } else {
//       res
//         .status(404)
//         .json({ message: 'Contact not found' });
//     }
//   }
// });

module.exports = router;
