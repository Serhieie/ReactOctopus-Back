import Card from "../models/card.js";
import Column from "../models/column.js";

export const getAllCards = (filter = {}) =>
  Card.find(filter, "-createdAt -updatedAt").populate("owner", "_id");

export const countCards = (filter) => Card.countDocuments(filter);

export const getCardById = (filter) => Card.findOne(filter);

export const updateCardbyFilter = (filter, data) =>
  Card.findOneAndUpdate(filter, data);

export const removeCard = (filter) => Card.findOneAndDelete(filter);

// export const createCard = (data) => Card.create(data);

export const createCard = async (req) => {
  const card = await Card.create({ ...req.body, owner: req.user._id });
  const { columnId } = req.body;
  const column = await Column.findById(columnId);
  const cardId = card._id;
  column.cards.push(cardId);
  await column.save(cardId);
  return card
};
