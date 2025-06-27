import express from 'express';
import DeptPdfController from '../../controllers/website/deptPdfController.js';

const router = express.Router();

// Department PDF routes
// :department - department name (e.g., 'computer-engineering', 'mechanical-engineering', etc.)
// :section - section name (e.g., 'activities', 'publications', etc.)

// GET /api/department/:department/:section - Get all PDFs for a department section
router.get('/:department/:section', DeptPdfController.getAllPdfs);

// POST /api/department/:department/:section - Upload a new PDF
router.post('/:department/:section', DeptPdfController.uploadMiddleware, DeptPdfController.uploadPdf);

// DELETE /api/department/:department/:section/:id - Delete a specific PDF
router.delete('/:department/:section/:id', DeptPdfController.deletePdf);

// PUT /api/department/:department/:section/:id - Update a specific PDF
router.put('/:department/:section/:id', DeptPdfController.updatePdf);

export default router; 