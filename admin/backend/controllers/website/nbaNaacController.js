

// // nbaNaacController.js

// import { NBANAACModel } from "../../models/website/nbaNaacModel.js";
// import path from "path";
// import fs from "fs";

// // ✨ UPDATED: Expanded the list of allowed sections
// const ALLOWED_SECTIONS = ["NBA", "NAAC", "NAAC Appeals", "AQAR 2019-20", "AQAR 2020-21"];

// export const saveHomeContent = async (req, res) => {
//   try {
//     const { content } = req.body;
//     const files = req.files || [];

//     if (!content) {
//       return res
//         .status(400)
//         .json({ error: "Content is required for Home section" });
//     }

//     // First, get existing data to manage old files
//     const existingData = await NBANAACModel.getHomeContent();

//     let imageUrls = existingData?.image_urls ? JSON.parse(existingData.image_urls) : [];
//     let pdfUrl = existingData?.pdf_url || null;
//     let pdfTitle = existingData?.pdf_title || null;

//     const newImageFiles = files.filter((file) => file.mimetype.startsWith("image/"));
//     const newPdfFile = files.find((file) => file.mimetype === "application/pdf");

//     // If new images are uploaded, replace the old ones
//     if (newImageFiles.length > 0) {
//       // Delete old image files from server
//       if (imageUrls.length > 0) {
//         imageUrls.forEach(url => {
//             const oldFilePath = path.join(process.cwd(), "public", url);
//             if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
//         });
//       }
//       // Set new image URLs
//       imageUrls = newImageFiles.map((file) => `/cdn/Home/${file.filename}`);
//     }
    
//     // If a new PDF is uploaded, replace the old one
//     if (newPdfFile) {
//         // Delete old PDF file from server
//         if (pdfUrl) {
//             const oldFilePath = path.join(process.cwd(), "public", pdfUrl);
//             if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
//         }
//         // Set new PDF URL and Title
//         pdfUrl = `/cdn/Home/${newPdfFile.filename}`;
//         pdfTitle = newPdfFile.originalname;
//     }


//     const result = await NBANAACModel.saveHomeContent(
//       content,
//       imageUrls,
//       pdfUrl,
//       pdfTitle
//     );
//     res
//       .status(200)
//       .json({ message: "Home content saved successfully", result });
//   } catch (error) {
//     console.error("Error saving home content:", error);
//     res.status(500).json({ error: "Error saving home content" });
//   }
// };

// export const getHomeContent = async (req, res) => {
//   try {
//     const content = await NBANAACModel.getHomeContent();
//     const data = content || {
//       content: "",
//       image_urls: [],
//       pdf_url: null,
//       pdf_title: null,
//     };
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
    
//     // ✨ UPDATED: Using the new validation list
//     if (!ALLOWED_SECTIONS.includes(section))
//       return res.status(400).json({ error: "Invalid section" });

//     const fileType = file.mimetype.startsWith("video/")
//       ? "video"
//       : file.mimetype.startsWith("image/")
//       ? "photo"
//       : "pdf";
//     const fileUrl = `/cdn/${section}/${file.filename}`;

//     const result = await NBANAACModel.saveFile(
//       section,
//       fileType,
//       fileUrl,
//       fileTitle
//     );
//     res
//       .status(200)
//       .json({ message: `${section} file uploaded successfully`, result });
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     res.status(500).json({ error: "Error uploading file" });
//   }
// };

// export const getFiles = async (req, res) => {
//   try {
//     const { section } = req.params;
    
//     // ✨ UPDATED: Using the new validation list
//     if (!ALLOWED_SECTIONS.includes(section))
//       return res.status(400).json({ error: "Invalid section" });

//     const files = await NBANAACModel.getFiles(section);
//     res.status(200).json(files);
//   } catch (error) {
//     console.error("Error fetching files:", error);
//     res.status(500).json({ error: "Error fetching files" });
//   }
// };

// export const deleteFile = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const file = await NBANAACModel.getFileById(id);
//     if (!file) {
//       return res.status(404).json({ error: "File not found" });
//     }

//     const filePath = path.join(process.cwd(), "public", file.file_url);
//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//     }
    
//     await NBANAACModel.deleteFile(id);
    
//     res.status(200).json({ message: "File deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting file:", error);
//     res.status(500).json({ error: "Error deleting file" });
//   }
// };


// nbaNaacController.js

import { NBANAACModel } from "../../models/website/nbaNaacModel.js";
import path from "path";
import fs from "fs";

const ALLOWED_SECTIONS = ["NBA", "NAAC", "NAAC Appeals", "AQAR 2019-20", "AQAR 2020-21"];

export const saveHomeContent = async (req, res) => {
  try {
    const { content } = req.body;
    const files = req.files || [];

    if (!content) {
      return res.status(400).json({ error: "Content is required for Home section" });
    }

    const existingData = await NBANAACModel.getHomeContent();
    let oldImageUrls = (existingData && existingData.image_urls && typeof existingData.image_urls === 'string') ? JSON.parse(existingData.image_urls) : [];
    
    let imageUrls = oldImageUrls;
    let pdfUrl = existingData?.pdf_url || null;
    let pdfTitle = existingData?.pdf_title || null;

    const newImageFiles = files.filter((file) => file.mimetype.startsWith("image/"));
    const newPdfFile = files.find((file) => file.mimetype === "application/pdf");

    if (newImageFiles.length > 0) {
      if (oldImageUrls.length > 0) {
        oldImageUrls.forEach(url => {
            const oldFilePath = path.join(process.cwd(), "public", url);
            if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
        });
      }
      imageUrls = newImageFiles.map((file) => `/cdn/Home/${file.filename}`);
    }
    
    if (newPdfFile) {
        if (pdfUrl) {
            const oldFilePath = path.join(process.cwd(), "public", pdfUrl);
            if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
        }
        pdfUrl = `/cdn/Home/${newPdfFile.filename}`;
        pdfTitle = newPdfFile.originalname;
    }

    await NBANAACModel.saveHomeContent(content, imageUrls, pdfUrl, pdfTitle);
    res.status(200).json({ message: "Home content saved successfully" });

  } catch (error) {
    console.error("Error saving home content:", error);
    res.status(500).json({ error: "Error saving home content" });
  }
};

export const getHomeContent = async (req, res) => {
  try {
    const content = await NBANAACModel.getHomeContent();
    
    // FIX: Gracefully handle when no content exists.
    if (!content) {
      return res.status(200).json({ content: "", image_urls: [], pdf_url: null, pdf_title: null });
    }
    
    // FIX: Safely parse image_urls only if it's a valid string.
    const data = {
        ...content,
        image_urls: (typeof content.image_urls === 'string' && content.image_urls)
            ? JSON.parse(content.image_urls)
            : [],
    };

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching home content:", error);
    res.status(500).json({ error: "Error fetching home content" });
  }
};

export const uploadFile = async (req, res) => {
  try {
    const { section, fileTitle, matrices } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No file uploaded" });
    if (!ALLOWED_SECTIONS.includes(section))
      return res.status(400).json({ error: "Invalid section" });

    const fileType = file.mimetype.startsWith("video/") ? "video" : file.mimetype.startsWith("image/") ? "photo" : "pdf";
    const fileUrl = `/cdn/${section}/${file.filename}`;

    const result = await NBANAACModel.saveFile(section, fileType, fileUrl, fileTitle, matrices);
    res.status(200).json({ message: `${section} file uploaded successfully`, result });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: `Error uploading file: ${error.message}` });
  }
};

export const getFiles = async (req, res) => {
  try {
    const { section } = req.params;
    if (!ALLOWED_SECTIONS.includes(section))
      return res.status(400).json({ error: "Invalid section" });
    const files = await NBANAACModel.getFiles(section);
    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Error fetching files" });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    
    const file = await NBANAACModel.getFileById(id);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    const filePath = path.join(process.cwd(), "public", file.file_url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    await NBANAACModel.deleteFile(id);
    
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ error: "Error deleting file" });
  }
};