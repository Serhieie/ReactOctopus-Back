import { createBoard } from "../../services/boardService.js";

export const addBoard = async (req, res) => {

  const result = await createBoard(req);

  res.json(
    result
  );
};
