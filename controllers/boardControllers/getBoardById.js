import { getBoardbyId } from "../../services/boardService.js";

export const getBoardById = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const board = await getBoardbyId({_id, owner});
    res.json(board);
};