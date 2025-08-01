import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath to handle __dirname in ES Modules
import * as PlacementController from "../../../controllers/website/placementController.js";

// Manually set __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Use __dirname to construct the correct path for file uploads
    cb(null, path.join(__dirname, "../../../public/cdn/recruiters/"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // File naming strategy
  },
});

const upload = multer({ storage: storage });

// Overview Routes
router.get("/overview", PlacementController.getOverview);
router.put("/overview", PlacementController.updateOverview);

// Statistics Routes
router.get("/statistics", PlacementController.getStatistics);
router.post("/statistics", PlacementController.addStatistics);
router.delete("/statistics/:id", PlacementController.deleteStatistics);
router.put("/statistics/:id", PlacementController.updateStatistics);

// Recruiters Routes
router.get("/recruiters", PlacementController.getRecruiters);
router.post(
  "/recruiters",
  upload.single("logo"),
  PlacementController.addRecruiter
);
router.delete("/recruiters/:id", PlacementController.deleteRecruiter);
router.put(
  "/recruiters/:id",
  upload.single("logo"),
  PlacementController.updateRecruiter
);

export default router;
