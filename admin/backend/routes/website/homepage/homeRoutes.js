import express from "express";
import { carouselController } from "../../../controllers/website/homeController.js";
import multer from "multer";
const upload = multer();

const router = express.Router();

router.post("/carousel", upload.array("images", 5), carouselController);
// router.post("/introduction", carouselController);
// router.post("/announcements", carouselController);

export default router;
