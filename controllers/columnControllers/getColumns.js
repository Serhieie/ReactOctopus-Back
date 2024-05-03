import { getAllColumns, countColumns } from "../../services/columnService.js";

export const getColumns = async (req, res) => {
  const { id: owner } = req.params;

  const result = await getAllColumns({ owner });
  const total = await countColumns({ owner });

  res.json({
    result,
    total,
  });
};
