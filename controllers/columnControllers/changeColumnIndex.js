import httpError from "../../helpers/httpError.js";
import { changeColumnIndex } from "../../services/columnService.js";

export const changeColumnIndexController = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw httpError(400, "Body must have at least one field");
  }
    const result = await changeColumnIndex(req);
    
  if (!result) {
    throw httpError(404, `Card with id: ${id} not found`);
  }

  res.json(result);
};
