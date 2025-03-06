import express from "express";
import {
  signupController,
  loginController,
  logoutController,
} from "../../controllers/admin/userController.js";
import { authMiddleware, checkRole } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/signout", logoutController);
router.get("/check-auth", authMiddleware);

router.get(
  "/student",
  authMiddleware,
  checkRole(["SuperAdmin", "teach_staff"]),
  (req, res) => {
    res.status(200).json({ message: "Welcome, Teacher!" });
    console.log("/student router");
  }
);

export default router;
