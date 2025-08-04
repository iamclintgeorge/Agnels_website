// src/routes/website/studentcornerRoutes.js
//----------------------------------------------------------------
import express from "express";
import path from "path";
import multer from "multer";

import {
  /* Code‑of‑Conduct */
  codeOfConductCreateController,
  codeOfConductFetchController,
  codeOfConductEditController,
  codeOfConductDeleteController,

  /* Student‑Council – Members & Reports */
  councilMemberCreateController,
  councilMembersFetchController,
  councilMemberEditController,
  councilMemberDeleteController,
  councilReportCreateController,
  councilReportsFetchController,
  councilReportEditController,
  councilReportDeleteController,

  /* Professional Bodies */
  professionalBodyCreateController,
  professionalBodiesFetchController,
  professionalBodyEditController,
  professionalBodyDeleteController,

  /* NSS */
  nssOfficerCreateController,
  nssOfficersFetchController,
  nssActivityReportCreateController,
  nssActivityReportsFetchController,

  /* Student Clubs */
  studentClubCreateController,
  studentClubsFetchController,
  studentClubEditController,
  studentClubDeleteController,

  /* Infrastructure */
  facilityCreateController,
  facilitiesFetchController,
  facilityEditController,
  facilityDeleteController,

  /* Cultural Activities */
  culturalActivityCreateController,
  culturalActivitiesFetchController,

  /* Anti‑Ragging */
  antiRaggingContactCreateController,
  antiRaggingContactsFetchController,
  antiRaggingNoticeCreateController,
  antiRaggingNoticesFetchController,

  /* Surveys */
  surveyCreateController,
  surveysFetchController,
  surveyEditController,
  surveyDeleteController,
} from "../../../controllers/website/studentcornerController.js";

/* --------------------------------------------------------------
   Multer setup (same rules as in academicsRoutes)
-------------------------------------------------------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/cdn"),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const ok = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/jpg",
  ].includes(file.mimetype);
  cb(ok ? null : new Error("Only PDF, JPG, and PNG files are allowed"), ok);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

/* Optional upload middleware (any field name) */
const optionalAnyUpload = (req, res, next) => {
  const ct = req.get("Content-Type") || "";
  if (ct.includes("multipart/form-data")) {
    upload.any()(req, res, (err) =>
      err
        ? res.status(400).json({ success: false, message: err.message })
        : next()
    );
  } else next();
};

/* -------------------------------------------------------------- */
const router = express.Router();

/* ========== 1. Code‑of‑Conduct PDFs ========== */
router.post(
  "/codeofconduct-create",
  optionalAnyUpload,
  codeOfConductCreateController
);
router.get("/codeofconduct", codeOfConductFetchController);
router.put(
  "/codeofconduct/:id",
  optionalAnyUpload,
  codeOfConductEditController
);
router.put("/delete-codeofconduct/:id", codeOfConductDeleteController);

/* ========== 2. Student‑Council – Members ========== */
router.post("/council-member-create", councilMemberCreateController);
router.get("/council-members", councilMembersFetchController);
router.put("/council-member/:id", councilMemberEditController);
router.put("/delete-council-member/:id", councilMemberDeleteController);

/* Student‑Council Reports */
router.post(
  "/council-report-create",
  optionalAnyUpload,
  councilReportCreateController
);
router.get("/council-reports", councilReportsFetchController);
router.put(
  "/council-report/:id",
  optionalAnyUpload,
  councilReportEditController
);
router.put("/delete-council-report/:id", councilReportDeleteController);

/* ========== 3. Professional Bodies ========== */
router.post(
  "/professional-body-create",
  optionalAnyUpload,
  professionalBodyCreateController
);
router.get("/professional-bodies", professionalBodiesFetchController);
router.put(
  "/professional-body/:id",
  optionalAnyUpload,
  professionalBodyEditController
);
router.put("/delete-professional-body/:id", professionalBodyDeleteController);

/* ========== 4. NSS ========== */
// Officers
router.post("/nss-officer-create", nssOfficerCreateController);
router.get("/nss-officers", nssOfficersFetchController);
// Activity reports (PDF)
router.post(
  "/nss-report-create",
  optionalAnyUpload,
  nssActivityReportCreateController
);
router.get("/nss-reports", nssActivityReportsFetchController);

/* ========== 5. Student Clubs ========== */
router.post("/club-create", optionalAnyUpload, studentClubCreateController);
router.get("/clubs", studentClubsFetchController);
router.put("/club/:id", optionalAnyUpload, studentClubEditController);
router.put("/delete-club/:id", studentClubDeleteController);

/* ========== 6. Infrastructure Facilities ========== */
router.post("/facility-create", optionalAnyUpload, facilityCreateController);
router.get("/facilities", facilitiesFetchController);
router.put("/facility/:id", optionalAnyUpload, facilityEditController);
router.put("/delete-facility/:id", facilityDeleteController);

/* ========== 7. Cultural Activities ========== */
router.post(
  "/cultural-activity-create",
  optionalAnyUpload,
  culturalActivityCreateController
);
router.get("/cultural-activities", culturalActivitiesFetchController);

/* ========== 8. Anti‑Ragging ========== */
// Contacts
router.post("/anti-ragging-contact-create", antiRaggingContactCreateController);
router.get("/anti-ragging-contacts", antiRaggingContactsFetchController);
// Notices (PDF)
router.post(
  "/anti-ragging-notice-create",
  optionalAnyUpload,
  antiRaggingNoticeCreateController
);
router.get("/anti-ragging-notices", antiRaggingNoticesFetchController);

/* ========== 9. Student Satisfaction Surveys ========== */
router.post("/survey-create", surveyCreateController);
router.get("/surveys", surveysFetchController);
router.put("/survey/:id", surveyEditController);
router.put("/delete-survey/:id", surveyDeleteController);

export default router;
