import express from "express";
import ctrl from "../../controllers/imagesControllers.js";


const router = express.Router();

router.get("/desctop", ctrl.getDesctopImages);
router.get("/tablet", ctrl.getDesctopImages);
router.get("/mobile", ctrl.getDesctopImages);
router.get("/desctopx2", ctrl.getDesctopImages);
router.get("/tabletx2", ctrl.getDesctopImages);
router.get("/mobilex2", ctrl.getDesctopImages);


export default router;


