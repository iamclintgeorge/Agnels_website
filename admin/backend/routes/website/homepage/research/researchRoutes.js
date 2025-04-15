


import express from "express";
import {
  researchHomeController,
  researchHomeUpdateController,
  researchPdfUploadController,
  researchPdfDisplayController,
  researchPdfUpdateController,
  researchPdfDeleteController,
} from "../../../../controllers/website/researchController.js";
import multer from "multer";
import { authMiddleware, checkRole } from "../../../../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/home", researchHomeController); // Moved here
router.get("/pdf", researchPdfDisplayController);

// Admin routes
const adminRouter = express.Router();
adminRouter.use(authMiddleware);
adminRouter.use(checkRole(["superAdmin", "hod"]));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

adminRouter.put("/home/:id", researchHomeUpdateController);
adminRouter.post("/pdf", upload.single("file"), researchPdfUploadController);
adminRouter.put("/pdf/:id", upload.single("file"), researchPdfUpdateController);
adminRouter.delete("/pdf/:id", researchPdfDeleteController);

router.use(adminRouter);

export default router;