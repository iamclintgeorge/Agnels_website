// import express from "express";
// import {
//   researchHomeController,
//   researchHomeUpdateController,
//   researchPdfUploadController,
//   researchPdfDisplayController,
//   researchPdfUpdateController,
//   researchPdfDeleteController,
// } from "../../../../controllers/website/researchController.js";
// import multer from "multer";
// import { authMiddleware, checkRole } from "../../../../middlewares/authMiddleware.js";

// const router = express.Router();

// // Public routes
// router.get("/home", researchHomeController); // Moved here
// router.get("/pdf", researchPdfDisplayController);

// // Admin routes
// const adminRouter = express.Router();
// adminRouter.use(authMiddleware);
// adminRouter.use(checkRole(["superAdmin", "hod"]));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/cdn/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage });

// adminRouter.put("/home/:id", researchHomeUpdateController);
// adminRouter.post("/pdf", upload.single("file"), researchPdfUploadController);
// adminRouter.put("/pdf/:id", upload.single("file"), researchPdfUpdateController);
// adminRouter.delete("/pdf/:id", researchPdfDeleteController);

// router.use(adminRouter);

// export default router;

import express from "express";
import {
  researchHomeController,
  researchHomeUploadController,
  researchHomeUpdateController,
  researchPdfUploadController,
  researchPdfDisplayController,
  researchPdfUpdateController,
  researchPdfDeleteController,
} from "../../../../controllers/website/researchController.js";
import multer from "multer";
import {
  authMiddleware,
  checkRole,
} from "../../../../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes (for display on main website)
router.get("/pdf", researchPdfDisplayController);
router.get("/home", researchHomeController);

// Admin routes (prefixed with /admin)
const adminRouter = express.Router();
adminRouter.use(authMiddleware);
adminRouter.use(checkRole(["superAdmin", "hod"]));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/cdn/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Admin text routes
adminRouter.post("/home", researchHomeUploadController);
adminRouter.put("/home/:id", researchHomeUpdateController);

// Admin PDF routes
// ✅ FIXED: Changed to upload.array to handle multiple files
adminRouter.post(
  "/pdf",
  upload.array("files", 10),
  researchPdfUploadController
);
adminRouter.put("/pdf/:id", upload.single("file"), researchPdfUpdateController);
adminRouter.delete("/pdf/:id", researchPdfDeleteController);

router.use("/admin", adminRouter);

export default router;
