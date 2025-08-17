// import {
//   saveNIRFData,
//   getNIRFData,
//   getAllNIRFData,
// } from "../../models/website/nirfModel.js";
// import multer from "multer";
// import path from "path";

// // Configure Multer for PDF uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/cdn/NIRF");
//   },
//   filename: (req, file, cb) => {
//     const uniqueName =
//       Date.now() +
//       "-" +
//       Math.round(Math.random() * 1e9) +
//       path.extname(file.originalname);
//     cb(null, uniqueName);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "application/pdf") {
//     cb(null, true);
//   } else {
//     cb(new Error("Only PDF files are allowed"), false);
//   }
// };

// export const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
// });

// // Save or update NIRF data
// export const saveNIRFDataController = async (req, res) => {
//   try {
//     const { year, content } = req.body;
//     const pdf_url = req.file ? `/cdn/NIRF/${req.file.filename}` : null;
//     const pdf_title = req.file ? req.file.originalname : null;

//     if (!year || !content) {
//       return res.status(400).json({ message: "Year and content are required" });
//     }

//     await saveNIRFData(year, content, pdf_url, pdf_title);
//     res.json({ message: "NIRF data saved successfully" });
//   } catch (error) {
//     console.error("Error saving NIRF data:", error);
//     res
//       .status(500)
//       .json({ message: "Error saving NIRF data", error: error.message });
//   }
// };

// // Get NIRF data for a specific year
// export const getNIRFDataController = async (req, res) => {
//   try {
//     const { year } = req.query;
//     if (!year) return res.status(400).json({ message: "Year is required" });

//     const data = await getNIRFData(year);
//     if (!data) {
//       return res
//         .status(404)
//         .json({ message: `No data found for year ${year}` });
//     }
//     res.json(data);
//   } catch (error) {
//     console.error("Error fetching NIRF data:", error);
//     res
//       .status(500)
//       .json({ message: "Error fetching NIRF data", error: error.message });
//   }
// };

// // Get all NIRF data
// export const getAllNIRFDataController = async (req, res) => {
//   try {
//     const data = await getAllNIRFData();
//     res.json(data);
//   } catch (error) {
//     console.error("Error fetching all NIRF data:", error);
//     res
//       .status(500)
//       .json({ message: "Error fetching all NIRF data", error: error.message });
//   }
// };


// nirfController.js

import {
  saveNIRFData,
  getNIRFData,
  getAllNIRFData,
  deleteNIRFData, // Import the new delete model function
} from "../../models/website/nirfModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";

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

// --- ✨ UPDATED SAVE/UPDATE CONTROLLER ---
export const saveNIRFDataController = async (req, res) => {
  try {
    const { year, content } = req.body;
    
    if (!year || !content) {
      return res.status(400).json({ message: "Year and content are required" });
    }
    
    // Check for existing data to delete old PDF if a new one is uploaded
    const existingData = await getNIRFData(year);

    let pdf_url = existingData ? existingData.pdf_url : null;
    let pdf_title = existingData ? existingData.pdf_title : null;

    // If a new file is uploaded, replace the old one
    if (req.file) {
      // If an old PDF exists, delete it from the server
      if (existingData && existingData.pdf_url) {
        const oldFilePath = path.join(process.cwd(), "public", existingData.pdf_url);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      pdf_url = `/cdn/NIRF/${req.file.filename}`;
      pdf_title = req.file.originalname;
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

// --- ✨ NEW DELETE CONTROLLER ---
export const deleteNIRFDataController = async (req, res) => {
    try {
        const { year } = req.params;

        // 1. Get data to find the PDF URL
        const data = await getNIRFData(year);
        if (data && data.pdf_url) {
            const filePath = path.join(process.cwd(), "public", data.pdf_url);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        // 2. Delete the record from the database
        await deleteNIRFData(year);
        res.json({ message: `NIRF data for ${year} deleted successfully.` });

    } catch (error) {
        console.error("Error deleting NIRF data:", error);
        res.status(500).json({ message: "Error deleting NIRF data", error: error.message });
    }
};