const express = require("express");
const { validateBody, autenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");
const {ctrlWrapper} = require("../../helpers")
const ctrl = require("../../controllers/authControllers");

const router = express.Router();

router.post("/register", validateBody(schemas.registrationSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", autenticate, ctrl.current);
router.post("/logout", autenticate, ctrl.logout);



//Google auth
router.get("/google", ctrl.googleAuth);
router.get("/google-redirect", ctrl.googleRedirect);

//FrontEnd 
//<a href="http://localhost:3000/api/auth/google">Authorize with Google</a>

module.exports = router;

