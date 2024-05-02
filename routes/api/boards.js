import express from "express";
import ctrl from "../../controllers/boardControllers.js";
import { isValidId, autenticate, validateBody, upload } from "../../middlewares/index.js";
import { schemas } from "../../models/board.js";


const router = express.Router();
router.get("/", autenticate, ctrl.getAll);

export default router;

