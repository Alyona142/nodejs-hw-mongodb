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

router.get('/', ctrlWrspper(getContactsController));
router.get('/:contactId', isValidId, ctrlWrspper(getContactByIdController));
router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrspper(createContactController),
);
router.delete('/:contactId', ctrlWrspper(deleteContactController));
router.put(
  '/:contactId',
  validateBody(createContactSchema),
  ctrlWrspper(upsertContactController),
);
router.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrspper(patchContactController),
);

export default router;
