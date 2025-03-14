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
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/contacts.js';
import { updateContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/contacts', ctrlWrspper(getContactsController));
router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrspper(getContactByIdController),
);
router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrspper(createContactController),
);
router.delete('/contacts/:contactId', ctrlWrspper(deleteContactController));
router.put(
  '/contacts/:contactId',
  validateBody(createContactSchema),
  ctrlWrspper(upsertContactController),
);
router.patch(
  '/contacts/:contactId',
  validateBody(updateContactSchema),
  ctrlWrspper(patchContactController),
);

export default router;
