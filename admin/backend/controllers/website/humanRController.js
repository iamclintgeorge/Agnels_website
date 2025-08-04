import {
  uploadHumanRPDF,
  getHumanRPDFsByCategory,
} from "../../models/website/humanRModel.js";
import multer from "multer";
import path from "path";

// Configure Multer for HR PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/cdn");
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
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Upload HR PDF (Teaching/Non-Teaching)
export const uploadHRPDFController = async (req, res) => {
  try {
    const { category } = req.body;

    if (!req.file || !category) {
      return res
        .status(400)
        .json({ message: "File and category are required" });
    }

    const file_url = req.file.filename;
    const title = req.file.originalname;

    await uploadHumanRPDF(file_url, title, category);

    res.json({
      message: "PDF uploaded successfully",
      file_url,
      title,
      category,
    });
  } catch (error) {
    console.error("Error uploading HR PDF:", error);
    res
      .status(500)
      .json({ message: "Error uploading PDF", error: error.message });
  }
};

// Get HR PDFs based on category
export const getHRPDFsController = async (req, res) => {
  try {
    const category = req.query.category || req.params.category;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const files = await getHumanRPDFsByCategory(category);
    res.json(files);
  } catch (error) {
    console.error("Error fetching HR PDFs:", error);
    res
      .status(500)
      .json({ message: "Error fetching PDFs", error: error.message });
  }
};

// export const getHRPDFsController = async (req, res) => {
//   try {
//     const category = req.query.category || req.params.category;

//     console.log("Fetching PDFs for category:", category);

//     if (!category) {
//       return res.status(400).json({ message: "Category is required" });
//     }

//     const files = await getHumanRPDFsByCategory(category);
//     res.json(files);
//   } catch (error) {
//     console.error("Error fetching HR PDFs:", error);
//     res.status(500).json({ message: "Error fetching PDFs", error: error.message });
//   }
// };
