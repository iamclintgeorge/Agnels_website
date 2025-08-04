import {
  saveNIRFData,
  getNIRFData,
  getAllNIRFData,
} from "../../models/website/nirfModel.js";
import multer from "multer";
import path from "path";

// Configure Multer for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/cdn/NIRF");
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

// Save or update NIRF data
export const saveNIRFDataController = async (req, res) => {
  try {
    const { year, content } = req.body;
    const pdf_url = req.file ? `/cdn/NIRF/${req.file.filename}` : null;
    const pdf_title = req.file ? req.file.originalname : null;

    if (!year || !content) {
      return res.status(400).json({ message: "Year and content are required" });
    }

    await saveNIRFData(year, content, pdf_url, pdf_title);
    res.json({ message: "NIRF data saved successfully" });
  } catch (error) {
    console.error("Error saving NIRF data:", error);
    res
      .status(500)
      .json({ message: "Error saving NIRF data", error: error.message });
  }
};

// Get NIRF data for a specific year
export const getNIRFDataController = async (req, res) => {
  try {
    const { year } = req.query;
    if (!year) return res.status(400).json({ message: "Year is required" });

    const data = await getNIRFData(year);
    if (!data) {
      return res
        .status(404)
        .json({ message: `No data found for year ${year}` });
    }
    res.json(data);
  } catch (error) {
    console.error("Error fetching NIRF data:", error);
    res
      .status(500)
      .json({ message: "Error fetching NIRF data", error: error.message });
  }
};

// Get all NIRF data
export const getAllNIRFDataController = async (req, res) => {
  try {
    const data = await getAllNIRFData();
    res.json(data);
  } catch (error) {
    console.error("Error fetching all NIRF data:", error);
    res
      .status(500)
      .json({ message: "Error fetching all NIRF data", error: error.message });
  }
};
