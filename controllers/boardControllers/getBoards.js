import { getAllBoards, countBoards } from "../../services/boardService.js";

export const getBoards = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await getAllBoards({ owner });
  const total = await countBoards({ owner });

  res.json({
    result,
    total,
  });
};
