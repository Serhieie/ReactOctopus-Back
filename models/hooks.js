export const handleSaveError = (error, data, next) => {
  const { name, code } = error;
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  next();
};

export const setUpdateSetting = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};

export const deleteAllColumns = async function (next) {
  try {
     await mongoose.model('column').deleteMany({ boardId: this._id });
    next();
  } catch (error) {
    next(error);
  }
}


export const deleteAllCards = async function (next) {
  try {
     await mongoose.model('card').deleteMany({ columnId: this._id });
    next();
  } catch (error) {
    next(error);
  }
}
