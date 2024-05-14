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
  }).select("email name  theme avatarURL -_id");
};
