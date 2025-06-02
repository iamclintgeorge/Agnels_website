import express from "express";
import {
  compActivityUploadController,
  compActivityDisplayController,
  compActivityDeleteController,
} from "../../../controllers/website/compActivityController.js";
import multer from "multer";
import path from "path";

// Configure multer for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Folder to save PDFs
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDFs are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

const router = express.Router();

router.post(
  "/computer-engineering/activities",
  upload.single("pdf"),
  compActivityUploadController
);
router.get("/computer-engineering/activities", compActivityDisplayController);
router.delete(
  "/computer-engineering/activities/:id",
  compActivityDeleteController
);

export default router;
