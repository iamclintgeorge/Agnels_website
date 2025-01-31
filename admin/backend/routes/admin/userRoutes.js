import express from "express";
import {
  signupController,
  loginController,
} from "../../controllers/admin/userController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/check-auth", authMiddleware);

export default router;
