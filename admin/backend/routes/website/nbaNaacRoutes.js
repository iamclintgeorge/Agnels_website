



// import express from "express";
// import multer from "multer";
// import { saveHomeContent, getHomeContent, uploadFile, getFiles } from "../../controllers/website/nbaNaacController.js";
// import fs from "fs";

// const router = express.Router();

// // Multer setup for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const section = req.body.section || "Home"; // Default to "Home" for Home content
//     const dir = `public/uploads/${section}`;
//     fs.mkdirSync(dir, { recursive: true });
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/png", "video/mp4", "application/pdf"];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Invalid file type. Only JPEG, PNG, MP4, and PDF are allowed."));
//     }
//   },
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
// });

// // Routes
// router.post("/home", upload.array("files", 10), saveHomeContent);
// router.get("/home", getHomeContent);
// router.post("/upload", upload.single("file"), uploadFile);
// router.get("/files/:section", getFiles);

// export default router;

import express from "express";
import multer from "multer";
import { saveHomeContent, getHomeContent, uploadFile, getFiles } from "../../controllers/website/nbaNaacController.js";
import fs from "fs";

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const section = req.body.section || "Home"; // Default to "Home" for Home content
    const dir = `public/uploads/${section}`;
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "video/mp4", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, MP4, and PDF are allowed."));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Routes
router.post("/home", upload.array("files", 10), saveHomeContent);
router.get("/home", getHomeContent);
router.post("/upload", upload.single("file"), uploadFile);
router.get("/files/:section", getFiles);

export default router;