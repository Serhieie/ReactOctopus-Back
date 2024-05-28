import helpControllers from "../../controllers/helpControllers.js";
import { needHelpSchema } from "../../models/needhelp.js";
import validateBody from "../../middlewares/validateBody.js";
import express from "express";

const router = express.Router();

router.post(
  "/needhelp",
  validateBody(needHelpSchema),
  helpControllers.sendNeedHelp
);

export default router;
