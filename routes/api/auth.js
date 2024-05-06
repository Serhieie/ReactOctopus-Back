import express from "express";
import {
  authUserLoginSchema,
  authUserRegisterSchema,
} from "../../schemas/usersSchema.js";
import ctrlWrapper from "../../helpers/ctrlWrapper.js";
import {
  current,
  logout,
  signin,
  signup,
} from "../../controllers/authControllers.js";
import validateBody from "../../middlewares/validateBody.js";
import { validateToken } from "../../middlewares/validateToken.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(authUserRegisterSchema),
  ctrlWrapper(signup)
);

authRouter.post(
  "/login",
  validateBody(authUserLoginSchema),
  ctrlWrapper(signin)
);

authRouter.post("/logout", validateToken, ctrlWrapper(logout));

authRouter.get("/current", validateToken, ctrlWrapper(current));

// authRouter.patch(
//   '/info',
//   uploadCloudParams.single('avatar')
// );

//Google auth
/*
authRouter.get("/google", ctrl.googleAuth);
authRouter.get("/google-redirect", ctrl.googleRedirect);

//FrontEnd
//<a href="http://localhost:3000/api/auth/google">Authorize with Google</a>
*/
export default authRouter;
