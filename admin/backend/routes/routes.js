import express from "express";
import userRoutes from "./admin/userRoutes.js";
import homeRoutes from "./website/homepage/homeRoutes.js";
import aboutusRoutes from "./website/homepage/aboutusRoutes.js";
import trainingPlacementRoutes from "./website/train_place/placementRoutes.js";
import compActivityRoutes from "./website/homepage/compActivityRoutes.js";
// import deptHomeRoutes from "./website/homepage/deptHomeRoutes.js";
import academicRoutes from "./website/academics/academics.js";
import humanRRoutes from "./website/humanRRoutes.js";
import profileRoutes from "./website/profileRoutes.js";
import facultyRoutes from "./website/department/facultyRoutes.js";
import infrastructureRoutes from "./website/department/infrastructureRoutes.js";
import departmentRoutes from "./website/department/departmentRoutes.js";
import roleRoutes from "./admin/roleRoutes.js";
import studentcornerRoutes from "./website/studentcorner/studentcornerRoutes.js";
const router = express.Router();

router.use("/api", userRoutes);
router.use("/api/home", homeRoutes);
// router.use("/api/department", deptHomeRoutes);
router.use("/api/department", compActivityRoutes);
router.use("/api/training-placement", trainingPlacementRoutes);
router.use("/api/aboutus", aboutusRoutes);
router.use("/api/academic", academicRoutes);
router.use("/api/humanResource", humanRRoutes);
router.use("/api/profile", profileRoutes);
router.use("/api/faculty", facultyRoutes);
router.use("/api/infrastructure", infrastructureRoutes);
router.use("/api/dept", departmentRoutes);
router.use("/api/roles", roleRoutes);
router.use("/api/students-corner", studentcornerRoutes);

// router.use("/api/announcements", announcementRoutes);

export default router;
