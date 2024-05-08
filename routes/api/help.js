import helpControllers from '../../controllers/helpControllers.js';
import { needHelpSchema } from '../../models/needhelp.js';
import validateBody from '../../middlewares/validateBody.js';
import express from 'express';
import autenticate from '../../middlewares/autenticate.js';

const router = express.Router();

router.post(
  '/needhelp',
  validateBody(needHelpSchema),
  // autenticate,
  helpControllers.sendNeedHelp
);

export default router;
