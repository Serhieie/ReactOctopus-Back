const express = require("express");
const { validateBody, autenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/authControllers");

const router = express.Router();

router.post("/register", validateBody(schemas.registrationSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", autenticate, ctrl.current);
router.post("/logout", autenticate, ctrl.logout);

module.exports = router;
