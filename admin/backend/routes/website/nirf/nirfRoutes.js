import express from "express";
import { saveNIRFDataController, getNIRFDataController, getAllNIRFDataController, upload } from "../../../controllers/website/nirfController.js";
import { authMiddleware, checkRole } from "../../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/data", authMiddleware, checkRole(["admin","superAdmin","hod"]), upload.single("file"), saveNIRFDataController);
router.get("/data", getNIRFDataController);
router.get("/all", getAllNIRFDataController);

export default router;



