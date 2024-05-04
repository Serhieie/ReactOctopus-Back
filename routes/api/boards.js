import express from "express";
import boardsCtrl from "../../controllers/boardControllers/index.js";
import columnsCtrl from "../../controllers/columnControllers/index.js";
import cardsCtrl from "../../controllers/cardControllers/index.js";
import {
  isValidId,
  isValidId2,
  isValidId3,
  autenticate,
  validateBody,
} from "../../middlewares/index.js";
import {
  createBoardSchema,
  updateBoardSchema,
} from "../../schemas/boardsSchemas.js";
import {
  createColumnSchema,
  updateColumnSchema,
} from "../../schemas/columnSchemas.js";
import {
  createCardSchema,
  updateCardSchema,
} from "../../schemas/cardsSchemas.js";

const boardsRouter = express.Router();

boardsRouter.use(autenticate);

boardsRouter.get("/", boardsCtrl.getBoards);

boardsRouter.post("/", validateBody(createBoardSchema), boardsCtrl.addBoard);

boardsRouter.patch(
  "/:id",
  isValidId,
  validateBody(updateBoardSchema),
  boardsCtrl.updateBoard
);

boardsRouter.delete("/:id", isValidId, boardsCtrl.deleteBoard);

boardsRouter.get("/:id/columns", isValidId, columnsCtrl.getColumns);

boardsRouter.post(
  "/:id/columns",
  isValidId,
  validateBody(createColumnSchema),
  columnsCtrl.addColumn
);

boardsRouter.patch(
  "/:boardid/columns/:columnid",
  isValidId2,
  validateBody(updateColumnSchema),
  columnsCtrl.updateColumn
);

boardsRouter.delete(
  "/:boardid/columns/:columnid",
  isValidId2,
  columnsCtrl.deleteColumn
);

boardsRouter.get(
  "/:boardid/columns/:columnid/cards",
  isValidId2,
  cardsCtrl.getCards
);

boardsRouter.post(
  "/:boardid/columns/:columnid/cards",
  isValidId2,
  validateBody(createCardSchema),
  cardsCtrl.addCard
);

boardsRouter.patch(
  "/:boardid/columns/:columnid/cards/:cardid",
  isValidId3,
  validateBody(updateCardSchema),
  cardsCtrl.updateCard
);

boardsRouter.delete(
  "/:boardid/columns/:columnid/cards/:cardid",
  isValidId3,
  cardsCtrl.deleteCard
);

export default boardsRouter;
