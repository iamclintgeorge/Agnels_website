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
import studentcornerRoutes from "./website/studentcorner/studentcornerRoutes.js";
import admissionRoutes from "./website/admissionRoutes.js";
import roleHierarchyRoutes from "./admin/roleHierarchyRoutes.js";
import {
  authMiddleware,
  checkPermission,
} from "../middlewares/authMiddleware.js";
const router = express.Router();

router.use("/api", userRoutes);
router.use("/api", roleHierarchyRoutes);
router.use("/api/home", homeRoutes);
// router.use("/api/department", deptHomeRoutes);
router.use("/api/department", departmentRoutes);
// router.use("/api/department", compActivityRoutes);
router.use("/api/training-placement", trainingPlacementRoutes);
router.use(
  "/api/aboutus",
  authMiddleware,
  checkPermission("about_us"),
  aboutusRoutes
);
router.use("/api/academic", academicRoutes);
router.use("/api/humanResource", humanRRoutes);
router.use("/api/profile", profileRoutes);
router.use("/api/faculty", facultyRoutes);
router.use("/api/infrastructure", infrastructureRoutes);
router.use("/api/students-corner", studentcornerRoutes);
router.use("/api/admission", admissionRoutes);

// router.use("/api/announcements", announcementRoutes);

export default router;
