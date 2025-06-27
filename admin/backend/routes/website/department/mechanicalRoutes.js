import express from "express";
import {
  mechanicalHomeTextController,
  mechanicalHomeTextUpdateController,
} from "../../../controllers/website/mechanicalController.js";

const router = express.Router();

router.get("/home", mechanicalHomeTextController);
router.put("/home/:id", mechanicalHomeTextUpdateController);

export default router; 