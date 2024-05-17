import httpError from "../helpers/httpError.js";
import Card from "../models/card.js";
import Column from "../models/column.js";
import { ObjectId } from 'mongoose';

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
  const { destinationColumnId, destinationIndex } = req.body;
  const { id: cardId } = req.params;
  const { _id: userId } = req.user;

    const card = await Card.findOne({ owner: userId, _id: cardId });
    if (!card) {
      throw new Error(`Card with id ${cardId} not found`);
    }

    const sourceColumn = await Column.findOneAndUpdate(
      { _id: card.columnId },
      { $pull: { cards: cardId } }, 
      { new: true }
    ).populate("cards");
  
  
    const destinationColumn = await Column.findById(destinationColumnId);
  if (!destinationColumn) {
      throw httpError(404,"Destination column not found")
    }
  
    card.columnId = destinationColumnId;
    await card.save();

    const updatedCards = [...destinationColumn.cards];
    updatedCards.splice(destinationIndex, 0, cardId);

    destinationColumn.cards = updatedCards;
  await destinationColumn.save();
   const updatedDestinationColumn = await Column.findById(destinationColumnId).populate("cards");
   

    return { sourceColumn, destinationColumn: updatedDestinationColumn };
};



export const changeIndex = async (req) => {
    const { destinationColumnId, destinationIndex } = req.body;
    const { id: cardId } = req.params;
    const sourceColumn = await Column.findOneAndUpdate(
      { _id: destinationColumnId },
      { $pull: { cards: cardId } },
      { new: true }
    )

    if (!sourceColumn) {
         throw httpError(404,"Column not found")
    }
    const updatedCards = [...sourceColumn.cards];
  updatedCards.splice(destinationIndex, 0, cardId);

    const updatedColumn = await Column.findOneAndUpdate(
      { _id: destinationColumnId },
      { cards: updatedCards },
      { new: true }
    ).populate("cards");

    return updatedColumn;
};
