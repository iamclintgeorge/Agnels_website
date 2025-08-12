import express from "express";

import {
  getAllPdfs,
  uploadPdf,
  deletePdf,
  // updatePdf,
  uploadMiddleware,
} from "../../controllers/website/staticPdfController.js";

const router = express.Router();

router.get("/", getAllPdfs);

// POST Upload a new PDF
router.post("/create/", uploadMiddleware, uploadPdf);

// // DELETE - Delete a specific PDF
router.delete("/:id", deletePdf);

// // PUT /api/department/:department/:section/:id - Update a specific PDF
// router.put("/:department/:section/:id", updatePdf);

export default router;
