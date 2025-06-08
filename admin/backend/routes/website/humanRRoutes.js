import express from "express";
import {
  uploadHRPDFController,
  getHRPDFsController,
  upload,
} from "../../controllers/website/humanRController.js";

const router = express.Router();

// Route to upload HR PDF (e.g., teachingstaff, nonteachingstaff)
router.post("/pdf", upload.single("file"), uploadHRPDFController);

// Route to get HR PDFs using query string (e.g., /pdf?category=teachingstaff)
router.get("/pdf", getHRPDFsController);

// Optional REST-style route (e.g., /pdf/teachingstaff)
router.get("/pdf/:category", getHRPDFsController);

export default router;
