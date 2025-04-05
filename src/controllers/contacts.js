import {
  createContact,
  updateContact,
  deleteContact,
  getAllContacts,
  getContactById,
} from '../services/contacts.js';
import { Types } from 'mongoose';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId: req.user.id,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = ctrlWrapper(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact || contact.userId.toString() !== userId.toString()) {
    return next(createHttpError(404, `Contact with ID ${contactId} not found`));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with ID ${contactId}`,
    data: contact,
  });
});

export const createContactController = ctrlWrapper(async (req, res) => {
  const { _id: userId } = req.user;
  const contact = await createContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
});

export const deleteContactController = ctrlWrapper(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;

  if (!Types.ObjectId.isValid(contactId)) {
    throw createHttpError(400, 'Invalid contact ID');
  }

  const contact = await deleteContact({ _id: contactId, userId });

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
});

export const upsertContactController = ctrlWrapper(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;

  const result = await updateContact({ _id: contactId, userId }, req.body, {
    upsert: true,
    new: true,
  });

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated a contact!',
    data: result,
  });
});

export const patchContactController = ctrlWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  if (!Types.ObjectId.isValid(contactId)) {
    throw createHttpError(400, 'Invalid contact ID');
  }

  const contact = await updateContact({ _id: contactId, userId }, req.body, {
    new: true,
  });

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: contact,
  });
});
