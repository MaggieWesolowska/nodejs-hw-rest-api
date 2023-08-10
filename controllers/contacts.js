const { Contact } = require('../models/schemas');
const requestError = require('../helpers/requestError');

const listContacts = async (req, res) => {
  try {
    const result = await Contact.find(
      {},
      '-createdAt -updatedAt'
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw requestError(404, 'Not found');
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addContact = async (req, res) => {
  try {
    const result = await Contact.create(req.body);
    if (!result) {
      throw requestError(404, 'Not found');
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(
      contactId
    );
    if (!result) {
      throw requestError(404, 'Not found');
    }
    res.status(200).json({
      message: 'Delete successful',
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateContact = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateFavorite = async (req, res) => {
  try {
    const { contactId } = req.params;
    const result = await listContacts(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw requestError(404, 'Not found');
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
};
