import { getBoardbyId } from "../../services/boardService.js";

export const getBoardById = async (req, res) => {
  const { id: _id } = req.params;
  const board = await getBoardbyId({_id});
    res.json(board);
};