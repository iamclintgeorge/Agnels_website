import express from "express";
import {
  InfrastructureController,
  upload,
} from "../../../controllers/website/infrastructureController.js";
import {
  authMiddleware,
  checkPermission,
} from "../../../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes (no authentication required)
router.get("/public/:departmentId", InfrastructureController.getById);

// Admin routes (authentication required)
router.get(
  "/admin/all",
  authMiddleware,
  checkPermission("infrastructure_management"),
  InfrastructureController.getAll
);
router.get(
  "/admin/latest",
  authMiddleware,
  checkPermission("infrastructure_management"),
  InfrastructureController.getLatest
);
router.get(
  "/admin/stats",
  authMiddleware,
  checkPermission("infrastructure_management"),
  InfrastructureController.getStats
);
router.get(
  "/admin/search",
  authMiddleware,
  checkPermission("infrastructure_management"),
  InfrastructureController.search
);
router.get(
  "/admin/count/:departmentId",
  authMiddleware,
  checkPermission("infrastructure_management"),
  InfrastructureController.getCountByDepartment
);
router.get(
  "/admin/:id",
  authMiddleware,
  checkPermission("infrastructure_management"),
  InfrastructureController.getById
);

// Admin CRUD routes (authentication and authorization required)
router.post(
  "/admin/create",
  authMiddleware,
  checkPermission("infrastructure_management"),
  upload.single("image"),
  InfrastructureController.create
);

router.put(
  "/admin/update/:id",
  authMiddleware,
  checkPermission("infrastructure_management"),
  InfrastructureController.update
);

router.delete(
  "/admin/delete/:id",
  authMiddleware,
  checkPermission("infrastructure_management"),
  InfrastructureController.delete
);

router.delete(
  "/admin/delete-by-department/:departmentId",
  authMiddleware,
  checkPermission("infrastructure_management"),
  InfrastructureController.deleteByDepartment
);

export default router;
