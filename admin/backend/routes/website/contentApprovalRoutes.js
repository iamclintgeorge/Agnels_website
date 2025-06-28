import express from "express";
import {
  createApprovalRequest,
  getMyApprovalRequests,
  getPendingApprovals,
  getApprovalRequest,
  approveRequest,
  rejectRequest,
  requestRevision,
  getDashboardStats,
  getApprovalHistory
} from "../../controllers/website/contentApprovalController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Create new approval request
router.post("/", createApprovalRequest);

// Get user's own approval requests
router.get("/my-requests", getMyApprovalRequests);

// Get pending approvals for user to review
router.get("/pending", getPendingApprovals);

// Get dashboard statistics
router.get("/stats", getDashboardStats);

// Get specific approval request details
router.get("/:id", getApprovalRequest);

// Get approval history for a request
router.get("/:id/history", getApprovalHistory);

// Approve a request
router.post("/:id/approve", approveRequest);

// Reject a request
router.post("/:id/reject", rejectRequest);

// Request revision
router.post("/:id/revision", requestRevision);

export default router; 