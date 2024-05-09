import { createCard } from "../../services/cardService.js";

export const addCard = async (req, res) => {
  const result = await createCard(req);

  res.json(
    result,
  );
};
