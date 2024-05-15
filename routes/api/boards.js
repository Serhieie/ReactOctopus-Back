import express from "express";
import boardsCtrl from "../../controllers/boardControllers/index.js";
import {
  isValidId,
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
boardsRouter.get("/:id", boardsCtrl.getBoardById);


boardsRouter.post("/post", validateBody(createBoardSchema), boardsCtrl.addBoard);

boardsRouter.patch(
  "/patch/:id",
  isValidId,
  validateBody(updateBoardSchema),
  boardsCtrl.updateBoard
);

boardsRouter.delete("/delete/:id", isValidId, boardsCtrl.deleteBoard);


export default boardsRouter;
