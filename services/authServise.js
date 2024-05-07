import { User } from "../models/user.js";

export const createUser = async (body) => {
  const res = await User.create(body);
  return res._id;
};

export const findUser = async (userEmail) => {
  return User.find({ email: userEmail });
};

export const findUserById = async (id) => {
  return User.findById(id);
};

export const updateUser = async (userId, updateData) => {
  return User.findByIdAndUpdate(userId, updateData, {
    returnDocument: "after",
  }).select("email name -_id");
};

export const updateAvatar = async (userId, updateData) => {
  return User.findByIdAndUpdate(userId, updateData, {
    returnDocument: "after",
  }).select("avatarURL -_id");
};

// import bcrypt from "bcryptjs";
// import { httpError } from "../helpers/index.js";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import { User } from "../models/user.js";

// const { SECRET_KEY } = process.env;

// const registerUser = async (userData) => {
//   const { email, password } = userData;
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     throw httpError(409);
//   }
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = await User.create({ ...userData, password: hashedPassword });

//   const user = await User.findOne({ email });
//   const payload = {
//     id: user.id,
//   };

//   const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
//   await User.findByIdAndUpdate(user._id, { token });

//   return {
//     name: newUser.name,
//     email: newUser.email,
//     token,
//   };
// };

// const loginUser = async (email, password) => {
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw httpError(401);
//   }
//   const passwordCompare = await bcrypt.compare(password, user.password);
//   if (!passwordCompare) {
//     throw httpError(401);
//   }
//   const payload = {
//     id: user.id,
//   };
//   const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
//   await User.findByIdAndUpdate(user._id, { token });
//   return {
//     name: user.name,
//     email,
//     token,
//   };
// };

// const getCurrentUser = async (email) => {
//   const user = await User.findOne({ email });
//   return {
//     id: user._id,
//     name: user.name,
//     email,
//     start: user.createdAt,
//   };
// };

// const logoutUser = async (userId) => {
//   await User.findByIdAndUpdate(userId, {
//     token: "",
//     online: false,
//     lastOnline: Date.now(),
//   });
//   return { message: "Logout success" };
// };

// export { registerUser, loginUser, getCurrentUser, logoutUser };
