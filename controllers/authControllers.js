import "dotenv/config";
import jwt from "jsonwebtoken";
import queryString from "query-string";
import { createHash, compareHash } from "../helpers/passwordHash.js";
import axios from "axios";
import httpError from "../helpers/httpError.js";
import { createUser, findUser, updateUser } from "../services/authServise.js";
import { User } from "../models/user.js";

const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRES_TIME = process.env.EXPIRES_TIME;

// ======REGISTRATION======
export const signup = async (req, res) => {
  const { email, password } = req.body;
  const [user] = await findUser(email);
    if (user && !user.googleId) {
    throw httpError(409, "Email in use");
    } else if (user && user.googleId) {
      if (user.avatarURL) req.body.avatarURL = user.avatarURL;
      else req.body.avatarURL = "";
      
      const hashPwd = await createHash(password);
      const updatedUser = await updateUser(user._id, {
      name: user.name,
      email: user.email,
      theme: user.theme,
      googleId: user.googleId,
      theme: "dark",
      password: hashPwd,
      });

  const token = jwt.sign(updatedUser._id , SECRET_KEY, {
    expiresIn: EXPIRES_TIME,
  });
      const response = await updateUser(updatedUser._id, { token });
  res.status(201).json({
    token,
    user: response,
  });
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
  const { email, theme, avatarURL, name } = req.user;

  res.json({ email, theme, avatarURL, name });
};

//====UPDATE-PROFILE====

export const updateProfile = async (req, res) => {
  const img = req.file;
  const {password} = req.body
  const { theme, name, email, _id,avatarURL } = req.user;
  let newPass;
  if (password) {
    newPass = req.body.password;
    req.body.password = await createHash(newPass)
  }
  
  const newProfile = {
    theme,
    name,
    email,
    ...req.body,
    avatarURL: img ? img.path : avatarURL,
  };
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
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

//   {
//   id: '117455998533450141821',
//   email: 'theninjainme@gmail.com',
//   verified_email: true,
//   name: 'Bohdan S',
//   given_name: 'Bohdan',
//   family_name: 'S',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocIJPBXLVVTI5Gpv3eCJ8hNN6VcQ8oA1hyQRTYSlq6jKrz_rvRs=s96-c',
//   locale: 'en-US'
  // }
  
  const { email, id, picture, name, verified_email } = userData.data;
  const user = await User.findOne({ email });

if (!user) {
  const hashPwd = await createHash(id);
  
    const newUser = await createUser({
        name,
        email,
        theme: "dark",
        googleId: hashPwd,
        password: hashPwd,
        avatarURL: picture ? picture : "",
    });
  
    const payload = { id: newUser._id };
    const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: EXPIRES_TIME,
    });
  
  await updateUser(newUser._id, { token });
  
    return res.redirect(
    `http://localhost:5173/ReactOctopus/auth/google/?token=${token}`
);
} else {
    if(!user.googleId){
    const isValidGoogleId = await createHash(id);
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: EXPIRES_TIME,
    });
      await updateUser(user._id, { token, googleId: isValidGoogleId });

    return res.redirect(
    `http://localhost:5173/ReactOctopus/auth/google/?token=${token}`
      );
    } else {
      const isValidGoogleId = await compareHash(id, user.googleId);

      if (!isValidGoogleId) {
      throw httpError(401, "GoogleId is wrong");
      }
      const payload = { id: user._id };
      const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: EXPIRES_TIME,
      });
      await updateUser(user._id, { token });
      return res.redirect(`http://localhost:5173/ReactOctopus/auth/google/?token=${token}`
        
    // `${process.env.FRONTEND_URL}auth/google/?token=${token}`
      );
    }
}
}