import express from "express";
import { validateBody, autenticate } from "../../middlewares/index.js";
import { schemas } from "../../models/user.js";
import { ctrlWrapper } from "../../helpers/index.js";
import ctrl from "../../controllers/authControllers.js";


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

export default router;


