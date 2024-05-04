import { getAllCards, countCards } from "../../services/cardService.js";

export const getCards = async (req, res) => {
  const { columnid: owner } = req.params;
  const { label } = req.query;

  const result = label
    ? await getAllCards({ owner, label })
    : await getAllCards({ owner });

  const total = label
    ? await getAllCards({ owner, label })
    : await getAllCards({ owner });

  res.json({
    result,
    total,
  });
};
