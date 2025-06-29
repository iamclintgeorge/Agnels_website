import express from "express";
import {
  computerHomeTextController,
  computerHomeTextUpdateController,
} from "../../../controllers/website/computerController.js";

const router = express.Router();

router.get("/home", computerHomeTextController);
router.put("/home/:id", computerHomeTextUpdateController);

export default router; 