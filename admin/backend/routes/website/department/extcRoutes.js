import express from "express";
import {
  extcHomeTextController,
  extcHomeTextUpdateController,
} from "../../../controllers/website/extcController.js";

const router = express.Router();

router.get("/home", extcHomeTextController);
router.put("/home/:id", extcHomeTextUpdateController);

export default router; 