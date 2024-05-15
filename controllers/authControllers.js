import "dotenv/config";
import jwt from "jsonwebtoken";
import queryString from "query-string";
import { createHash, compareHash } from "../helpers/passwordHash.js";

import httpError from "../helpers/httpError.js";

import { createUser, findUser, updateUser } from "../services/authServise.js";

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

  req.body.avatarURL = "";

  const hashPwd = await createHash(password);

  const id = await createUser({
    ...req.body,
    password: hashPwd,
  });

  const token = jwt.sign({ id }, SECRET_KEY, {
    expiresIn: EXPIRES_TIME,
  });

  const response = await updateUser(id, { token });

  res.status(201).json({
    token,
    user: response,
  });
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

  const token = jwt.sign({ id: user._id }, SECRET_KEY, {
    expiresIn: EXPIRES_TIME,
  });

  const response = await updateUser(user._id, { token });

  res.json({ token, user: response });
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

//====UPDATE-PROFILE====

export const updateProfile = async (req, res) => {
  const img = req.file;
  const {password} = req.body
  const { theme, name, email, _id,avatarURL } = req.user;
  let newPass;
  console.log(1)
  if (password) {
    newPass = req.body.password;
    req.body.password = await createHash(newPass)
  }
  console.log(2)
  
  const newProfile = {
    theme,
    name,
    email,
    ...req.body,
    avatarURL: img ? img.path : avatarURL,
  };


  console.log(3)
  

  const response = await updateUser(_id, newProfile);

  res.json(response);
};

//====wakeUp====

export const wakeUp = async (req, res) => {
  res.json({ message: "I wake up" });
};


//google
export const googleAuth = (req, res) => {
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

export const googleRedirect = async (req, res) => {
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

  //тут емейл для перевірки, треба добавляти токен, як показано нижче
  return res.redirect(
    `${process.env.FRONTEND_URL}?email=${userData.data.email}`
  );

