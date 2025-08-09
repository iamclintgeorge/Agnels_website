import express from "express";
import {
  admissionsGetSectionController,
  admissionsUpsertSectionController,
  admissionsGetAllSectionsController,
} from "../../controllers/website/admissionsContentController.js";
import { authMiddleware, checkPermission } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Public read
router.get("/sections/:sectionKey", admissionsGetSectionController);
router.get("/sections", admissionsGetAllSectionsController);

// Admin write
router.put(
  "/sections/:sectionKey",
  authMiddleware,
  checkPermission("admission"),
  admissionsUpsertSectionController
);

export default router;

