import express from "express";
import userRoutes from "./admin/userRoutes.js";
import homeRoutes from "./website/homepage/homeRoutes.js";
import aboutusRoutes from "./website/homepage/aboutusRoutes.js";
import trainingPlacementRoutes from "./trainingPlacement.js";
import studentCornerRoutes from "./website/studentCornerRoutes.js";
import uploadRoutes from "./admin/uploadRoutes.js";
import academicsRoutes from "./website/academicsRoutes.js";

const router = express.Router();

router.use("/api", userRoutes);
router.use("/api/home", homeRoutes);
router.use("/api/training-placement", trainingPlacementRoutes);
router.use("/api/aboutus", aboutusRoutes);
router.use("/api/studentcorner", studentCornerRoutes);
router.use("/api/upload", uploadRoutes);
router.use("/api/academics", academicsRoutes);
// router.use("/api/announcements", announcementRoutes);

export default router;
