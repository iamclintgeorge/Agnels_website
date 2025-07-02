import express from "express";
import {
  signupController,
  loginController,
  logoutController,
} from "../../controllers/admin/userController.js";
import { updateRolePermissions } from "../../controllers/admin/rolePermissionController.js";
import {
  authMiddleware,
  checkAuth,
  checkRole,
  checkPermission,
} from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/signout", logoutController);
router.get("/check-auth", authMiddleware, checkAuth);

// Role permission management
router.put(
  "/roles",
  authMiddleware,
  checkPermission("manage_users"),
  updateRolePermissions
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
