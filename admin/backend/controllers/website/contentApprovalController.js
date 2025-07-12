import * as ApprovalModel from "../../models/website/contentApprovalModel.js";

// Create approval request
export const createApprovalRequest = async (req, res) => {
  try {
    // Accept both camelCase and snake_case keys
    const body = req.body;
    const contentType = body.contentType || body.content_type;
    const contentId = body.contentId || body.content_id;
    const section = body.section;
    const title = body.title;
    const currentContent = body.currentContent || body.current_content;
    const proposedContent = body.proposedContent || body.proposed_content;
    const changeType = body.changeType || body.operation || body.change_type;
    const changeSummary = body.changeSummary || body.change_summary;

    const requestedBy = req.session.user.id;
    const requesterRole = req.session.user.role;

    // Validate required fields
    if (!contentType || !title) {
      return res.status(400).json({
        success: false,
        message: "contentType and title are required.",
      });
    }

    // Determine department based on content or user role
    let department = null;
    if (section && section.includes("/")) {
      department = section.split("/")[0];
    } else if (requesterRole.endsWith("Hod")) {
      department = ApprovalModel.getDepartmentByUserRole(requesterRole);
    }

    // Get approval rules to determine required approval level
    const rules = await ApprovalModel.getApprovalRules(
      contentType,
      requesterRole,
      department
    );
    let requiredApprovalLevel = 1;

    if (rules) {
      if (rules.requires_superadmin_approval) requiredApprovalLevel = 3;
      else if (rules.requires_principal_approval) requiredApprovalLevel = 2;
      else if (rules.requires_hod_approval) requiredApprovalLevel = 1;
    }

    // Create approval request
    const requestId = await ApprovalModel.createApprovalRequest({
      contentType,
      contentId,
      section,
      title,
      currentContent,
      proposedContent,
      changeType,
      changeSummary,
      requestedBy,
      requesterRole,
      department,
      requiredApprovalLevel,
    });

    res.status(201).json({
      success: true,
      message: "Approval request created successfully",
      requestId,
      requiredApprovalLevel,
    });
  } catch (error) {
    console.error("Error creating approval request:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create approval request",
      error: error.message,
    });
  }
};

// Get approval requests for current user
export const getMyApprovalRequests = async (req, res) => {
  try {
    const { status } = req.query;
    const userId = req.session.user.id;
    const userRole = req.session.user.role;

    const department = ApprovalModel.getDepartmentByUserRole(userRole);
    const requests = await ApprovalModel.getApprovalRequestsByRole(
      userRole,
      userId,
      status,
      department
    );

    res.json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error("Error getting approval requests:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get approval requests",
      error: error.message,
    });
  }
};

// Get pending approvals for current user to review
export const getPendingApprovals = async (req, res) => {
  try {
    const db = (await import("../../config/db.js")).default;
    const userId = req.session.user.id;
    // Get all slave roles for this master user
    const [slaveRows] = await db
      .promise()
      .query(`SELECT slaveId FROM role_hierarchy WHERE masterId = ?`, [userId]);
    const slaveIds = slaveRows.map((row) => row.slaveId);
    if (slaveIds.length === 0) {
      return res.json({ success: true, requests: [] });
    }
    // Get all pending requests from these slaves
    const [requests] = await db.promise().query(
      `SELECT ar.*, u.userName as requester_name FROM approval_requests ar
       LEFT JOIN users u ON ar.requester_id = u.id
       WHERE ar.status = 'pending' AND ar.requester_id IN (?)`,
      [slaveIds]
    );
    res.json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error("Error getting pending approvals:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get pending approvals",
      error: error.message,
    });
  }
};

// Get specific approval request details
export const getApprovalRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const userRole = req.session.user.role;
    const userId = req.session.user.id;

    const request = await ApprovalModel.getApprovalRequestById(id);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Approval request not found",
      });
    }

    // Check if user has permission to view this request
    const department = ApprovalModel.getDepartmentByUserRole(userRole);
    if (
      userRole !== "superAdmin" &&
      userRole !== "principal" &&
      request.department !== department &&
      request.requested_by !== userId
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // Get approval history
    const history = await ApprovalModel.getApprovalHistory(id);

    res.json({
      success: true,
      request,
      history,
    });
  } catch (error) {
    console.error("Error getting approval request:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get approval request",
      error: error.message,
    });
  }
};

// Approve request
export const approveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { comments } = req.body;
    const approverId = req.session.user.id;
    const approverRole = req.session.user.role;

    const request = await ApprovalModel.getApprovalRequestById(id);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Approval request not found",
      });
    }

    // Check if user can approve at current level
    const department = ApprovalModel.getDepartmentByUserRole(approverRole);
    if (
      approverRole.endsWith("Hod") &&
      (request.approval_level !== 1 || request.department !== department)
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to approve at this level",
      });
    }

    if (approverRole === "principal" && request.approval_level !== 2) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to approve at this level",
      });
    }

    if (approverRole === "superAdmin" && request.approval_level !== 3) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to approve at this level",
      });
    }

    await ApprovalModel.approveRequest(id, approverId, approverRole, comments);

    res.json({
      success: true,
      message: "Request approved successfully",
    });
  } catch (error) {
    console.error("Error approving request:", error);
    res.status(500).json({
      success: false,
      message: "Failed to approve request",
      error: error.message,
    });
  }
};

// Reject request
export const rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { comments } = req.body;
    const rejectedBy = req.session.user.id;
    const rejectorRole = req.session.user.role;

    if (!comments) {
      return res.status(400).json({
        success: false,
        message: "Comments are required for rejection",
      });
    }

    const request = await ApprovalModel.getApprovalRequestById(id);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Approval request not found",
      });
    }

    await ApprovalModel.rejectRequest(id, rejectedBy, rejectorRole, comments);

    res.json({
      success: true,
      message: "Request rejected successfully",
    });
  } catch (error) {
    console.error("Error rejecting request:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reject request",
      error: error.message,
    });
  }
};

// Request revision
export const requestRevision = async (req, res) => {
  try {
    const { id } = req.params;
    const { comments } = req.body;
    const reviewerId = req.session.user.id;
    const reviewerRole = req.session.user.role;

    if (!comments) {
      return res.status(400).json({
        success: false,
        message: "Comments are required for revision request",
      });
    }

    const request = await ApprovalModel.getApprovalRequestById(id);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Approval request not found",
      });
    }

    await ApprovalModel.requestRevision(id, reviewerId, reviewerRole, comments);

    res.json({
      success: true,
      message: "Revision requested successfully",
    });
  } catch (error) {
    console.error("Error requesting revision:", error);
    res.status(500).json({
      success: false,
      message: "Failed to request revision",
      error: error.message,
    });
  }
};

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const userRole = req.session.user.role;
    const department = ApprovalModel.getDepartmentByUserRole(userRole);

    const pendingCount = await ApprovalModel.getPendingApprovalsCount(
      userRole,
      department
    );

    // Get additional stats for different roles
    let stats = {
      pendingApprovals: pendingCount.count,
    };

    if (userRole === "superAdmin" || userRole === "principal") {
      // Get all requests by status for admin/principal view
      const allRequests = await ApprovalModel.getApprovalRequestsByRole(
        userRole,
        null
      );
      stats.totalRequests = allRequests.length;
      stats.approvedRequests = allRequests.filter(
        (r) => r.status === "approved"
      ).length;
      stats.rejectedRequests = allRequests.filter(
        (r) => r.status === "rejected"
      ).length;
      stats.needsRevision = allRequests.filter(
        (r) => r.status === "needs_revision"
      ).length;
    }

    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error("Error getting dashboard stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get dashboard stats",
      error: error.message,
    });
  }
};

// Get approval history for a request
export const getApprovalHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const history = await ApprovalModel.getApprovalHistory(id);

    res.json({
      success: true,
      history,
    });
  } catch (error) {
    console.error("Error getting approval history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get approval history",
      error: error.message,
    });
  }
};

export const roleHierarchyController = async (req, res) => {
  console.log("roleHierarchyController");
  const { master, slave } = req.body;
  console.log(master, slave);

  if (!master || !slave) {
    return res.status(400).json({ message: "Master and Slave are required." });
  }

  try {
    // Insert the new relationship into the role_hierarchy table
    const query = `
    INSERT INTO role_hierarchy (masterId, slaveId) VALUES (?, ?)
  `;
    const values = [master, slave];
    const [result] = await db.promise.query(query, values);
    res.status(201).json({
      message: "Role hierarchy created successfully",
      status: "success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: "Database error", error: err });
  }
};
