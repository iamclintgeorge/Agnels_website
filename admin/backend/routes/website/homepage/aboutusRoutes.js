import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { 
  principalDisplayController,
  getSectionContent,
  updateSectionContent,
  getAllSections
} from "../../../controllers/website/aboutusController.js";

const router = express.Router();

// Configure multer for file uploads
const uploadsDir = path.join(process.cwd(), 'uploads', 'documents');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename with section prefix
    const section = req.body.section ? req.body.section.replace(/\s+/g, '_').toLowerCase() : '';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${section}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Accept only PDF files
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

// Configure multer for image uploads
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads', 'images');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename with section prefix
    const section = req.body.section ? req.body.section.replace(/\s+/g, '_').toLowerCase() : '';
    const field = req.body.field ? req.body.field.replace(/\./g, '-').replace(/\[|\]/g, '-') : '';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${section}-${field ? field + '-' : ''}${uniqueSuffix}${ext}`);
  }
});

const imageUpload = multer({ 
  storage: imageStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Principal's desk route
router.get("/principaldesk", principalDisplayController);

// Get all sections
router.get("/", getAllSections);

// Get and update specific sections (excluding principaldesk)
router.get("/:sectionKey", getSectionContent);
router.put("/:sectionKey", updateSectionContent);

// Get specific section - handle special characters in section key properly
router.get("/section/:encodedSectionKey", (req, res) => {
  try {
    const { encodedSectionKey } = req.params;
    // Decode the section key from URL
    const sectionKey = decodeURIComponent(encodedSectionKey);
    
    console.log(`Fetching section with decoded key: ${sectionKey}`);
    
    // Set up params for existing controller
    req.params = { sectionKey };
    getSectionContent(req, res);
  } catch (error) {
    console.error("Error in section GET route:", error);
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
});

// New route for the admin panel
router.post("/update", (req, res) => {
  try {
    // Extract section and content from request body
    const { section, content } = req.body;
    
    console.log("Received update request for section:", section);
    console.log("Content:", JSON.stringify(content, null, 2));
    
    if (!section) {
      return res.status(400).json({ 
        success: false, 
        message: "Section name is required" 
      });
    }
    
    // Make sure content is an object
    if (!content || typeof content !== 'object') {
      return res.status(400).json({
        success: false,
        message: "Content must be a valid object"
      });
    }
    
    // Modify the response handler to ensure we get proper response format
    const customRes = {
      json: (data) => {
        // Ensure response has success flag
        if (!data.hasOwnProperty('success')) {
          data.success = true;
        }
        
        // Send the response
        console.log("Sending response:", data);
        res.json(data);
      },
      status: (code) => {
        res.status(code);
        return customRes;
      }
    };
    
    // Set up the request for the controller
    req.params = { sectionKey: section };
    req.body = content;
    
    // Call the controller with the custom response handler
    updateSectionContent(req, customRes);
  } catch (error) {
    console.error("Error in /update route:", error);
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
});

// Route for uploading PDF documents
router.post("/upload-document", upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    // Construct the file URL
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const relativePath = `/uploads/documents/${req.file.filename}`;
    const fileUrl = `${baseUrl}${relativePath}`;

    console.log(`File uploaded: ${req.file.originalname} -> ${fileUrl}`);

    res.json({
      success: true,
      message: "File uploaded successfully",
      fileUrl,
      fileName: req.file.originalname,
      section: req.body.section
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({
      success: false,
      message: `Error uploading file: ${error.message}`
    });
  }
});

// Route for uploading images
router.post("/upload-image", imageUpload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded"
      });
    }

    // Construct the file URL
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const relativePath = `/uploads/images/${req.file.filename}`;
    const imageUrl = `${baseUrl}${relativePath}`;

    console.log(`Image uploaded: ${req.file.originalname} -> ${imageUrl}`);

    res.json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl,
      fileName: req.file.originalname,
      section: req.body.section,
      field: req.body.field
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      success: false,
      message: `Error uploading image: ${error.message}`
    });
  }
});

// Get specific section via POST (avoids URL parameter encoding issues)
router.post("/get-section", (req, res) => {
  try {
    const { sectionKey } = req.body;
    
    if (!sectionKey) {
      return res.status(400).json({
        success: false,
        message: "Section key is required"
      });
    }
    
    console.log(`Fetching section via POST: ${sectionKey}`);
    
    // Reuse the existing controller logic
    req.params = { sectionKey };
    getSectionContent(req, res);
  } catch (error) {
    console.error("Error in get-section route:", error);
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
});

export default router;
