// import express from "express";
// import { saveNIRFDataController, getNIRFDataController, getAllNIRFDataController, upload } from "../../../controllers/website/nirfController.js";
// import { authMiddleware, checkRole } from "../../../middlewares/authMiddleware.js";

// const router = express.Router();

// router.post("/data", authMiddleware, checkRole(["admin","superAdmin","hod"]), upload.single("file"), saveNIRFDataController);
// router.get("/data", getNIRFDataController);
// router.get("/all", getAllNIRFDataController);

// export default router;



// nirfRoutes.js

import express from "express";
import { 
    saveNIRFDataController, 
    getNIRFDataController, 
    getAllNIRFDataController, 
    deleteNIRFDataController, // Import the new delete controller
    upload 
} from "../../../controllers/website/nirfController.js";
import { authMiddleware, checkRole } from "../../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/data", authMiddleware, checkRole(["admin","superAdmin","hod"]), upload.single("file"), saveNIRFDataController);
router.get("/data", getNIRFDataController);
router.get("/all", getAllNIRFDataController);

// --- ✨ NEW DELETE ROUTE ---
// Added a route to delete NIRF data for a specific year
router.delete("/data/:year", authMiddleware, checkRole(["admin","superAdmin","hod"]), deleteNIRFDataController);

export default router;