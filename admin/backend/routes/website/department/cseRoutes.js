import express from "express";
import {
  cseHomeTextController,
  cseHomeTextUpdateController,
} from "../../../controllers/website/cseController.js";

const router = express.Router();

router.get("/home", cseHomeTextController);
router.put("/home/:id", cseHomeTextUpdateController);

export default router; 