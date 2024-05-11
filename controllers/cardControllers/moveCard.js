import httpError from "../../helpers/httpError.js";
import { moveCard } from "../../services/cardService.js";

export const moveCardController = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw httpError(400, "Body must have at least one field");
  }
    const result = await moveCard(req);
    
  if (!result) {
    throw httpError(404, `Card with id: ${id} not found`);
  }

  res.json(result);
};
