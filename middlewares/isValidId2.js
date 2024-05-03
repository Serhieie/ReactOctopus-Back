import { isValidObjectId } from "mongoose";
import { httpError } from "../helpers/index.js";

const isValidId2 = (req, res, next) => {
  const { boardid, columnid } = req.params;
  if (!isValidObjectId(boardid)) {
    next(httpError(400, `${boardid} is not valid id`));
  } else if (!isValidObjectId(columnid)) {
    next(httpError(400, `${columnid} is not valid id`));
  }
  next();
};

export default isValidId2;
