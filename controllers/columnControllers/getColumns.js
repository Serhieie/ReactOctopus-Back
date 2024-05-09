import { getAllColumns, countColumns } from "../../services/columnService.js";

export const getColumns = async (req, res) => {
  const { _id: owner } = req.user;
  const { boardId } = req.params;

  const result = await getAllColumns({ owner, boardId });
  const total = await countColumns({ owner, boardId });

  res.json({
    result,
    total,
  });
};
