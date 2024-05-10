import ctrlWrapper from "../../helpers/ctrlWrapper.js";
import { getCards } from "./getCards.js";
import { addCard } from "./addCard.js";
import { deleteCard } from "./deleteCard.js";
import { updateCard } from "./updateCard.js";
import { moveCardController } from "./moveCard.js";

export default {
  getCards: ctrlWrapper(getCards),
  addCard: ctrlWrapper(addCard),
  deleteCard: ctrlWrapper(deleteCard),
  updateCard: ctrlWrapper(updateCard),
    moveCardController: ctrlWrapper(moveCardController),
};

