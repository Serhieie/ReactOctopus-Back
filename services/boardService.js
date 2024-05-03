import Board from "../models/Board.js";

export const getAllBoards = (filter = {}) =>
  Board.find(filter, "-createdAt -updatedAt").populate("owner", "email");

export const countBoards = (filter) => Board.countDocuments(filter);

export const getBoardById = (filter) => Board.findOne(filter);

export const updateBoardbyFilter = (filter, data) =>
  Board.findOneAndUpdate(filter, data);

export const removeBoard = (filter) => Board.findOneAndDelete(filter);

export const createBoard = (data) => Board.create(data);
