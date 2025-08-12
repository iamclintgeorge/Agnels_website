import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import {
  getAllStaticPdfs,
  createStaticPdfs,
  getById,
  deleteById,
} from "../../models/website/staticPdfModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../public/cdn/static_pdfs");

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

// Get all PDFs
export const getAllPdfs = async (req, res) => {
  try {
    // const { department, section } = req.params;
    const pdfs = await getAllStaticPdfs();
    res.json(pdfs);
  } catch (error) {
    console.error("Error fetching PDFs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Upload a new PDF
export const uploadPdf = async (req, res) => {
  try {
    const { title } = req.body;
    const userName = req.session.user.userName;

    console.log("req.session", req.session.user.userName);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const filename = req.file.filename;
    const originalname = req.file.originalname;
    const newPdf = await createStaticPdfs(
      title,
      filename,
      originalname,
      userName
    );

    res.status(201).json({
      message: "PDF uploaded successfully",
      newPdf,
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
    console.log("deletePdf", id);

    const pdf = await getById(id);
    if (!pdf) {
      return res.status(404).json({ error: "PDF not found" });
    }

    console.log("deletePdfController: ", pdf);

    // Delete file from filesystem
    const filePath = path.join(
      __dirname,
      "../../public/cdn/static_pdfs",
      pdf[0].filename
    );
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from DB
    await deleteById(id);

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

    await updateById(id, title);
    res.json({ message: "PDF updated successfully" });
  } catch (error) {
    console.error("Error updating PDF:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Middleware for file upload
export const uploadMiddleware = upload.single("file");
