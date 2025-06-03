import express from "express";
import userRoutes from "./admin/userRoutes.js";
import homeRoutes from "./website/homepage/homeRoutes.js";
import aboutusRoutes from "./website/homepage/aboutusRoutes.js";
import trainingPlacementRoutes from "./website/train_place/placementRoutes.js";
import compActivityRoutes from "./website/homepage/compActivityRoutes.js";
import academicRoutes from "./website/academics/academics.js";
const router = express.Router();

router.use("/api", userRoutes);
router.use("/api/home", homeRoutes);
router.use("/api/department", compActivityRoutes);
router.use("/api/training-placement", trainingPlacementRoutes);
router.use("/api/aboutus", aboutusRoutes);
router.use("/api/academic", academicRoutes);
// router.use("/api/announcements", announcementRoutes);

export default router;
