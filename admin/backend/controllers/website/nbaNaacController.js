// import { NBANAACModel } from "../../models/website/nbaNaacModel.js";
// import path from "path";
// import fs from "fs";

// export const saveHomeContent = async (req, res) => {
//   try {
//     const { content } = req.body;
//     const files = req.files || [];

//     // Validate content
//     if (!content) {
//       return res.status(400).json({ error: "Content is required for Home section" });
//     }

//     const imageUrls = files.map((file) => `/cdn/Home/${file.filename}`);

//     const result = await NBANAACModel.saveHomeContent(content, imageUrls);
//     res.status(200).json({ message: "Home content saved successfully", result });
//   } catch (error) {
//     console.error("Error saving home content:", error);
//     res.status(500).json({ error: "Error saving home content" });
//   }
// };

// export const getHomeContent = async (req, res) => {
//   try {
//     const content = await NBANAACModel.getHomeContent();
//     const data = content || { content: "", image_urls: [] };
//     // Parse image_urls if it exists
//     data.image_urls = data.image_urls ? JSON.parse(data.image_urls) : [];
//     res.status(200).json(data);
//   } catch (error) {
//     console.error("Error fetching home content:", error);
//     res.status(500).json({ error: "Error fetching home content" });
//   }
// };

// export const uploadFile = async (req, res) => {
//   try {
//     const { section, fileTitle } = req.body;
//     const file = req.file;
//     if (!file) return res.status(400).json({ error: "No file uploaded" });
//     if (!["NBA", "NAAC"].includes(section)) return res.status(400).json({ error: "Invalid section" });

//     const fileType = file.mimetype.startsWith("video/") ? "video" : file.mimetype.startsWith("image/") ? "photo" : "pdf";
//     const fileUrl = `/cdn/${section}/${file.filename}`;

//     const result = await NBANAACModel.saveFile(section, fileType, fileUrl, fileTitle);
//     res.status(200).json({ message: `${section} file uploaded successfully`, result });
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     res.status(500).json({ error: "Error uploading file" });
//   }
// };

// export const getFiles = async (req, res) => {
//   try {
//     const { section } = req.params;
//     if (!["NBA", "NAAC"].includes(section)) return res.status(400).json({ error: "Invalid section" });

//     const files = await NBANAACModel.getFiles(section);
//     res.status(200).json(files);
//   } catch (error) {
//     console.error("Error fetching files:", error);
//     res.status(500).json({ error: "Error fetching files" });
//   }
// };

import { NBANAACModel } from "../../models/website/nbaNaacModel.js";
import path from "path";
import fs from "fs";

export const saveHomeContent = async (req, res) => {
  try {
    const { content } = req.body;
    const files = req.files || [];

    // Validate content
    if (!content) {
      return res
        .status(400)
        .json({ error: "Content is required for Home section" });
    }

    // Separate images and PDFs
    const imageUrls = files
      .filter((file) => file.mimetype.startsWith("image/"))
      .map((file) => `/cdn/Home/${file.filename}`);
    const pdfFile = files.find((file) => file.mimetype === "application/pdf");
    const pdfUrl = pdfFile ? `/cdn/Home/${pdfFile.filename}` : null;
    const pdfTitle = pdfFile ? pdfFile.originalname : null;

    const result = await NBANAACModel.saveHomeContent(
      content,
      imageUrls,
      pdfUrl,
      pdfTitle
    );
    res
      .status(200)
      .json({ message: "Home content saved successfully", result });
  } catch (error) {
    console.error("Error saving home content:", error);
    res.status(500).json({ error: "Error saving home content" });
  }
};

export const getHomeContent = async (req, res) => {
  try {
    const content = await NBANAACModel.getHomeContent();
    const data = content || {
      content: "",
      image_urls: [],
      pdf_url: null,
      pdf_title: null,
    };
    // Parse image_urls if it exists
    data.image_urls = data.image_urls ? JSON.parse(data.image_urls) : [];
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching home content:", error);
    res.status(500).json({ error: "Error fetching home content" });
  }
};

export const uploadFile = async (req, res) => {
  try {
    const { section, fileTitle } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });
    if (!["NBA", "NAAC"].includes(section))
      return res.status(400).json({ error: "Invalid section" });

    const fileType = file.mimetype.startsWith("video/")
      ? "video"
      : file.mimetype.startsWith("image/")
      ? "photo"
      : "pdf";
    const fileUrl = `/cdn/${section}/${file.filename}`;

    const result = await NBANAACModel.saveFile(
      section,
      fileType,
      fileUrl,
      fileTitle
    );
    res
      .status(200)
      .json({ message: `${section} file uploaded successfully`, result });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Error uploading file" });
  }
};

export const getFiles = async (req, res) => {
  try {
    const { section } = req.params;
    if (!["NBA", "NAAC"].includes(section))
      return res.status(400).json({ error: "Invalid section" });

    const files = await NBANAACModel.getFiles(section);
    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Error fetching files" });
  }
};
