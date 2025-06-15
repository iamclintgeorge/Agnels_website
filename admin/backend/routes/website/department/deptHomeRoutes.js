import express from "express";
import {
  deptHomeTextController,
  deptHomeTextUpdateController,
} from "../../../controllers/website/deptHomeController.js";

const router = express.Router();

router.get("/home", deptHomeTextController);
router.put("/home/:id", deptHomeTextUpdateController);

export default router;
