import express from "express";
import {
  createApprovalRequest,
  getPendingApprovals,
  approveRequest,
  rejectRequest,
  // requestRevision,
} from "../../controllers/website/contentApprovalController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { approvalUpload } from "../../utils/approvalUploads.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Create new approval request
router.post("/request", approvalUpload.single("file"), createApprovalRequest);

// // Get pending approvals for user to review
router.get("/pending", getPendingApprovals);

// Approve a request
router.post("/:id/approve", approveRequest);

// // Reject a request
router.put("/:id/reject", rejectRequest);

// // Request revision
// router.post("/:id/revision", requestRevision);

export default router;
