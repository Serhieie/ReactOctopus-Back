import { ctrlWrapper } from "../helpers/index.js";
import {
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
  createBoard,
} from "../services/boardService.js";


const getAll = async (req, res) => {
  const { page, limit } = req.query;
  const result = await getAllBoards(page, limit);
  res.json(result);
};

const getById = async (req, res) => {
};

const update = async (req, res) => {
};

const remove = async (req, res) => {
};

const post = async (req, res) => {
};


export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  update: ctrlWrapper(update),
  remove: ctrlWrapper(remove),
  post: ctrlWrapper(post),
};

