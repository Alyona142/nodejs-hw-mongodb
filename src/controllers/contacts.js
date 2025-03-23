import {
  createContact,
  updateContact,
  deleteContact,
  getAllContacts,
  getContactById,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import mongoose from 'mongoose';

export const getContactsController = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);

    const contacts = await getAllContacts({
      userId,
      page,
      perPage,
      sortBy,
      sortOrder,
    });

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return next(
      createHttpError(400, `Invalid contact ID format: ${contactId}`),
    );
  }

  try {
    const contact = await getContactById(contactId);

    if (!contact || contact.userId.toString() !== userId.toString()) {
      return next(
        createHttpError(404, `Contact with ID ${contactId} not found`),
      );
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with ID ${contactId}`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const contact = await createContact({ ...req.body, userId });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { contactId } = req.params;

    const contact = await deleteContact({ _id: contactId, userId });

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const upsertContactController = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

export const patchContactController = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { contactId } = req.params;

    const result = await updateContact({ _id: contactId, userId }, req.body, {
      new: true,
    });

    if (!result) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: 'Successfully updated a contact!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
