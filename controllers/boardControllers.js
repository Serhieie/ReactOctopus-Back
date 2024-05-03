const { ctrlWrapper } = require("../helpers");
// const {
//   getAllBoards,
//   getBoardById,
//   updateBoard,
//   deleteBoard,
//   createBoard,
// } = require("../services/boardService");

const getAll = async (req, res) => {
  const { page, limit } = req.query;
  const result = await getAllBoards(page, limit);
  res.json(result);
};

const getById = async (req, res) => {};

const update = async (req, res) => {};

const remove = async (req, res) => {};

const post = async (req, res) => {};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  update: ctrlWrapper(update),
  remove: ctrlWrapper(remove),
  post: ctrlWrapper(post),
};
