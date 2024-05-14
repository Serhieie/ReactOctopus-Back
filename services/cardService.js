import Card from "../models/card.js";
import Column from "../models/column.js";

export const getAllCards = (filter = {}) =>
  Card.find(filter, "-createdAt -updatedAt").populate("owner", "_id");

export const countCards = (filter) => Card.countDocuments(filter);

export const getCardById = (filter) => Card.findOne(filter);

export const updateCardbyFilter = (filter, data) =>
  Card.findOneAndUpdate(filter, data);

export const removeCard = (filter) => Card.findOneAndDelete(filter);

export const createCard = async (req) => {
  const card = await Card.create({ ...req.body, owner: req.user._id });
  const { columnId } = req.body;

  await Column.findOneAndUpdate(
    { _id: columnId },
    { $push: { cards: card._id } },
    { new: true }
  );
  return card
};

export const moveCard = async (req) => {
  const { destinationColumnId } = req.body;
  const { id: cardId } = req.params;
  const { _id: userId } = req.user;

  const card = await Card.findOne({ owner: userId, _id: cardId });
  if (!card) {
    throw new Error(`Card with id ${cardId} not found`);
  }

  const sourceColumn = await Column.findOneAndUpdate(
    { _id: card.columnId },
    { $pull: { cards: card._id } }, 
    { new: true }
  ).populate("cards");

  card.columnId = destinationColumnId;
  await card.save();

  const destinationColumn = await Column.findOneAndUpdate(
    { _id: destinationColumnId },
    { $push: { cards: card._id } }, 
    { new: true }
  ).populate("cards");


  

  return { sourceColumn, destinationColumn };
};

