const express = require("express");
const ctrl = require("../../controllers/boardControllers");

const router = express.Router();
const { isValidId, autenticate, validateBody, upload } = require("../../middlewares");
const { schemas } = require("../../models/board");

router.get("/", autenticate, ctrl.getAll);

module.exports = router;
