import express from "express";
import {
  getProfileController,
  updateProfileController,
  addOnlineProfileController,
  addSpecializationController,
  addSubjectController,
  addPaperController,
  addResearchController,
  deleteOnlineProfileController,
  deleteSpecializationController,
  deleteSubjectController,
  deletePaperController,
  deleteResearchController,
} from "../../controllers/website/profileController.js";
import multer from "multer";
import path from "path";

// Configure multer for image and PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and PDF files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

const router = express.Router();

router.get("/:id", getProfileController);
router.put(
  "/:id",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "bioData", maxCount: 1 },
    { name: "publications", maxCount: 1 },
  ]),
  updateProfileController
);
router.post("/:id/online-profile", addOnlineProfileController);
router.post("/:id/specialization", addSpecializationController);
router.post("/:id/subject", addSubjectController);
router.post("/:id/paper", addPaperController);
router.post("/:id/research", addResearchController);
router.delete("/:id/online-profile/:profileId", deleteOnlineProfileController);
router.delete("/:id/specialization/:specId", deleteSpecializationController);
router.delete("/:id/subject/:subjectId", deleteSubjectController);
router.delete("/:id/paper/:paperId", deletePaperController);
router.delete("/:id/research/:researchId", deleteResearchController);

export default router;
