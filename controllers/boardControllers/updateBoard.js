import { httpError } from "../../helpers";

import { updateBoardbyFilter } from "../../services/boardService";

export const updateBoard = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw httpError(400, "Body must have at least one field");
  }

  const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await updateBoardbyFilter({ owner, _id: id }, req.body);

  if (!result) {
    throw httpError(404, `Board with id: ${id} not found`);
  }

  res.json(result);
};
