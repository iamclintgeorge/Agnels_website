import {
  saveIICText,
  getIICText,
  uploadIICPDF,
  getIICPDFs,
  updateIICText,
  getIICPDFbyId,
  deleteIICPdfs,
} from "../../models/website/iicModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Multer for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/cdn/IIC");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Save or Update IIC Text
export const saveIICTextController = async (req, res) => {
  try {
    const { section, content } = req.body;
    await saveIICText(section, content);
    res.json({ message: "IIC text saved successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error saving text" });
  }
};

// Update IIC Text
export const updateIICTextController = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }
    const result = await updateIICText(id, content);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Text not found" });
    }
    res.json({ message: "Text updated successfully" });
  } catch (error) {
    console.error("Error updating text:", error);
    res
      .status(500)
      .json({ message: "Error updating text", error: error.message });
  }
};

// Get IIC Text
export const getIICTextController = async (req, res) => {
  try {
    const { section } = req.query;
    if (!section)
      return res.status(400).json({ message: "Section is required" });

    // Fetch text from the database based on section
    const data = await getIICText(section);

    if (!data) {
      return res
        .status(404)
        .json({ message: "Text not found for this section" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching text:", error);
    res
      .status(500)
      .json({ message: "Error fetching text", error: error.message });
  }
};

// Upload IIC PDF
export const uploadIICPDFController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const file_url = req.file.filename;
    const title = req.file.originalname;
    await uploadIICPDF(file_url, title);
    res.json({ message: "PDF uploaded successfully", file_url, title });
  } catch (error) {
    console.error("Error uploading PDF:", error);
    res
      .status(500)
      .json({ message: "Error uploading PDF", error: error.message });
  }
};

// Get IIC PDFs
export const getIICPDFsController = async (req, res) => {
  try {
    const files = await getIICPDFs();
    res.json(files);
  } catch (error) {
    console.error("Error fetching PDFs:", error);
    res
      .status(500)
      .json({ message: "Error fetching PDFs", error: error.message });
  }
};

// Delete IIC Pdfs
export const deletePdf = async (req, res) => {
  const { id } = req.params;
  console.log("Deleting PDF with id:", id); // Log to check if the function is being called

  try {
    const pdf = await getIICPDFbyId(id);
    if (!pdf || !pdf[0]) {
      console.log("PDF not found.");
      return res.status(404).json({ message: "PDF not found." });
    }

    const file_url = pdf[0].file_url;
    const filePath = path.join(__dirname, "../../public/cdn/IIC", file_url);
    console.log("Deleting file at path:", filePath); // Log file path

    fs.unlink(filePath, async (err) => {
      if (err) {
        console.log("Error deleting the file:", err);
        return res.status(500).json({ message: "Error deleting the file." });
      }

      try {
        await deleteIICPdfs(id);
        res.status(200).json({ message: "PDF and file deleted successfully." });
      } catch (error) {
        console.log("Error deleting PDF record:", error);
        res.status(500).json({ message: "Error deleting the PDF record." });
      }
    });
  } catch (err) {
    console.error("Error deleting PDF:", err);
    res.status(500).json({ message: "Error deleting the PDF." });
  }
};
