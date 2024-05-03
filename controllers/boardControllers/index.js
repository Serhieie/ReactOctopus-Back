import { ctrlWrapper } from "../../helpers";

import { getBoards } from "./getBoards.js";
import { addBoard } from "./addBoard.js";
import { deleteBoard } from "./deleteBoard.js";
import { updateBoard } from "./updateBoard.js";

export default {
  getBoards: ctrlWrapper(getBoards),
  addBoard: ctrlWrapper(addBoard),
  deleteBoard: ctrlWrapper(deleteBoard),
  updateBoard: ctrlWrapper(updateBoard),
};
