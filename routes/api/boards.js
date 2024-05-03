import express from "express";
import boardsCtrl from "../../controllers/boardControllers/index.js";
import columnsCtrl from "../../controllers/columnControllers/index.js";
import {
  isValidId,
  isValidId2,
  autenticate,
  validateBody,
} from "../../middlewares/index.js";
import {
  createBoardSchema,
  updateBoardSchema,
} from "../../schemas/boardsSchemas.js";

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

boardsRouter.post("/:id/columns", isValidId, columnsCtrl.addColumn);

boardsRouter.get("/:id/columns", isValidId, columnsCtrl.getColumns);

boardsRouter.patch(
  "/:boardid/columns/:columnid",
  isValidId2,
  columnsCtrl.updateColumn
);

export default boardsRouter;
