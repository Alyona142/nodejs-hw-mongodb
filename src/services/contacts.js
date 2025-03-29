import { SORT_ORDER } from '../constants/constants.js';
import ContactsCollection from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  userId,
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactQuery = ContactsCollection.countDocuments({ userId });
  const contactCount = await ContactsCollection.find({ userId });
  // .merge(contactQuery)
  // .countDocuments();

  const contacts = await contactQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export async function getContactById(id) {
  try {
    return await ContactsCollection.findById(id);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async ({ _id, userId }) => {
  const contact = await ContactsCollection.findOneAndDelete({ _id, userId });
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const result = await ContactsCollection.findByIdAndUpdate(
    contactId,
    payload,
    { new: true, upsert: false, ...options },
  );

  return result || null;
};
// export const updateContact = async (contactId, payload, options = {}) => {
//   const result = await ContactsCollection.findByIdAndUpdate(
//     contactId,
//     payload,
//     { new: true, includeResultMetadata: true, ...options, upsert: false },
//   );

//   if (!result || !result.value) return null;

//   return {
//     contact: result.value,
//     isNew: Boolean(result?.lastErrorObject?.upserted),
//   };
// };
