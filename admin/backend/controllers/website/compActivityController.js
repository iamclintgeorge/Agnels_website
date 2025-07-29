import {
  compActivityUpload,
  compActivityDisplay,
  compActivityDelete,
} from "../../models/website/compActivityModel.js";
import fs from "fs/promises";
import path from "path";

export const compActivityUploadController = async (req, res) => {
  try {
    const { title } = req.body;
    const pdf = req.file;

    if (!pdf) {
      return res.status(400).json({ message: "No PDF uploaded" });
    }

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const pdfUrl = `/cdn/${pdf.filename}`;
    await compActivityUpload(
      "computer-engineering",
      "activities",
      title,
      pdfUrl
    );

    res.json({
      message: "PDF uploaded successfully",
      pdfUrl: pdfUrl,
      title: title,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Error uploading PDF" });
  }
};

export const compActivityDisplayController = async (req, res) => {
  try {
    const pdfs = await compActivityDisplay(
      "computer-engineering",
      "activities"
    );
    res.json(pdfs);
  } catch (error) {
    console.error("Display error:", error);
    res.status(500).json({ message: "Error fetching PDFs" });
  }
};

export const compActivityDeleteController = async (req, res) => {
  try {
    const { id } = req.params;
    const pdf = await compActivityDelete(
      id,
      "computer-engineering",
      "activities"
    );

    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    // Delete the file from the server
    const filePath = path.join(process.cwd(), "public", pdf.filename);
    await fs.unlink(filePath);

    res.json({ message: "PDF deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Error deleting PDF" });
  }
};
