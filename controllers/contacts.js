const { Contact } = require('../models/schemas');
const requestError = require('../helpers/requestError');
const mongoose = require('mongoose');

const listContacts = async (req, res) => {
  const result = await Contact.find(
    {},
    '-createdAt -updatedAt'
  );
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw requestError(404, 'Not found');
  }
  res.status(200).json(result);
};

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

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
};
