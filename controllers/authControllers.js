import { ctrlWrapper } from "../helpers/index.js";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} from "../services/authServise.js";
import queryString from "query-string";
import axios from "axios";


const register = async (req, res) => {
  const newUser = await registerUser(req.body);
  res.status(201).json(newUser);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const userData = await loginUser(email, password);
  res.json(userData);
};

const current = async (req, res) => {
  const { email } = req.user;
  const currentUser = await getCurrentUser(email);
  res.json(currentUser);
};

const logout = async (req, res) => {
  const { _id } = req.user;
  const logoutData = await logoutUser(_id);
  res.json(logoutData);
};








//google
const googleAuth = (req,res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile"
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });

  return res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`)
}


const googleRedirect = async (req,res) => {
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
      code
    }
  })

  const userData = await axios({
  uri: "https://www.googleapis.com/oauth2/v2/userinfo",
  method: "get",
  headers: {
    Authorization: `Bearer ${tokenData.data.access_token}`
  }
  });

  //userData.data.email
  // логіка додавання юзера на бек реестрація або логінізація
  // в залежності від того чи є він на бекенді


  //тут емейл для перевірки, треба добавляти токен, як показано нижче
  return res.redirect(`${process.env.FRONTEND_URL}?email=${userData.data.email}`)

  //   //токен який створюється при додаванні юзера
  // return res.redirect(`${process.env.FRONTEND_URL}?accessToken=${accessToken}&refreshToken${refreshToken}`);
  // //на фронті можна зробити окремий роут з повідомленням для кращої взаємодії з користувачем 
  // // return res.redirect(`${process.env.FRONTEND_URL}/google-redirect?accessToken=${accessToken}&refreshToken${refreshToken}`);
}


export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  googleAuth: ctrlWrapper(googleAuth),
  googleRedirect: ctrlWrapper(googleRedirect)
};
