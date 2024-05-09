import { getAllCards, countCards } from "../../services/cardService.js";

export const getCards = async (req, res) => {
    const { _id: owner } = req.user;
  const { columnId } = req.params;
  
  const result = await getAllCards({ owner, columnId });
  const total = await countCards({ owner, columnId });

  res.json({
    result,
    total,
  });
};
