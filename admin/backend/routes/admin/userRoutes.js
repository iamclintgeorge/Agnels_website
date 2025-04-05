import express from "express";
import {
  signupController,
  loginController,
  logoutController,
  checkAuthController
} from "../../controllers/admin/userController.js";
import {
  authMiddleware,
  checkAuth,
  checkRole,
} from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/signout", logoutController);
router.get("/check-auth", authMiddleware, checkAuthController);

// Simple status check endpoint (no auth required)
router.get("/status", (req, res) => {
  res.status(200).json({ 
    status: "API is running",
    time: new Date().toISOString(),
    cookies: req.cookies ? Object.keys(req.cookies) : [],
    session: req.session ? req.sessionID : null
  });
});

// Protected routes
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
