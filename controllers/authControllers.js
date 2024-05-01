const { ctrlWrapper } = require("../helpers");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} = require("../services/authServise");

const register = async (req, res) => {
  const newUser = await registerUser(req.body);
  res.status(201).json({ user: newUser });
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

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
};
