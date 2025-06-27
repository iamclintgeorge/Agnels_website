import express from "express";
import {
  electricalHomeTextController,
  electricalHomeTextUpdateController,
} from "../../../controllers/website/electricalController.js";

const router = express.Router();

router.get("/home", electricalHomeTextController);
router.put("/home/:id", electricalHomeTextUpdateController);

export default router; 