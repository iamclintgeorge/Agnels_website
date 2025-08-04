import express from "express";
import { authMiddleware, checkRole } from "../../middlewares/authMiddleware.js";
import {
  // getActivities,
  // getStats,
  // getActivityById,
  // getMyActivities,
  // getResourceActivities,
  // getFilterOptions,
  // exportActivities,
  getAllLogs,
} from "../../controllers/admin/activityLogsController.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Get all Logs
router.get("/", getAllLogs);

// // Get current user's activities (available to all authenticated users)
// router.get("/my-activities", getMyActivities);

// // Get activity statistics (superAdmin and principal only)
// router.get("/stats", checkRole(["superAdmin", "principal"]), getStats);

// // Get filter options for dropdowns (superAdmin and principal only)
// router.get(
//   "/filter-options",
//   checkRole(["superAdmin", "principal"]),
//   getFilterOptions
// );

// // Export activity logs to CSV (superAdmin and principal only)
// router.get("/export", checkRole(["superAdmin", "principal"]), exportActivities);

// // Get activities for a specific resource (department HODs can see their department's activities)
// router.get(
//   "/resource/:resource",
//   (req, res, next) => {
//     const userRole = req.user.role;
//     const resource = req.params.resource;

//     // SuperAdmin and principal can access all resources
//     if (["superAdmin", "principal"].includes(userRole)) {
//       return next();
//     }

//     // Department HODs can only access their department's resources
//     const departmentPermissions = {
//       compHod: ["hod_desk", "department", "computer"],
//       mechHod: ["hod_desk", "department", "mechanical"],
//       electricalHod: ["hod_desk", "department", "electrical"],
//       extcHod: ["hod_desk", "department", "extc"],
//       cseHod: ["hod_desk", "department", "cse"],
//       bshHod: ["hod_desk", "department", "bsh"],
//     };

//     if (
//       departmentPermissions[userRole] &&
//       departmentPermissions[userRole].includes(resource)
//     ) {
//       return next();
//     }

//     return res
//       .status(403)
//       .json({ error: "Access forbidden for this resource" });
//   },
//   getResourceActivities
// );

// // Get all activities with filtering (superAdmin and principal only)
// router.get("/", checkRole(["superAdmin", "principal"]), getActivities);

// // Get specific activity by ID (superAdmin and principal only)
// router.get("/:id", checkRole(["superAdmin", "principal"]), getActivityById);

export default router;
