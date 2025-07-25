import express from "express";
import {
  computerHomeTextController,
  computerHomeTextUpdateController,
} from "../../../controllers/website/computerController.js";

const router = express.Router();

router.get("/:id", computerHomeTextController);
router.put("/:departmentId/:id", computerHomeTextUpdateController);

export default router;
