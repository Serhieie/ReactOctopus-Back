const User = require("../models/user");
const { AppError } = require("../utils/index");

const editUserInfo = async (id,data) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
        {
          ...data      
        },
      { new: true }
    );
    return user
  } catch (error) {
    throw new AppError(500, error.message);
  }
};

module.exports = editUserInfo;