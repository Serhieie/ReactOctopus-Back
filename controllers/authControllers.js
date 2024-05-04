import "dotenv/config";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import { v4 as uuidv4 } from "uuid";

import { createHash, compareHash } from "../helpers/passwordHash.js";
import { sendEmail } from "../helpers/sendEmail.js";

import httpError from "../helpers/httpError.js";

import {
  createUser,
  findUser,
  findVerifyToken,
  updateUser,
} from "../services/authServise.js";

const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRES_TIME = process.env.EXPIRES_TIME;
const BASE_URL = process.env.BASE_URL;

// ======REGISTRATION======
export const signup = async (req, res) => {
  const { email, password } = req.body;
  const [user] = await findUser(email);
  if (user) {
    throw httpError(409, "Email in use");
  }

  req.body.avatarURL = gravatar.url(email);

  const hashPwd = await createHash(password);
  const token = uuidv4();

  const response = await createUser({
    ...req.body,
    password: hashPwd,
    verificationToken: token,
  });

  const msg = {
    to: email,
    subject: "Email confirmation",
    html: `<div style="font-family: inherit; text-align: center"><span style="color: #843adc; font-size: 28px">Please verify your email!</span></div>
    <div style="font-family: inherit; text-align: center">To use our application, you need to verify your email</div>
    <td align="center" bgcolor="#000000" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;"><a href="${BASE_URL}/api/auth/verify/${token}" style="background-color:#000000; border:1px solid #000000; border-color:#000000; border-radius:0px; border-width:1px; color:#ffffff; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 40px 12px 40px; text-align:center; text-decoration:none; border-style:solid; font-family:inherit;" target="_blank">Click to verify</a></td>
    <div style="font-family: inherit; text-align: center">If you have not registered, please contact support</div>`,
  };

  await sendEmail(msg);

  res.status(201).json({ user: response });
};

// =======LOGIN======
export const signin = async (req, res) => {
  const { email, password } = req.body;
  const [user] = await findUser(email);

  if (!user) {
    throw httpError(401, "Email or password is wrong");
  }

  const isValidPwd = await compareHash(password, user.password);

  if (!isValidPwd) {
    throw httpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw httpError(600, "Email is not verified");
  }

  const token = jwt.sign({ id: user._id }, SECRET_KEY, {
    expiresIn: EXPIRES_TIME,
  });

  const response = await updateUser(user._id, { token });

  res.json({ token, user: response });
};

//====verifyEmail====
export const verifyEmail = async (req, res) => {
  const verificationToken = req.params;

  const [user] = await findVerifyToken(verificationToken);
  if (!user) {
    throw httpError(404, "User not found");
  }
  const updateData = {
    verificationToken: null,
    verify: true,
  };
  await updateUser(user._id, updateData);

  res.json({ message: "Verification successful" });
};

// ====LOGOUT====
export const logout = async (req, res) => {
  const { _id: id } = req.user;

  await updateUser(id, { token: null });

  res.status(204).json();
};

// ====CURRENT====
export const current = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

//====repeatVerifyEmail====

export const resendVerifyEmail = async (req, res) => {
  const email = req.body.email;
  const [user] = await findUser(email);
  const token = user.verificationToken;

  if (!user) {
    throw httpError(404, "User not found");
  }

  if (!user.verify) {
    const msg = {
      to: email,
      subject: "Email confirmation",
      html: `<div style="font-family: inherit; text-align: center"><span style="color: #843adc; font-size: 28px">Please verify your email!</span></div>
    <div style="font-family: inherit; text-align: center">To use our application, you need to verify your email</div>
    <td align="center" bgcolor="#000000" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;"><a href="${BASE_URL}/api/auth/verify/${token}" style="background-color:#000000; border:1px solid #000000; border-color:#000000; border-radius:0px; border-width:1px; color:#ffffff; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 40px 12px 40px; text-align:center; text-decoration:none; border-style:solid; font-family:inherit;" target="_blank">Click to verify</a></td>
    <div style="font-family: inherit; text-align: center">If you have not registered, please contact support</div>`,
    };

    await sendEmail(msg);

    res.json({ message: "Verification email sent" });
  } else {
    res.status(400).json({ message: "Verification has already been passed" });
  }
};
//================================================================
// import { ctrlWrapper } from "../helpers/index.js";
// import {
//   registerUser,
//   loginUser,
//   getCurrentUser,
//   logoutUser,
// } from "../services/authServise.js";
// import queryString from "query-string";
// import axios from "axios";

// const register = async (req, res) => {
//   const newUser = await registerUser(req.body);
//   res.status(201).json(newUser);
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   const userData = await loginUser(email, password);
//   res.json(userData);
// };

// const current = async (req, res) => {
//   const { email } = req.user;
//   const currentUser = await getCurrentUser(email);
//   res.json(currentUser);
// };

// const logout = async (req, res) => {
//   const { _id } = req.user;
//   const logoutData = await logoutUser(_id);
//   res.json(logoutData);
// };

//google
const googleAuth = (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);

  const code = urlParams.code;

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });

  const userData = await axios({
    uri: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  //userData.data.email
  // логіка додавання юзера на бек реестрація або логінізація
  // в залежності від того чи є він на бекенді

  //тут емейл для перевірки, треба добавляти токен, як показано нижче
  return res.redirect(
    `${process.env.FRONTEND_URL}?email=${userData.data.email}`
  );

  //   //токен який створюється при додаванні юзера
  // return res.redirect(`${process.env.FRONTEND_URL}?accessToken=${accessToken}&refreshToken${refreshToken}`);
  // //на фронті можна зробити окремий роут з повідомленням для кращої взаємодії з користувачем
  // // return res.redirect(`${process.env.FRONTEND_URL}/google-redirect?accessToken=${accessToken}&refreshToken${refreshToken}`);
};

// export default {
//   register: ctrlWrapper(register),
//   login: ctrlWrapper(login),
//   current: ctrlWrapper(current),
//   logout: ctrlWrapper(logout),
//   googleAuth: ctrlWrapper(googleAuth),
//   googleRedirect: ctrlWrapper(googleRedirect)
// };
