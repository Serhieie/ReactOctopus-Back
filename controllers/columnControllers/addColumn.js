import { createColumn } from "../../services/columnService.js";

export const addColumn = async (req, res) => {
  const { id: owner } = req.params;

  const result = await createColumn({ ...req.body, owner });

  res.json({
    result,
  });
};
