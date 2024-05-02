const helpControllers = require('../../controllers/helpControllers');
const { needHelpSchema } = require('../../models/help');
const { validateBody } = require('../../middlewares');
const express = require('express');

const router = express.Router();

router.post(
  '/needhelp',
  validateBody(needHelpSchema),
  helpControllers.sendNeedHelp
);

module.exports = router;
