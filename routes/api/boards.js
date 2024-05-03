import express from "express";
import boardsCtrl from "../../controllers/boardControllers/index.js";
import isValidId from "../../middlewares/isValidId.js";
import autenticate from "../../middlewares/autenticate.js";
import validateBody from "../../middlewares/validateBody.js";
import {
  createBoardSchema,
  updateBoardSchema,
} from "../../schemas/boardsSchemas.js";

const boardsRouter = express.Router();
// const { isValidId, autenticate, validateBody, upload } = require("../../middlewares");
// const { schemas } = require("../../models/board");

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

export default boardsRouter;
