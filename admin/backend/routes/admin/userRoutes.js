import express from "express";
import {
  signupController,
  loginController,
  logoutController,
} from "../../controllers/admin/userController.js";
import {
  authMiddleware,
  checkAuth,
  checkRole,
} from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/signout", logoutController);
router.get("/check-auth", authMiddleware, checkAuth);

router.get(
  "/student",
  authMiddleware,
  checkRole(["superAdmin", "teach_staff"]),
  (req, res) => {
    res.status(200).json({ content: "Welcome, Teacher!" });
    console.log("/student router");
  }
);

export default router;
