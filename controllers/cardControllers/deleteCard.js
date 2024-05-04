import httpError from "../../helpers/httpError.js";
import { removeCard } from "../../services/cardService.js";

export const deleteCard = async (req, res) => {
  const { columnid: owner, cardid: id } = req.params;

  const result = await removeCard({ owner, _id: id });

  if (!result) {
    throw httpError(404, `Card with id: ${id} not found`);
  }

  res.json(id);
};
