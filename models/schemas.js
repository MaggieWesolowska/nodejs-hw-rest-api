const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const contact = new Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 70,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
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
  phone: Joi.string().required().messages({
    'string.base': `"phone" should be a type of 'string'`,
    'any.required': `"phone" is a required field`,
  }),
  email: Joi.string().email().required().messages({
    'string.base': `"email" should be a type of 'string'`,
    'any.required': `"email" is a required field`,
  }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Schemas = {
  schema,
  updateFavoriteSchema,
};

const Contact = model('contact', contact);

module.exports = {
  Schemas,
  Contact,
};
