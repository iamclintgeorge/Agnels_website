import express from "express";
import { carouselController } from "../../../controllers/website/homeController.js";

const router = express.Router();

router.get("/images", carouselController);
// router.post("/introduction", carouselController);
// router.post("/announcements", carouselController);

export default router;
