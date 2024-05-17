import httpError from "../../helpers/httpError.js";
import { changeIndex } from "../../services/cardService.js";

export const changeIndexController = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw httpError(400, "Body must have at least one field");
  }
    const result = await changeIndex(req);
    
  if (!result) {
    throw httpError(404, `Card with id: ${id} not found`);
  }
  res.json(result);
};
