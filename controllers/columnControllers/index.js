import ctrlWrapper from "../../helpers/ctrlWrapper.js";

import { addColumn } from "./addColumn.js";
import { getColumns } from "./getColumns.js";
import { updateColumn } from "./updateColumn.js";
import { deleteColumn } from "./deleteColumn.js";

export default {
  addColumn: ctrlWrapper(addColumn),
  getColumns: ctrlWrapper(getColumns),
  updateColumn: ctrlWrapper(updateColumn),
  deleteColumn: ctrlWrapper(deleteColumn),
};
