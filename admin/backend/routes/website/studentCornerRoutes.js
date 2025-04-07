import express from "express";
import { getAllSections, getSectionContent, updateSectionContent } from "../../controllers/website/studentCornerController.js";
import { authMiddleware, checkRole } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes - require authentication
router.use(authMiddleware);

// GET all sections
router.get("/", getAllSections);

// GET specific section
router.get("/:sectionKey", getSectionContent);

// UPDATE section content - admin and teaching staff only
router.put("/:sectionKey", checkRole(["superAdmin", "teach_staff"]), updateSectionContent);

export default router; 