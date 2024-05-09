import { createColumn } from "../../services/columnService.js";

export const addColumn =  async (req, res) => {
  const column =  await createColumn(req);

  res.json(column);
};
