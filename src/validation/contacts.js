import Joi from 'joi';
import { phoneNumberRegex } from '../constants/constants.js';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().pattern(phoneNumberRegex).required(),
  email: Joi.string().email().allow(null).optional(),
  contactType: Joi.string().valid('work', 'home', 'personal').optional(),
  isFavourite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().pattern(phoneNumberRegex),
  email: Joi.string().email(),
  contactType: Joi.string().valid('work', 'home', 'personal').optional(),
  isFavourite: Joi.boolean(),
});
