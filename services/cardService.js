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

export const moveCard = async (req) => {
  const { destinationColumnId } = req.body;
  const { id } = req.params;
  const { _id } = req.user;

  const card = await Card.findOne({ owner: _id, _id: id });
  if (!card) {
    throw new Error(`Card with id ${id} not found`);
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

