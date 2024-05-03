import { createBoard } from "../../services/boardService.js";

export const addBoard = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await createBoard({ ...req.body, owner });

  res.json({
    result,
  });
};
