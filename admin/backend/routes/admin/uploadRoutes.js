import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { checkRole, authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage for different upload types
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Get upload path from form data or use default
    const uploadPath = req.body.uploadPath || 'uploads/general';
    
    // Create full path (relative to server root)
    const fullPath = path.join(__dirname, '../../../public', uploadPath);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
    
    cb(null, path.join('public', uploadPath));
  },
  filename: function (req, file, cb) {
    // Create unique filename with timestamp and original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Filter for allowed file types
const fileFilter = (req, file, cb) => {
  // Define allowed file types
  const allowedDocTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain'
  ];
  
  const allowedImageTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/svg+xml'
  ];
  
  // Check if this is an image or document upload based on route
  const isImageUpload = req.path.includes('/image');
  const allowedTypes = isImageUpload ? allowedImageTypes : allowedDocTypes;
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`), false);
  }
};

// Configure multer upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Document upload route
router.post('/document', authMiddleware, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    
    // Generate file URL
    const fileUrl = `/${req.file.path.replace(/\\/g, '/').replace('public/', '')}`;
    
    res.json({
      success: true,
      fileUrl: fileUrl,
      fileName: req.file.originalname
    });
  } catch (error) {
    console.error('Document upload error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Image upload route
router.post('/image', authMiddleware, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image uploaded' });
    }
    
    // Generate image URL
    const imageUrl = `/${req.file.path.replace(/\\/g, '/').replace('public/', '')}`;
    
    res.json({
      success: true,
      imageUrl: imageUrl,
      fileName: req.file.originalname
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router; 