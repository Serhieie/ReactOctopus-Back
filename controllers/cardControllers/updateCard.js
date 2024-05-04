import httpError from "../../helpers/httpError.js";
import { updateCardbyFilter } from "../../services/cardService.js";

export const updateCard = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw httpError(400, "Body must have at least one field");
  }

  const { columnid: owner, cardid: id } = req.params;

  const result = await updateCardbyFilter({ owner, _id: id }, req.body);

  if (!result) {
    throw httpError(404, `Card with id: ${id} not found`);
  }

  res.json(result);
};
