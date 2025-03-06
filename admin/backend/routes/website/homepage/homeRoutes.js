import express from "express";
import { carouselController } from "../../../controllers/website/homeController.js";
import multer from "multer";
const upload = multer();

const router = express.Router();

router.post("/carousel", upload.single("image"), carouselController);
// router.post("/introduction", carouselController);
// router.post("/announcements", carouselController);

export default router;
