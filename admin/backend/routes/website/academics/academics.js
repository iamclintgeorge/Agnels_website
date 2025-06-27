import express from "express";
import {
  academicHandbookCreateController,
  academicHandbookFetchController,
  academicHandbookEditController,
  academicHandbookDeleteController,
  academicCalendarCreateController,
  academicCalendarFetchController,
  academicCalendarEditController,
  academicCalendarDeleteController,
  examinationCreateController,
  examinationFetchController,
  examinationEditController,
  examinationDeleteController,
  academicLinksCreateController,
  academicLinksFetchController,
  academicLinksEditController,
  academicLinksDeleteController,
  stakeholderFeedbackCreateController,
  stakeholderFeedbackFetchController,
  stakeholderFeedbackEditController,
  stakeholderFeedbackDeleteController,
    academicHomeCreateController,
  academicHomeFetchController,
  academicHomeEditController,
  academicHomeDeleteController,
  academicHomeSectionCreateController,
  academicHomeSectionEditController,
  academicHomeSectionDeleteController,
  academicHomeAdminCardCreateController,
  academicHomeAdminCardEditController,
  academicHomeAdminCardDeleteController
} from "../../../controllers/website/academicsController.js";

import multer from "multer";
import path from "path";

// Configure multer for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Folder to save PDFs
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/jpg"
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, JPG, and PNG files are allowed"), false);
  }
};


const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for PDFs
});

// Middleware to handle optional file uploads
const optionalFileUpload = (req, res, next) => {
  // Check if request has file data
  const contentType = req.get('Content-Type');
  
  if (contentType && contentType.includes('multipart/form-data')) {
    // Handle file upload
    upload.single("pdf")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ 
          success: false, 
          message: err.message 
        });
      }
      next();
    });
  } else {
    // No file upload, proceed normally
    next();
  }
};
const examinationFileUpload = (req, res, next) => {
  const contentType = req.get('Content-Type');
  
  if (contentType && contentType.includes('multipart/form-data')) {
    upload.fields([
      { name: 'timetable_pdf', maxCount: 1 },
      { name: 'result_pdf', maxCount: 1 }
    ])(req, res, (err) => {
      if (err) {
        console.error('Examination upload error:', err);
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }
      console.log('Examination upload successful - Body:', req.body);
      console.log('Examination upload successful - Files:', req.files);
      next();
    });
  } else {
    next();
  }
};
// const optionalFileUpload = (req, res, next) => {
//   const contentType = req.get('Content-Type');

//   if (contentType && contentType.includes('multipart/form-data')) {
//     // Support multiple optional fields with correct names
//     const uploadMiddleware = upload.fields([
//       { name: 'pdf', maxCount: 1 },               // For calendar-create and others
//       { name: 'timetable_pdf', maxCount: 1 },     // For examinations
//       { name: 'result_pdf', maxCount: 1 }         // For examinations
//     ]);

//     uploadMiddleware(req, res, (err) => {
//       if (err) {
//         return res.status(400).json({
//           success: false,
//           message: err.message
//         });
//       }
//       next();
//     });
//   } else {
//     next();
//   }
// };
const router = express.Router();


// Academic Home Routes
router.post("/home-create", optionalFileUpload, academicHomeCreateController);
router.get("/home", academicHomeFetchController);
router.put("/home/:id", optionalFileUpload, academicHomeEditController);
router.put("/delete-home/:id", academicHomeDeleteController);

// Academic Home Sections Routes
router.post("/home-section-create", academicHomeSectionCreateController);
router.put("/home-section/:id", academicHomeSectionEditController);
router.put("/delete-home-section/:id", academicHomeSectionDeleteController);

// Academic Admin Cards Routes
router.post("/admin-card-create", academicHomeAdminCardCreateController);
router.put("/admin-card/:id", academicHomeAdminCardEditController);
router.put("/delete-admin-card/:id", academicHomeAdminCardDeleteController);


// Academic Handbook Routes - Single endpoint with optional file upload
router.post("/handbooks-create", optionalFileUpload, academicHandbookCreateController);
router.get("/handbooks", academicHandbookFetchController);
router.put("/handbooks/:id", optionalFileUpload, academicHandbookEditController);
router.put("/delete-handbooks/:id", academicHandbookDeleteController);

// Academic Calendar Routes - Single endpoint with optional file upload
router.post("/calendar-create", optionalFileUpload, academicCalendarCreateController);
router.get("/calendar", academicCalendarFetchController);
router.put("/calendar/:id", optionalFileUpload, academicCalendarEditController);
router.put("/delete-calendar/:id", academicCalendarDeleteController);

// Examination Routes
router.post("/examinations-create",examinationFileUpload, examinationCreateController);
router.get("/examinations", examinationFetchController);
router.put("/examinations/:id", examinationFileUpload,examinationEditController);
router.put("/delete-examinations/:id", examinationDeleteController);

// Academic Links Routes
router.post("/links-create", academicLinksCreateController);
router.get("/links", academicLinksFetchController);
router.put("/links/:id", academicLinksEditController);
router.put("/delete-links/:id", academicLinksDeleteController);

// Stakeholder Feedback Routes - Single endpoint with optional file upload
router.post("/feedback-create", optionalFileUpload, stakeholderFeedbackCreateController);
router.get("/feedback", stakeholderFeedbackFetchController);
router.put("/feedback/:id", optionalFileUpload, stakeholderFeedbackEditController);
router.put("/delete-feedback/:id", stakeholderFeedbackDeleteController);

export default router;