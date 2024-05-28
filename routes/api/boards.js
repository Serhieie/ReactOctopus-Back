import express from "express";
import boardsCtrl from "../../controllers/boardControllers/index.js";
import { isValidId, validateBody } from "../../middlewares/index.js";
import {
  createBoardSchema,
  updateBoardSchema,
} from "../../schemas/boardsSchemas.js";
import { validateToken } from "../../middlewares/validateToken.js";

const boardsRouter = express.Router();

boardsRouter.use(validateToken);

boardsRouter.get("/", boardsCtrl.getBoards);
boardsRouter.patch("/:id", boardsCtrl.getBoardById);

boardsRouter.post(
  "/post",
  validateBody(createBoardSchema),
  boardsCtrl.addBoard
);

boardsRouter.patch(
  "/patch/:id",
  isValidId,
  validateBody(updateBoardSchema),
  boardsCtrl.updateBoard
);

boardsRouter.delete("/delete/:id", isValidId, boardsCtrl.deleteBoard);

export default boardsRouter;
