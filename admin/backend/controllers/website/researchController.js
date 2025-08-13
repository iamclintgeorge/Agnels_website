// // admin/backend/controllers/researchController.js
// import {
//     researchHomeDisplay,
//     researchHomeUpdate,
//     researchPdfUpload,
//     researchPdfDisplay,
//     researchPdfDelete,
//   } from "../../models/website/researchModel.js";
//   import fs from "fs/promises";
//   import path from "path";

//     // Research Home Text Controllers
//     export const researchHomeController = async (req, res) => {
//       console.log("Console research home controller");
//       try {
//         const text = await researchHomeDisplay();
//         res.json(text);
//       } catch (error) {
//         console.error("Fetch error:", error);
//         res.status(500).json({ message: "Error fetching research home text" });
//       }
//     };

//     export const researchHomeUpdateController = async (req, res) => {
//       try {
//         const { id } = req.params;
//         const { content } = req.body;
//         console.log("Updating research text:", { id, content, user: req.user }); // Debug log

//         if (!content) {
//           return res.status(400).json({ message: "Content is required" });
//         }

//         const updatedText = await researchHomeUpdate(id, content);
//         if (!updatedText) {
//           return res.status(404).json({ message: "Text not found" });
//         }

//         res.json({ message: "Text updated successfully", content: updatedText });
//       } catch (error) {
//         console.error("Update error:", error);
//         res.status(500).json({ message: "Error updating text" });
//       }
//     };

//     export const researchPdfUploadController = async (req, res) => {
//       try {
//         const { section, topic } = req.body;
//         const file = req.file;

//         console.log("Upload request:", { section, topic, file }); // Debug log

//         if (!file) {
//           return res.status(400).json({ message: "No file uploaded" });
//         }

//         const filePath = `/cdn/${file.filename}`;
//         const filename = file.originalname;
//         console.log("Saving file at:", filePath); // Debug log

//         const result = await researchPdfUpload(section, topic, filePath, filename);
//         console.log("Upload result:", result); // Debug log

//         res.json({
//           message: "PDF uploaded successfully",
//           pdf: result, // Include full result for frontend
//         });
//       } catch (error) {
//         console.error("Upload error:", error);
//         res.status(500).json({ message: "Error uploading PDF", error: error.message });
//       }
//     };

//     export const researchPdfDisplayController = async (req, res) => {
//       try {
//         const { section } = req.query; // Optional section filter
//         const pdfs = await researchPdfDisplay(section);
//         res.json(pdfs);
//       } catch (error) {
//         console.error("Display error:", error);
//         res.status(500).json({ message: "Error fetching PDFs" });
//       }
//     };

//     export const researchPdfUpdateController = async (req, res) => {
//       try {
//         const { id } = req.params;
//         const file = req.file;

//         if (!file) {
//           return res.status(400).json({ message: "No file uploaded" });
//         }

//         const filePath = `/cdn/${file.filename}`;
//         const filename = file.originalname;
//         const oldPdf = await researchPdfDelete(id); // Delete old file
//         if (oldPdf) {
//           const oldFilePath = path.join(process.cwd(), "public", oldPdf.content);
//           await fs.unlink(oldFilePath).catch(() => console.log("Old file not found"));
//         }

//         const result = await researchPdfUpdate(id, filePath, filename);
//         if (!result) {
//           return res.status(404).json({ message: "PDF not found" });
//         }

//         res.json({ message: "PDF updated successfully", pdf: result });
//       } catch (error) {
//         console.error("Update error:", error);
//         res.status(500).json({ message: "Error updating PDF" });
//       }
//     };

//     export const researchPdfDeleteController = async (req, res) => {
//       try {
//         const { id } = req.params;
//         console.log("Deleting PDF with id:", id);
//         const pdf = await researchPdfDelete(id);

//         if (!pdf) {
//           return res.status(404).json({ message: "PDF not found" });
//         }

//         const filePath = path.join(process.cwd(), "public", pdf.content);
//         console.log("Attempting to delete file:", filePath);
//         await fs.unlink(filePath);

//         res.json({ message: "PDF deleted successfully" });
//       } catch (error) {
//         console.error("Delete error:", error);
//         res.status(500).json({ message: "Error deleting PDF" });
//       }
//     };

import {
  researchHomeDisplay,
  researchHomeUpload,
  researchHomeUpdate,
  researchPdfUpload,
  researchPdfDisplay,
  researchPdfUpdate,
  researchPdfDelete,
  findResearchPdfById, // ✅ Import new model function
} from "../../models/website/researchModel.js";
import fs from "fs/promises";
import path from "path";

// Research Home Text Controllers (Unchanged)
export const researchHomeController = async (req, res) => {
  try {
    const text = await researchHomeDisplay();
    res.json(text);
  } catch (error) {
    console.error("Fetch error in researchHomeController:", error);
    res
      .status(500)
      .json({ message: `Error fetching research home text: ${error.message}` });
  }
};

export const researchHomeUploadController = async (req, res) => {
  try {
    const { section, content } = req.body;
    if (!content || !section) {
      return res
        .status(400)
        .json({ message: "Section and content are required" });
    }
    const result = await researchHomeUpload(section, content);
    res.json({ message: "Text uploaded successfully", content: result });
  } catch (error) {
    console.error("Upload error in researchHomeUploadController:", error);
    res.status(500).json({ message: `Error uploading text: ${error.message}` });
  }
};

export const researchHomeUpdateController = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }
    const updatedText = await researchHomeUpdate(id, content);
    if (!updatedText) {
      return res.status(404).json({ message: "Text not found" });
    }
    res.json({ message: "Text updated successfully", content: updatedText });
  } catch (error) {
    console.error("Update error in researchHomeUpdateController:", error);
    res.status(500).json({ message: `Error updating text: ${error.message}` });
  }
};

// --- Research PDF Controllers ---

// ✅ FIXED: Rewritten to handle an array of files from req.files
export const researchPdfUploadController = async (req, res) => {
  try {
    const { section, topic } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadPromises = files.map((file) => {
      const filePath = `/cdn/${file.filename}`;
      const filename = file.originalname;
      return researchPdfUpload(section, topic, filePath, filename);
    });

    const results = await Promise.all(uploadPromises);

    res.json({
      message: "PDF(s) uploaded successfully",
      pdfs: results,
    });
  } catch (error) {
    console.error("Upload error in researchPdfUploadController:", error);
    res.status(500).json({ message: `Error uploading PDFs: ${error.message}` });
  }
};

export const researchPdfDisplayController = async (req, res) => {
  try {
    const { section } = req.query;
    const pdfs = await researchPdfDisplay(section);
    res.json(pdfs);
  } catch (error) {
    console.error("Display error in researchPdfDisplayController:", error);
    res.status(500).json({ message: `Error fetching PDFs: ${error.message}` });
  }
};

// ✅ FIXED: Rewritten to correctly update the DB and replace the old file.
export const researchPdfUpdateController = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded for update" });
    }

    // 1. Find the old PDF record to get the old file path
    const oldPdf = await findResearchPdfById(id);
    if (!oldPdf) {
      // Clean up the uploaded file if the record doesn't exist
      const tempPath = path.join(process.cwd(), "public", "cdn", file.filename);
      await fs
        .unlink(tempPath)
        .catch((err) => console.error("Error cleaning up temp file:", err));
      return res.status(404).json({ message: "PDF record not found" });
    }

    // 2. Update the database with the new file info
    const newFilePath = `/cdn/${file.filename}`;
    const newFilename = file.originalname;
    const result = await researchPdfUpdate(id, newFilePath, newFilename);

    // 3. If update is successful, delete the old physical file
    if (result) {
      const oldFilePath = path.join(process.cwd(), "public", oldPdf.content);
      await fs
        .unlink(oldFilePath)
        .catch((err) =>
          console.error(
            "Could not delete old file, it may not exist:",
            err.message
          )
        );
    }

    res.json({ message: "PDF updated successfully", pdf: result });
  } catch (error) {
    console.error("Update error in researchPdfUpdateController:", error);
    res.status(500).json({ message: `Error updating PDF: ${error.message}` });
  }
};

export const researchPdfDeleteController = async (req, res) => {
  try {
    const { id } = req.params;
    const pdf = await researchPdfDelete(id);

    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    const filePath = path.join(process.cwd(), "public", pdf.content);
    await fs
      .unlink(filePath)
      .catch((err) =>
        console.log("Error deleting file (it may not exist):", err.message)
      );

    res.json({ message: "PDF deleted successfully" });
  } catch (error) {
    console.error("Delete error in researchPdfDeleteController:", error);
    res.status(500).json({ message: `Error deleting PDF: ${error.message}` });
  }
};
