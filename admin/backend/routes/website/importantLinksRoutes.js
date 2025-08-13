import express from "express";
import {
  importantLinksGetController,
  importantLinkGetByIdController,
  importantLinkCreateController,
  importantLinkUpdateController,
  importantLinkDeleteController,
} from "../../controllers/website/importantLinksController.js";
import { authMiddleware, checkPermission } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// GET /api/important-links
router.get("/", importantLinksGetController);

// Admin CRUD (protected)
router.post(
  "/",
  authMiddleware,
  checkPermission("downloads"),
  importantLinkCreateController
);

router.get(
  "/:id",
  authMiddleware,
  checkPermission("downloads"),
  importantLinkGetByIdController
);

router.put(
  "/:id",
  authMiddleware,
  checkPermission("downloads"),
  importantLinkUpdateController
);

router.delete(
  "/:id",
  authMiddleware,
  checkPermission("downloads"),
  importantLinkDeleteController
);

export default router;

