const Joi = require('joi');
const { Schema, model } = require('mongoose');

const contact = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const schema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': `"name" should be a type of 'string'`,
    'any.required': `"name" is a required field`,
  }),
  phone: Joi.string().messages({
    'string.base': `"phone" should be a type of 'string'`,
  }),
  email: Joi.string().email().messages({
    'string.base': `"email" should be a type of 'string'`,
  }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean(),
});

const Schemas = {
  schema,
  updateFavoriteSchema,
};

const Contact = model('contact', contact, 'contacts');

module.exports = {
  Schemas,
  Contact,
};
