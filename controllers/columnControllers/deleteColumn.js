import httpError from "../../helpers/httpError.js";
import { removedColumn } from "../../services/columnService.js";

export const deleteColumn = async (req, res) => {
  const { boardid: owner, columnid: id } = req.params;

  const result = await removedColumn({ owner, _id: id });

  if (!result) {
    throw httpError(404, `Column with id: ${id} not found`);
  }

  res.json(id);
};
