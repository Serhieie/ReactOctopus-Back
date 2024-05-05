const User = require("../models/user");
const { AppError } = require("../utils/index");

const saveTokenToUser = async (id, token) => {
  try {
    const update = {
      token,
    };


    const saveToken = await User.findByIdAndUpdate(id, update);

    return saveToken;
  } catch (error) {
    throw new AppError(500, error);
  }
};

module.exports = saveTokenToUser;