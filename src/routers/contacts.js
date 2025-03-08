import { Router } from 'express';
import {
  getContactByIdController,
  getContactsController,
} from '../controllers/contacts.js';
import { ctrlWrspper } from '../utils/ctrlWrapper.js';

const router = Router();
router.get('/contacts', getContactsController);
router.get('/contacts/:contactId', getContactByIdController);
router.get('contacts', ctrlWrspper(getContactsController));
router.get('/contacts/:contactsId', ctrlWrspper(getContactByIdController));

export default router;
