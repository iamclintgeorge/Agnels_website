import DeptPdfModel from "../../models/website/deptPdfModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { department, section } = req.params;
    const uploadPath = path.join(
      __dirname,
      "../../public/uploads/department",
      department,
      section
    );

    // Create directory if it doesn't exist
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Get all PDFs for a specific department and section
export const getAllPdfs = async (req, res) => {
  try {
    const { department, section } = req.params;
    const pdfs = await DeptPdfModel.getAllByDepartmentAndSection(
      department,
      section
    );
    res.json(pdfs);
  } catch (error) {
    console.error("Error fetching PDFs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Upload a new PDF
export const uploadPdf = async (req, res) => {
  try {
    const { department, section } = req.params;
    const { title } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const filename = req.file.filename;
    const newPdf = await DeptPdfModel.create(
      department,
      section,
      title,
      filename
    );

    res.status(201).json({
      message: "PDF uploaded successfully",
      pdf: {
        ...newPdf,
        pdfUrl: `/uploads/department/${department}/${section}/${filename}`,
      },
    });
  } catch (error) {
    console.error("Error uploading PDF:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a PDF
export const deletePdf = async (req, res) => {
  try {
    const { id } = req.params;

    // Get PDF details before deletion to remove file from filesystem
    const pdf = await DeptPdfModel.getById(id);
    if (!pdf) {
      return res.status(404).json({ error: "PDF not found" });
    }

    // Delete from database
    await DeptPdfModel.deleteById(id);

    // Delete file from filesystem
    const filePath = path.join(
      __dirname,
      "../../public/uploads/department",
      pdf.department,
      pdf.section,
      pdf.filename
    );
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ message: "PDF deleted successfully" });
  } catch (error) {
    console.error("Error deleting PDF:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update PDF title
export const updatePdf = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    await DeptPdfModel.updateById(id, title);
    res.json({ message: "PDF updated successfully" });
  } catch (error) {
    console.error("Error updating PDF:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Middleware for file upload
export const uploadMiddleware = upload.single("pdf");

// import DeptPdfModel from '../../models/website/deptPdfModel.js';
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const { department, section } = req.params;
//     const uploadPath = path.join(__dirname, '../../public/uploads/department', department, section);

//     // Create directory if it doesn't exist
//     fs.mkdirSync(uploadPath, { recursive: true });
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === 'application/pdf') {
//       cb(null, true);
//     } else {
//       cb(new Error('Only PDF files are allowed!'), false);
//     }
//   },
//   limits: {
//     fileSize: 10 * 1024 * 1024 // 10MB limit
//   }
// });

// const DeptPdfController = {
//   // Get all PDFs for a specific department and section
//   getAllPdfs: async (req, res) => {
//     try {
//       const { department, section } = req.params;
//       const pdfs = await DeptPdfModel.getAllByDepartmentAndSection(department, section);
//       res.json(pdfs);
//     } catch (error) {
//       console.error('Error fetching PDFs:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   },

//   // Upload a new PDF
//   uploadPdf: async (req, res) => {
//     try {
//       const { department, section } = req.params;
//       const { title } = req.body;

//       if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//       }

//       if (!title) {
//         return res.status(400).json({ error: 'Title is required' });
//       }

//       const filename = req.file.filename;
//       const newPdf = await DeptPdfModel.create(department, section, title, filename);

//       res.status(201).json({
//         message: 'PDF uploaded successfully',
//         pdf: {
//           ...newPdf,
//           pdfUrl: `/uploads/department/${department}/${section}/${filename}`
//         }
//       });
//     } catch (error) {
//       console.error('Error uploading PDF:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   },

//   // Delete a PDF
//   deletePdf: async (req, res) => {
//     try {
//       const { id } = req.params;

//       // Get PDF details before deletion to remove file from filesystem
//       const pdf = await DeptPdfModel.getById(id);
//       if (!pdf) {
//         return res.status(404).json({ error: 'PDF not found' });
//       }

//       // Delete from database
//       await DeptPdfModel.deleteById(id);

//       // Delete file from filesystem
//       const filePath = path.join(__dirname, '../../public/uploads/department', pdf.department, pdf.section, pdf.filename);
//       if (fs.existsSync(filePath)) {
//         fs.unlinkSync(filePath);
//       }

//       res.json({ message: 'PDF deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting PDF:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   },

//   // Update PDF title
//   updatePdf: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { title } = req.body;

//       if (!title) {
//         return res.status(400).json({ error: 'Title is required' });
//       }

//       await DeptPdfModel.updateById(id, title);
//       res.json({ message: 'PDF updated successfully' });
//     } catch (error) {
//       console.error('Error updating PDF:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   },

//   // Middleware for file upload
//   uploadMiddleware: upload.single('pdf')
// };

// export default DeptPdfController;
