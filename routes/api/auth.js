import express from "express";
import {
  authUserLoginSchema,
  authUserRegisterSchema,
  authUserUpdateSchema,
} from "../../schemas/usersSchema.js";
import ctrlWrapper from "../../helpers/ctrlWrapper.js";
import {
  current,
  logout,
  signin,
  signup,
  updateProfile,
  wakeUp,
  googleAuth,
  googleRedirect,
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

authRouter.patch(
  "/update-profile",
  validateToken,
  upload.single("avatar"),
  validateBody(authUserUpdateSchema),
  ctrlWrapper(updateProfile)
);

authRouter.get("/ping", ctrlWrapper(wakeUp));

//Google auth

authRouter.get("/google", ctrlWrapper(googleAuth));
authRouter.get("/google-redirect", ctrlWrapper(googleRedirect));

//FrontEnd
//<a href="http://localhost:3000/api/auth/google">Authorize with Google</a>
export default authRouter;
