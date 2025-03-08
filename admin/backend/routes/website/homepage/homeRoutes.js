import express from "express";
import {
  carouselUploadController,
  carouselDisplayController,
  carouselDeleteController,
} from "../../../controllers/website/homeController.js";
import multer from "multer";
import path from "path";

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Folder to save images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const router = express.Router();

router.post("/carousel", upload.single("image"), carouselUploadController);
router.get("/carousel", carouselDisplayController);
router.delete("/carousel/:id", carouselDeleteController);

export default router;
