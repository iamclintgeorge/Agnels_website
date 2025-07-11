import express from "express";
import {
  signupController,
  loginController,
  logoutController,
  fetchrolesController,
  fetchpermissionsController,
} from "../../controllers/admin/userController.js";
import {
  authMiddleware,
  checkAuth,
  checkRole,
  checkPermission,
} from "../../middlewares/authMiddleware.js";
import {
  createRoleController,
  updateRoleController,
  deleteRoleController,
  createPermissionController,
  updatePermissionController,
  deletePermissionController,
} from "../../controllers/admin/permissionController.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/signout", logoutController);
router.get("/check-auth", authMiddleware, checkAuth);
router.get("/fetchroles", fetchrolesController);
router.get("/fetchpermissions", fetchpermissionsController);

// Role CRUD
router.post(
  "/role",
  authMiddleware,
  checkPermission("manage_users"),
  createRoleController
);
router.put(
  "/role",
  authMiddleware,
  checkPermission("manage_users"),
  updateRoleController
);
router.delete(
  "/role/:id",
  authMiddleware,
  checkPermission("manage_users"),
  deleteRoleController
);

// Permission CRUD
router.post(
  "/permission",
  authMiddleware,
  checkPermission("manage_users"),
  createPermissionController
);
router.put(
  "/permission",
  authMiddleware,
  checkPermission("manage_users"),
  updatePermissionController
);
router.delete(
  "/permission/:id",
  authMiddleware,
  checkPermission("manage_users"),
  deletePermissionController
);

//Sample test route
router.get(
  "/student",
  authMiddleware,
  checkRole(["superAdmin", "teach_staff"]),
  (req, res) => {
    res.status(200).json({ content: "Welcome, Teacher!" });
    console.log("/student router");
  }
);

export default router;
