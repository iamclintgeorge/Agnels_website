import express from "express";
import {
  bshHomeTextController,
  bshHomeTextUpdateController,
} from "../../../controllers/website/bshController.js";

const router = express.Router();

router.get("/home", bshHomeTextController);
router.put("/home/:id", bshHomeTextUpdateController);

export default router; 