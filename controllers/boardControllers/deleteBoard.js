import { httpError } from "../../helpers";
import { removeBoard } from "../../services/boardService.js";

export const deleteBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await removeBoard({ owner, _id: id });

  if (!result) {
    throw httpError(404, `Board with id: ${id} not found`);
  }

  res.json(id);
};
