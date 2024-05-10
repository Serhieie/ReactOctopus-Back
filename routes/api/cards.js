import express from "express";
import cardsCtrl from "../../controllers/cardControllers/index.js";
import {
  isValidId,
  autenticate,
  validateBody,
} from "../../middlewares/index.js";
import {
  createCardSchema,
  updateCardSchema,
} from "../../schemas/cardsSchemas.js";

const cardsRouter = express.Router();

cardsRouter.use(autenticate);


cardsRouter.get(
    "/:columnId",
    autenticate,
  isValidId,
  cardsCtrl.getCards
);

cardsRouter.post(
  "/post",
  validateBody(createCardSchema),
  cardsCtrl.addCard
);

cardsRouter.patch(
  "/patch/:id",
  isValidId,
  validateBody(updateCardSchema),
  cardsCtrl.updateCard
);

cardsRouter.patch(
  "/move/:id",
  isValidId,
  validateBody(updateCardSchema),
  cardsCtrl.moveCardController
);

cardsRouter.delete(
  "/delete/:id",
  isValidId,
  cardsCtrl.deleteCard
);

export default cardsRouter;
