const express = require('express');
const { ctrl } = require('../../controllers/contacts');
const { ctrlTask } = require('../../helpers/ctrlTask');
const {
  validateBody,
  validateId,
} = require('../../middleware');
const { Schemas } = require('../../models/schemas');
const router = express.Router();

router.get('/', ctrlTask(ctrl.listContacts));

router.get(
  '/:contactId',
  validateId,
  ctrlTask(ctrl.getContactById)
);

router.post(
  '/',
  validateBody(Schemas.schema),
  ctrlTask(ctrl.addContact)
);

router.delete(
  '/:contactId',
  validateId,
  ctrlTask(ctrl.removeContact)
);

router.put(
  '/:contactId',
  validateId,
  validateBody(Schemas.schema),
  ctrlTask(ctrl.updateContact)
);

router.patch(
  '/:contactId/favorite',
  validateId,
  validateBody(Schemas.updateFavoriteSchema),
  ctrlTask(ctrl.updateFavorite)
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
