import express from "express";
import {
  iqacGetSectionController,
  iqacUpsertSectionController,
  iqacGetAllSectionsController,
  iqacDeleteSectionController,
} from "../../controllers/website/iqacController.js";
import { authMiddleware, checkPermission } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Public read
router.get("/sections/:sectionKey", iqacGetSectionController);
router.get("/sections", iqacGetAllSectionsController);

// Admin write
router.put(
  "/sections/:sectionKey",
  authMiddleware,
  checkPermission("iqac"),
  iqacUpsertSectionController
);

router.delete(
  "/sections/:sectionKey",
  authMiddleware,
  checkPermission("iqac"),
  iqacDeleteSectionController
);

export default router;


