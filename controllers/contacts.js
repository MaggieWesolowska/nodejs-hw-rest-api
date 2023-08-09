const { Contact } = require('../models/schemas');
const requestError = require('../helpers/requestError');

const listContacts = async (req, res) => {
  const result = await Contact.find(
    {},
    '-createdAt -updatedAt'
  );
  res.status(200).json(result);
};

// const listContacts = async (req, res, next) => {
//   try {
//     const results = await Contact.find();
//     res.json({
//       status: 'success',
//       code: 200,
//       data: {
//         tasks: results,
//       },
//     });
//   } catch (e) {
//     console.error(e);
//     next(e);
//   }
// };

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw requestError(404, 'Not found');
  }
  res.status(200).json(result);
};

// const getContactById = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const result = await Contact.findbyId(contactId);
//     if (result) {
//       res.json({
//         status: 'success',
//         code: 200,
//         data: { task: result },
//       });
//     } else {
//       res.status(404).json({
//         status: 'error',
//         code: 404,
//         message: `Not found contact id: ${id}`,
//         data: 'Not Found',
//       });
//     }
//   } catch (e) {
//     console.error(e);
//     next(e);
//   }
// };

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  if (!result) {
    throw requestError(404, 'Not found');
  }
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw requestError(404, 'Not found');
  }
  res.status(200).json({
    message: 'Delete successful',
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    { new: true }
  );
  if (!result) {
    throw requestError(404, 'Not found');
  }
  res.status(200).json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await listContacts(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw requestError(404, 'Not found');
  }
  res.status(200).json(result);
};

const ctrl = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
};
module.exports = ctrl;

// const fs = require('fs').promises;
// const path = require('node:path');
// const { nanoid } = require('nanoid');
// const { error } = require('console');

// const contactsPath = path.join(__dirname, 'contacts.json');

// const updateContacts = async contacts =>
//   await fs.writeFile(
//     contactsPath,
//     JSON.stringify(contacts, null, 2)
//   );

// const listContacts = async () => {
//   const result = await fs.readFile(contactsPath);
//   return JSON.parse(result);
// };

// const getContactById = async id => {
//   const contacts = await listContacts();
//   const result = contacts.find(item => item.id === id);
//   return result || null;
// };

// const addContact = async ({ name, email, phone }) => {
//   const contacts = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     name,
//     email,
//     phone,
//   };
//   contacts.push(newContact);
//   await updateContacts(contacts);
//   return newContact;
// };

// const removeContact = async id => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex(item => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = contacts.splice(index, 1);
//   await updateContacts(contacts);
//   return result;
// };

// const updateContact = async (
//   id,
//   { name, email, phone }
// ) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex(item => item.id === id);
//   if (index !== -1) {
//     const newContact = {
//       name,
//       email,
//       phone,
//     };
//     contacts[index] = { id: id, ...newContact };
//     await updateContacts(contacts);
//     return contacts[index];
//   } else {
//     return null;
//   }
// };
