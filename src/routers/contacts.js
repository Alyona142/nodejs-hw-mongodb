import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
  upsertContactController,
} from '../controllers/contacts.js';
import { ctrlWrspper } from '../utils/ctrlWrapper.js';

const router = Router();
router.get('/contacts', getContactsController);
router.get('/contacts/:contactId', getContactByIdController);
router.get('contacts', ctrlWrspper(getContactsController));
router.get('/contacts/:contactsId', ctrlWrspper(getContactByIdController));
router.post('contacts', ctrlWrspper(createContactController));
router.delete('contacts/:contactId', ctrlWrspper(deleteContactController));
router.put('contacts/:contactId', ctrlWrspper(upsertContactController));
router.patch('contacts/:contactId', ctrlWrspper(patchContactController));

export default router;
