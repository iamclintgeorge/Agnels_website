import db from "../../config/db.js";

// Get approval rules for content type and user role
export const getApprovalRules = async (
  contentType,
  requesterRole,
  department = null
) => {
  try {
    const [rows] = await db.promise().query(
      `SELECT * FROM content_approval_rules 
       WHERE content_type = ? AND requester_role = ? 
       AND (department = ? OR department IS NULL)
       ORDER BY department DESC LIMIT 1`,
      [contentType, requesterRole, department]
    );
    return rows[0] || null; // return the first row or null if no rule is found
  } catch (error) {
    console.error("Error getting approval rules:", error);
    throw error; // throw error to be handled by calling function
  }
};

// ...existing code...

// Create approval request
export const createApprovalRequest = async (data) => {
  try {
    const {
      contentType,
      section,
      title,
      currentContent,
      proposedContent,
      changeType,
      changeSummary,
      requestedBy,
      requiredApprovalLevel,
    } = data;

    // Validate content type length (ensure it doesn't exceed the VARCHAR limit of 100)
    if (!contentType || contentType.length > 100) {
      throw new Error("Invalid content_type value or too long.");
    }

    // Insert new approval request into the database
    const [result] = await db.promise().query(
      `INSERT INTO approval_requests 
       (content_type, section, title, current_content, proposed_content, operation, change_summary, requester_id, status, approval_level, required_approval_level)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', 1, ?)`,
      [
        contentType, // content_type (e.g. "introtext")
        section, // section (e.g. "homepage")
        title, // title of the change request
        currentContent, // the current content before update
        proposedContent, // the new content to be approved
        changeType, // operation type (create, update, delete)
        changeSummary, // a short description of the change
        requestedBy, // ID of the user who is requesting
        requiredApprovalLevel, // level of approval required
      ]
    );

    // Log the approval action for history tracking
    await logApprovalAction(
      result.insertId,
      "submitted",
      requestedBy,
      null,
      "Request submitted for approval"
    );

    return result.insertId; // return the newly created request ID
  } catch (error) {
    console.error("Error creating approval request:", error);
    throw error; // throw error to be handled at higher level
  }
};

// Get specific approval request
export const getApprovalRequestById = async (id) => {
  try {
    const [rows] = await db.promise().query(
      `SELECT car.*, 
             u_requester.userName as requester_name, u_requester.emailId as requester_email,
             u_hod.userName as hod_name,
             u_principal.userName as principal_name,
             u_superadmin.userName as superadmin_name
       FROM approval_requests car
       LEFT JOIN users u_requester ON car.requested_by = u_requester.id
       LEFT JOIN users u_hod ON car.hod_approved_by = u_hod.id
       LEFT JOIN users u_principal ON car.principal_approved_by = u_principal.id
       LEFT JOIN users u_superadmin ON car.superadmin_approved_by = u_superadmin.id
       WHERE car.id = ?`,
      [id]
    );
    return rows[0] || null;
  } catch (error) {
    console.error("Error getting approval request by ID:", error);
    throw error;
  }
};

// Approve request at specific level
export const approveRequest = async (
  requestId,
  approverId,
  approverRole,
  comments = null
) => {
  try {
    let updateFields = [];
    let updateValues = [];

    // Determine which approval level to update
    if (approverRole.endsWith("Hod")) {
      updateFields = [
        "hod_approved_by = ?",
        "hod_approved_at = CURRENT_TIMESTAMP",
      ];
      updateValues = [approverId];
      if (comments) {
        updateFields.push("hod_comments = ?");
        updateValues.push(comments);
      }
    } else if (approverRole === "principal") {
      updateFields = [
        "principal_approved_by = ?",
        "principal_approved_at = CURRENT_TIMESTAMP",
      ];
      updateValues = [approverId];
      if (comments) {
        updateFields.push("principal_comments = ?");
        updateValues.push(comments);
      }
    } else if (approverRole === "superAdmin") {
      updateFields = [
        "superadmin_approved_by = ?",
        "superadmin_approved_at = CURRENT_TIMESTAMP",
      ];
      updateValues = [approverId];
      if (comments) {
        updateFields.push("superadmin_comments = ?");
        updateValues.push(comments);
      }
    }

    // Get current request to check approval level
    const request = await getApprovalRequestById(requestId);
    if (!request) throw new Error("Request not found");

    // Update approval level
    const newApprovalLevel = request.approval_level + 1;
    updateFields.push("approval_level = ?");
    updateValues.push(newApprovalLevel);

    // Check if this completes the approval process
    let result;
    if (newApprovalLevel > request.required_approval_level) {
      updateFields.push(
        "status = ?",
        "final_approved_by = ?",
        "final_approved_at = CURRENT_TIMESTAMP"
      );
      updateValues.push("approved", approverId);
    }

    updateValues.push(requestId);
    result = await db.promise().query(
      `UPDATE approval_requests 
       SET ${updateFields.join(", ")} 
       WHERE id = ?`,
      updateValues
    );

    // If fully approved, apply the change to the target table (e.g., introtext)
    if (
      newApprovalLevel > request.required_approval_level &&
      request.content_type === "introtext" &&
      request.operation === "update"
    ) {
      // For introtext, update the content in the introtext table
      // You may need to adjust the table/column names as per your schema
      await db
        .promise()
        .query(`UPDATE introtext SET Content = ? WHERE id = ?`, [
          request.proposed_content,
          request.content_id,
        ]);
    }

    // Log the approval action
    const action =
      newApprovalLevel > request.required_approval_level
        ? "approved"
        : "approved";
    await logApprovalAction(
      requestId,
      action,
      approverId,
      approverRole,
      comments
    );

    return result;
  } catch (error) {
    console.error("Error approving request:", error);
    throw error;
  }
};

// Reject request
export const rejectRequest = async (
  requestId,
  rejectedBy,
  rejectorRole,
  comments
) => {
  try {
    const updateFields = [
      "status = ?",
      "rejected_by = ?",
      "rejected_at = CURRENT_TIMESTAMP",
    ];
    const updateValues = ["rejected", rejectedBy];

    if (rejectorRole.endsWith("Hod")) {
      updateFields.push("hod_comments = ?");
      updateValues.push(comments);
    } else if (rejectorRole === "principal") {
      updateFields.push("principal_comments = ?");
      updateValues.push(comments);
    } else if (rejectorRole === "superAdmin") {
      updateFields.push("superadmin_comments = ?");
      updateValues.push(comments);
    }

    updateValues.push(requestId);

    const [result] = await db.promise().query(
      `UPDATE approval_requests 
       SET ${updateFields.join(", ")} 
       WHERE id = ?`,
      updateValues
    );

    // Log the rejection action
    await logApprovalAction(
      requestId,
      "rejected",
      rejectedBy,
      rejectorRole,
      comments
    );

    return result;
  } catch (error) {
    console.error("Error rejecting request:", error);
    throw error;
  }
};

// Request revision
export const requestRevision = async (
  requestId,
  reviewerId,
  reviewerRole,
  comments
) => {
  try {
    const updateFields = [
      "status = ?",
      "revision_requested_by = ?",
      "revision_requested_at = CURRENT_TIMESTAMP",
    ];
    const updateValues = ["revision_requested", reviewerId];

    if (reviewerRole.endsWith("Hod")) {
      updateFields.push("hod_comments = ?");
      updateValues.push(comments);
    } else if (reviewerRole === "principal") {
      updateFields.push("principal_comments = ?");
      updateValues.push(comments);
    } else if (reviewerRole === "superAdmin") {
      updateFields.push("superadmin_comments = ?");
      updateValues.push(comments);
    }

    updateValues.push(requestId);

    const [result] = await db.promise().query(
      `UPDATE approval_requests 
       SET ${updateFields.join(", ")} 
       WHERE id = ?`,
      updateValues
    );

    // Log the revision request action
    await logApprovalAction(
      requestId,
      "revision_requested",
      reviewerId,
      reviewerRole,
      comments
    );

    return result;
  } catch (error) {
    console.error("Error requesting revision:", error);
    throw error;
  }
};

// Mark as implemented
export const markAsImplemented = async (requestId, implementedBy) => {
  try {
    const [result] = await db.promise().query(
      `UPDATE approval_requests 
       SET status = 'implemented', implemented_by = ?, implemented_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [implementedBy, requestId]
    );

    // Log the implementation action
    await logApprovalAction(
      requestId,
      "implemented",
      implementedBy,
      "system",
      "Content changes implemented"
    );

    return result;
  } catch (error) {
    console.error("Error marking as implemented:", error);
    throw error;
  }
};

// Log approval action
export const logApprovalAction = async (
  requestId,
  action,
  performedBy,
  performerRole,
  comments = null
) => {
  try {
    const [result] = await db.promise().query(
      `INSERT INTO content_approval_history 
       (request_id, action, performed_by, performer_role, comments) 
       VALUES (?, ?, ?, ?, ?)`,
      [requestId, action, performedBy, performerRole, comments]
    );
    return result;
  } catch (error) {
    console.error("Error logging approval action:", error);
    throw error;
  }
};

// Get approval history for a request
export const getApprovalHistory = async (requestId) => {
  try {
    const [rows] = await db.promise().query(
      `SELECT ah.*, u.userName as performer_name 
       FROM content_approval_history ah
       LEFT JOIN users u ON ah.performed_by = u.id
       WHERE ah.request_id = ?
       ORDER BY ah.created_at ASC`,
      [requestId]
    );
    return rows;
  } catch (error) {
    console.error("Error getting approval history:", error);
    throw error;
  }
};

// Get pending approvals count for user
export const getPendingApprovalsCount = async (userRole, department = null) => {
  try {
    let query = `
      SELECT COUNT(*) as count
      FROM approval_requests
      WHERE status = 'pending'
    `;

    const params = [];

    if (userRole === "superAdmin") {
      // SuperAdmin can approve all
    } else if (userRole.endsWith("Hod")) {
      query += ` AND department = ? AND approval_level < 1`;
      params.push(department);
    } else if (userRole === "principal") {
      query += ` AND required_approval_level >= 2 AND approval_level < 2`;
    } else {
      // Regular users can't approve
      return { count: 0 };
    }

    const [rows] = await db.promise().query(query, params);
    return rows[0];
  } catch (error) {
    console.error("Error getting pending approvals count:", error);
    throw error;
  }
};

// Helper function to get department from user role
export const getDepartmentByUserRole = (userRole) => {
  const departmentMap = {
    compHod: "computer-engineering",
    mechHod: "mechanical-engineering",
    extcHod: "extc",
    electricalHod: "electrical-engineering",
    cseHod: "computer-science-and-engineering",
    bshHod: "basic-science-and-humanities",
  };

  return departmentMap[userRole] || null;
};
