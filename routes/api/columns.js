import express from "express";
import columnsCtrl from "../../controllers/columnControllers/index.js";
import {
  isValidId,
  autenticate,
  validateBody,
} from "../../middlewares/index.js";
import {
  createColumnSchema,
  updateColumnSchema,
} from "../../schemas/columnSchemas.js";

const columnsRouter = express.Router();

columnsRouter.use(autenticate);


columnsRouter.get("/:boardId", columnsCtrl.getColumns);

columnsRouter.post(
   "/post",
  validateBody(createColumnSchema),
  columnsCtrl.addColumn
);

columnsRouter.patch(
  "/changeIndex/:id",
  isValidId,
  validateBody(updateColumnSchema),
  columnsCtrl.changeColumnIndexController
);

columnsRouter.patch(
  "/patch/:id",
  isValidId,
  validateBody(updateColumnSchema),
  columnsCtrl.updateColumn
);

columnsRouter.delete(
   "/delete/:id",
  isValidId,
  columnsCtrl.deleteColumn
);



export default columnsRouter;
