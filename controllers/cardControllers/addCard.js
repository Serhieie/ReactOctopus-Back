import { createCard } from "../../services/cardService.js";

export const addCard = async (req, res) => {
  console.log(req.body);
  const { columnid: owner } = req.params;

  const result = await createCard({ ...req.body, owner });

  res.json({
    result,
  });
};
