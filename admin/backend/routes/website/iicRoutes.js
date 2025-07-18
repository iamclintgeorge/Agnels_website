import express from "express";
import {
  saveIICTextController,
  getIICTextController,
  uploadIICPDFController,
  getIICPDFsController,
  upload,
  updateIICTextController,
} from "../../controllers/website/iicController.js";

const router = express.Router();

router.get("/text", getIICTextController);
router.put("/text/:id", updateIICTextController);  // Update IIC Text
router.post("/pdf", upload.single("file"), uploadIICPDFController);
router.get("/pdf", getIICPDFsController);

export default router;
