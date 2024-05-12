import Board from "../models/board.js";

export const getAllBoards = (filter = {}) =>
  Board.find(filter, "-createdAt -updatedAt") .populate({
        path: "columns", 
        model: "column",
        populate: {
          path: "cards", 
          model: "card",
        },
      }).populate("owner", "email");

export const getBoardbyId = (filter) =>
   Board.findById(filter)
      .select("-createdAt -updatedAt") 
      .populate({
        path: "columns", 
        model: "column",
        populate: {
          path: "cards", 
          model: "card",
        },
      })
      .populate("owner", "email");

export const countBoards = (filter) => Board.countDocuments(filter);

// export const getBoardById = (filter) => Board.findOne(filter);

export const updateBoardbyFilter = (filter, data) =>
  Board.findOneAndUpdate(filter, data);

export const removeBoard = (filter) => Board.findOneAndDelete(filter);

export const createBoard = (data) => Board.create(data);
