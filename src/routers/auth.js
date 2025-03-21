import { Router } from 'express';
import { ctrlWrspper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import {
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrspper(registerUserController),
);
router.post(
  'login',
  validateBody(loginUserSchema),
  ctrlWrspper(loginUserSchema),
);

router.post('/logout', ctrlWrspper(logoutUserController));

router.post('refresh', ctrlWrspper(refreshUserSessionController));
