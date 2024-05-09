import { isValidObjectId } from "mongoose";
import { httpError } from "../helpers/index.js";

const isValidId = (req, res, next) => {
  const { boardId, cardId, columnId, id } = req.params;
  let idToCheck;
  if (boardId) {
    idToCheck = boardId;
  } else if (cardId) {
    idToCheck = cardId;
  } else if (columnId) {
    idToCheck = columnId;
  } else if (id) {
    idToCheck = id;
  }
  else {
    return next(httpError(400, 'No id provided'));
  }

  if (!isValidObjectId(idToCheck)) {
    return next(httpError(400, `${idToCheck} is not a valid id`));
  }
  
  next();
};

export default isValidId;
