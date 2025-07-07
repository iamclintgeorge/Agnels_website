import express from "express";
import {
  getAllRolesController,
  getRoleByIdController,
  createRoleController,
  updateRoleController,
  deleteRoleController,
  getAllPermissionsController,
  createPermissionController,
  updateUserRoleController,
  getUsersByRoleController,
  bulkUpdateRolesController,
} from "../../controllers/admin/roleController.js";
import {
  authMiddleware,
  checkPermission,
} from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Role management routes
// Get all roles
router.get(
  "/",
  authMiddleware,
  checkPermission("role_management"),
  getAllRolesController
);

// Get role by ID
router.get(
  "/:roleId",
  authMiddleware,
  checkPermission("role_management"),
  getRoleByIdController
);

// Create new role
router.post(
  "/",
  authMiddleware,
  checkPermission("role_management"),
  createRoleController
);

// Update role
router.put(
  "/:roleId",
  authMiddleware,
  checkPermission("role_management"),
  updateRoleController
);

// Delete role
router.delete(
  "/:roleId",
  authMiddleware,
  checkPermission("role_management"),
  deleteRoleController
);

// Bulk update roles (for backward compatibility)
router.put(
  "/",
  authMiddleware,
  checkPermission("role_management"),
  bulkUpdateRolesController
);

// Permission management routes
// Get all permissions
router.get(
  "/permissions/all",
  authMiddleware,
  checkPermission("role_management"),
  getAllPermissionsController
);

// Create new permission
router.post(
  "/permissions",
  authMiddleware,
  checkPermission("role_management"),
  createPermissionController
);

// User role management routes
// Update user role
router.put(
  "/users/:userId/role",
  authMiddleware,
  checkPermission("manage_users"),
  updateUserRoleController
);

// Get users by role
router.get(
  "/users/role/:roleName",
  authMiddleware,
  checkPermission("manage_users"),
  getUsersByRoleController
);

export default router; 