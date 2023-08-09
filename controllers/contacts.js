const fs = require('fs').promises;
const path = require('node:path');
const { nanoid } = require('nanoid');
const { error } = require('console');

const contactsPath = path.join(__dirname, 'contacts.json');

const updateContacts = async contacts =>
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2)
  );

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

const getContactById = async id => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === id);
  return result || null;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const removeContact = async id => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

const updateContact = async (
  id,
  { name, email, phone }
) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if (index !== -1) {
    const newContact = {
      name,
      email,
      phone,
    };
    contacts[index] = { id: id, ...newContact };
    await updateContacts(contacts);
    return contacts[index];
  } else {
    return null;
  }
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await listContacts(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw error(404, 'Not found');
  }
  res.json(result);
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
