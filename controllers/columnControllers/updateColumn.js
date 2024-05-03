import httpError from "../../helpers/httpError.js";

import { updateColumnbyFilter } from "../../services/columnService.js";

export const updateColumn = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw httpError(400, "Body must have at least one field");
  }

  const { boardid: owner, columnid: id } = req.params;

  const result = await updateColumnbyFilter({ owner, _id: id }, req.body);

  if (!result) {
    throw httpError(404, `Column with id: ${id} not found`);
  }

  res.json(result);
};
