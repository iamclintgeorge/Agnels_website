import express from 'express';
import {
  getHodText,
  createHodTextEntry,
  updateHodText,
  deleteHodText,
  getAllHodTextEntries
} from '../../controllers/website/hodDeskController.js';

const router = express.Router();

// Get all HOD text entries (admin only)
router.get('/all', getAllHodTextEntries);

// Get HOD text for specific department
router.get('/:department', getHodText);

// Create HOD text for specific department
router.post('/:department', createHodTextEntry);

// Update HOD text for specific department
router.put('/:department/:id', updateHodText);

// Delete HOD text by ID
router.delete('/:department/:id', deleteHodText);

export default router; 