import Board from "../models/board.js";
import Column from "../models/column.js";
import httpError from "../helpers/httpError.js";


export const getAllColumns = (filter = {}) =>
  Column.find(filter, "-createdAt -updatedAt")
    .populate({
      path: "cards",
      model: "card",
    })
    .populate("owner", "_id");

export const countColumns = (filter) => Column.countDocuments(filter);

export const getColumnById = (filter) =>
  Column.findOne(filter).populate({
    path: "cards",
    model: "card",
  });

export const updateColumnbyFilter = (filter, data) =>
  Column.findOneAndUpdate(filter, data).populate({
    path: "cards",
    model: "card",
  });

export const removedColumn = (filter) => Column.findOneAndDelete(filter);

export const createColumn = async (req) => {
  const column = await Column.create({ ...req.body, owner: req.user._id });
  const { boardId } = req.body;
  const board = await Board.findById(boardId);
  const columnId = column._id;
  board.columns.push(columnId);
  await board.save(columnId);
  return column;
};


export const changeColumnIndex = async (req) => {
    const { destinationIndex, boardId } = req.body;
    const { id: columnId } = req.params;
    const removedSource = await Board.findOneAndUpdate(
      { _id: boardId },
      { $pull: { columns: columnId } },
      { new: true }
    )

    if (!removedSource) {
         throw httpError(404,"Column not found")
    }
    const updatedColumns = [...removedSource.columns];
  updatedColumns.splice(destinationIndex, 0, columnId);

    const updatedBoard = await Board.findOneAndUpdate(
      { _id: boardId },
      { columns: updatedColumns },
      { new: true }
    ) .select("-createdAt -updatedAt")
    .populate({
      path: "columns",
      model: "column",
      populate: {
        path: "cards",
        model: "card",
      },
    })
    .populate("owner", "email");

    return updatedBoard;
};
