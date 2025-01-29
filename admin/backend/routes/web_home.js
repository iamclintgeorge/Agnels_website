import express from "express";

const router = express.Router();

router.post("/web_home_carousel", carouselController);

export default router;
