import express from "express";
import {
  authUserLoginSchema,
  authUserRegisterSchema,
  authUserUpdateSchema,
} from "../../schemas/usersSchema.js";
import ctrlWrapper from "../../helpers/ctrlWrapper.js";
import {
  avatars,
  current,
  logout,
  signin,
  signup,
  updateProfile,
  wakeUp,
} from "../../controllers/authControllers.js";
import validateBody from "../../middlewares/validateBody.js";
import { validateToken } from "../../middlewares/validateToken.js";
import upload from "../../middlewares/multerMd.js";

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

authRouter.patch("/avatars", validateToken, upload.single("avatar"), avatars);

authRouter.patch(
  "/update-profile",
  validateToken,
  validateBody(authUserUpdateSchema),
  ctrlWrapper(updateProfile)
);

authRouter.get("/ping", ctrlWrapper(wakeUp));

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
