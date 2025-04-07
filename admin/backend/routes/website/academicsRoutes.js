import express from "express";
import { getAllSections, getSectionContent, updateSectionContent } from "../../controllers/website/academicsController.js";
import { authMiddleware, checkRole } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes - require authentication
router.use(authMiddleware);

// Add checkRole middleware if needed for specific protection levels
// e.g., router.use(checkRole(['superAdmin', 'teach_staff']));

// Get all sections
router.get('/sections', getAllSections);

// Get specific section content
router.get('/:sectionKey', getSectionContent);

// Update section content
router.post('/:sectionKey', updateSectionContent);

export default router; 