// const { httpError } = require("../helpers");
// import httpError from "../helpers/httpError.js";
import Board from "../models/Board.js";
// const { Board } = require("../models/board");

export const getAllBoards = (filter = {}) =>
  Board.find(filter, "-createdAt -updatedAt").populate("owner", "email");

export const countBoards = (filter) => Board.countDocuments(filter);

export const getBoardById = (filter) => Board.findOne(filter);

export const updateBoardbyFilter = (filter, data) =>
  Board.findOneAndUpdate(filter, data);

export const removeBoard = (filter) => Board.findOneAndDelete(filter);

export const createBoard = (data) => Board.create(data);

// module.exports = {
//   getAllBoards,
//   getBoardById,
//   updateBoard,
//   deleteBoard,
//   createBoard,
// };
