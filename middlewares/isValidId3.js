import { isValidObjectId } from "mongoose";
import { httpError } from "../helpers/index.js";

const isValidId3 = (req, res, next) => {
  const { boardid, columnid, cardid } = req.params;
  if (!isValidObjectId(boardid)) {
    next(httpError(400, `${boardid} is not valid id`));
  } else if (!isValidObjectId(columnid)) {
    next(httpError(400, `${columnid} is not valid id`));
  } else if (!isValidObjectId(cardid)) {
    next(httpError(400, `${cardid} is not valid id`));
  }
  next();
};

export default isValidId3;
