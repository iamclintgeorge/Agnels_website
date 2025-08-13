import express from "express";
import {
  downloadCreateController,
  downloadFetchController,
  downloadFetchByCategoryController,
  downloadGetByIdController,
  downloadEditController,
  downloadDeleteController,
} from "../../controllers/website/downloadsController.js";

import multer from "multer";
import path from "path";

// Configure multer for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/cdn"); // Folder to save PDFs
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/jpg",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, JPG, and PNG files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for PDFs
});

// Middleware to handle optional file uploads
const optionalFileUpload = (req, res, next) => {
  // Check if request has file data
  const contentType = req.get("Content-Type");

  if (contentType && contentType.includes("multipart/form-data")) {
    // Handle file upload
    upload.single("pdf")(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }
      next();
    });
  } else {
    // No file upload, proceed normally
    next();
  }
};

const router = express.Router();

// ==================== DOWNLOAD ROUTES ====================
router.post("/downloads-create", optionalFileUpload, downloadCreateController);
router.get("/downloads", downloadFetchController);
router.get("/downloads/category/:category", downloadFetchByCategoryController);
router.get("/downloads/:id", downloadGetByIdController);
router.put("/downloads/:id", optionalFileUpload, downloadEditController);
router.put("/delete-downloads/:id", downloadDeleteController);

export default router;