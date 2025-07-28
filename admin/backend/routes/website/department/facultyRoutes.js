import express from "express";
import {
  getFacultiesByDepartmentController,
  getFacultyByIdController,
  getAllFacultiesController,
  createFacultyController,
  updateFacultyController,
  deleteFacultyController,
  addFacultyResumeController,
  addFacultyPublicationController,
  addFacultyOnlineProfileController,
  addFacultySpecializationController,
  addFacultySubjectController,
  addFacultyPaperController,
  addFacultyResearchController,
} from "../../../controllers/website/facultyController.js";
import {
  authMiddleware,
  checkPermission,
} from "../../../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes (no auth required)
// Get faculties by department (for public website)
router.get("/department/:department", getFacultiesByDepartmentController);

// Get faculty details by ID (for public website)
router.get("/profile/:facultyId", getFacultyByIdController);

// Admin routes (auth required)
// Get all faculties (admin only)
router.get(
  "/admin/all",
  authMiddleware,
  checkPermission("faculty_management"),
  getAllFacultiesController
);

// Create new faculty (admin only)
router.post(
  "/admin/create",
  authMiddleware,
  checkPermission("faculty_management"),
  createFacultyController
);

// Update faculty (admin only)
router.put(
  "/admin/update/:facultyId",
  authMiddleware,
  checkPermission("faculty_management"),
  updateFacultyController
);

// Delete faculty (admin only)
router.delete(
  "/admin/delete/:facultyId",
  authMiddleware,
  checkPermission("faculty_management"),
  deleteFacultyController
);

// Add faculty resume (admin only)
router.post(
  "/admin/:facultyId/resume",
  authMiddleware,
  checkPermission("faculty_management"),
  addFacultyResumeController
);

// Add faculty publication (admin only)
router.post(
  "/admin/:facultyId/publication",
  authMiddleware,
  checkPermission("faculty_management"),
  addFacultyPublicationController
);

// Add faculty online profile (admin only)
router.post(
  "/admin/:facultyId/online-profile",
  authMiddleware,
  checkPermission("faculty_management"),
  addFacultyOnlineProfileController
);

// Add faculty specialization (admin only)
router.post(
  "/admin/:facultyId/specialization",
  authMiddleware,
  checkPermission("faculty_management"),
  addFacultySpecializationController
);

// Add faculty subject (admin only)
router.post(
  "/admin/:facultyId/subject",
  authMiddleware,
  checkPermission("faculty_management"),
  addFacultySubjectController
);

// Add faculty paper (admin only)
router.post(
  "/admin/:facultyId/paper",
  authMiddleware,
  checkPermission("faculty_management"),
  addFacultyPaperController
);

// Add faculty research (admin only)
router.post(
  "/admin/:facultyId/research",
  authMiddleware,
  checkPermission("faculty_management"),
  addFacultyResearchController
);

export default router; 