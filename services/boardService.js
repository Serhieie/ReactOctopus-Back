import Board from "../models/board.js";

export const getAllBoards = (filter = {}) =>
  Board.find(filter, "-createdAt -updatedAt").populate({
        path: "columns", 
        model: "column",
        populate: {
          path: "cards", 
          model: "card",
        },
      }).populate("owner", "email");

export const getBoardbyId = async (filter) =>{
  const oldActive = await Board.findOne({ owner: filter.owner, active: true }); 
  if (oldActive) {
    oldActive.active = false;
    await oldActive.save();
  }

  const newActive = await Board.findByIdAndUpdate(
    { owner: filter.owner, _id: filter._id },
    { active: filter.active }, 
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

  console.log("oldActive", oldActive);
  console.log("newActive", newActive);

  return newActive;
};

export const countBoards = (filter) => Board.countDocuments(filter);

export const updateBoardbyFilter = (filter, data) =>
  Board.findOneAndUpdate(filter, data).populate({
        path: "columns", 
        model: "column",
        populate: {
          path: "cards", 
          model: "card",
        },
      }).populate("owner", "email");

export const removeBoard = async (filter) => {
  const deletedBoard = await Board.findOneAndDelete(filter);
  if (deletedBoard && deletedBoard.active) {
    const latestBoard = await Board.findOne({ owner: deletedBoard.owner })
      .sort({ createdAt: -1 }) 
      .limit(1);
    
    if (latestBoard) {
      latestBoard.active = true;
      await latestBoard.save(); 
    }
  }

  return deletedBoard;
};

export const createBoard = async (req) => {
  const { _id: userId } = req.user

  const oldActive = await Board.findOne({ owner: userId, active: true });
  if (oldActive) {
    oldActive.active = false;
    await oldActive.save();
  }
  
  const newBoard = await Board.create({ ...req.body, owner: userId })
  return newBoard;
};
