import Board from "../models/board.js";
import Column from "../models/column.js";

export const getAllColumns = (filter = {}) =>
  Column.find(filter, "-createdAt -updatedAt").populate("owner", "_id");

export const countColumns = (filter) => Column.countDocuments(filter);

export const getColumnById = (filter) => Column.findOne(filter);

export const updateColumnbyFilter = (filter, data) =>
  Column.findOneAndUpdate(filter, data);

export const removedColumn = (filter) => Column.findOneAndDelete(filter);

// export const createColumn = (data) => Column.create(data);

export const createColumn = async (req) => {
  const column = await Column.create({ ...req.body, owner: req.user._id });
  const { boardId } = req.body;
  const board = await Board.findById(boardId);
  const columnId = column._id;
  board.columns.push(columnId);
  await board.save(columnId);
  return column
};