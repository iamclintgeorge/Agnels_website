import express from "express";
import {
  carouselUploadController,
  carouselDisplayController,
  carouselDeleteController,
  introTextController,
  introTextUpdateController,
  announcementsCreateController,
  announcementsFetchController,
  announcementsEditController,
  announcementsDeleteController,
  achievementsCreateController,
  achievementsFetchController,
  achievementsEditController,
  achievementsDeleteController,
  admissionsCreateController,
  admissionsFetchController,
  admissionsEditController,
  admissionsDeleteController,
  circularsCreateController,
  circularsFetchController,
  circularsEditController,
  circularsDeleteController
} from "../../../controllers/website/homeController.js";

import multer from "multer";
import path from "path";

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/cdn"); // Folder to save images
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

//Carousel and Home_Modal
router.post(
  "/carousel/:section",
  upload.single("image"),
  carouselUploadController
);
router.get("/carousel/:section", carouselDisplayController);
router.delete("/carousel/:id", carouselDeleteController);

//IntroText
router.get("/introtext", introTextController);
router.put("/introtext/:id", introTextUpdateController);
router.post("/announcements", announcementsCreateController);
router.get("/announcements", announcementsFetchController);
router.put("/announcements/:id", announcementsEditController);
router.put("/delete-announcements/:id", announcementsDeleteController);
router.post("/achievements", achievementsCreateController);
router.get("/achievements", achievementsFetchController);
router.put("/achievements/:id", achievementsEditController);
router.put("/delete-achievements/:id", achievementsDeleteController);
router.post ("/admissions",       admissionsCreateController);
router.get  ("/admissions",       admissionsFetchController);
router.put  ("/admissions/:id",   admissionsEditController);
router.put("/delete-admissions/:id",  admissionsDeleteController);
router.post ("/circulars",       circularsCreateController);
router.get  ("/circulars",       circularsFetchController);
router.put  ("/circulars/:id",   circularsEditController);
router.put("/delete-circulars/:id",  circularsDeleteController);

export default router;
