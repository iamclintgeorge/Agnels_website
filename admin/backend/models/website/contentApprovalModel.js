import db from "../../config/db.js";

// Get approval rules for content type and user role
export const getApprovalRules = async (contentType, requesterRole, department = null) => {
  try {
    const [rows] = await db.execute(
      `SELECT * FROM content_approval_rules 
       WHERE content_type = ? AND requester_role = ? 
       AND (department = ? OR department IS NULL)
       ORDER BY department DESC LIMIT 1`,
      [contentType, requesterRole, department]
    );
    return rows[0] || null;
  } catch (error) {
    console.error("Error getting approval rules:", error);
    throw error;
  }
};

// Create approval request
export const createApprovalRequest = async (data) => {
  try {
    const {
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
      requiredApprovalLevel
    } = data;

    const [result] = await db.execute(
      `INSERT INTO content_approval_requests 
       (content_type, content_id, section, title, current_content, proposed_content, 
        change_type, change_summary, requested_by, requester_role, department, required_approval_level)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [contentType, contentId, section, title, currentContent, proposedContent, 
       changeType, changeSummary, requestedBy, requesterRole, department, requiredApprovalLevel]
    );

    // Log the submission
    await logApprovalAction(result.insertId, 'submitted', requestedBy, requesterRole, 'Request submitted for approval');
    
    return result.insertId;
  } catch (error) {
    console.error("Error creating approval request:", error);
    throw error;
  }
};

// Get approval requests by status and user role
export const getApprovalRequestsByRole = async (userRole, userId, status = null, department = null) => {
  try {
    let query = `
      SELECT car.*, 
             u_requester.userName as requester_name,
             u_hod.userName as hod_name,
             u_principal.userName as principal_name,
             u_superadmin.userName as superadmin_name
      FROM content_approval_requests car
      LEFT JOIN users u_requester ON car.requested_by = u_requester.id
      LEFT JOIN users u_hod ON car.hod_approved_by = u_hod.id
      LEFT JOIN users u_principal ON car.principal_approved_by = u_principal.id
      LEFT JOIN users u_superadmin ON car.superadmin_approved_by = u_superadmin.id
      WHERE 1=1
    `;
    
    const params = [];

    // Filter based on user role and what they can approve
    if (userRole === 'superAdmin') {
      // SuperAdmin can see all requests
      if (status) {
        query += ` AND car.status = ?`;
        params.push(status);
      }
    } else if (userRole.endsWith('Hod')) {
      // HODs can see requests for their department
      if (department) {
        query += ` AND car.department = ?`;
        params.push(department);
      }
      if (status) {
        query += ` AND car.status = ?`;
        params.push(status);
      }
    } else if (userRole === 'principal') {
      // Principal can see all requests requiring principal approval
      query += ` AND car.required_approval_level >= 2`;
      if (status) {
        query += ` AND car.status = ?`;
        params.push(status);
      }
    } else {
      // Regular users can only see their own requests
      query += ` AND car.requested_by = ?`;
      params.push(userId);
      if (status) {
        query += ` AND car.status = ?`;
        params.push(status);
      }
    }

    query += ` ORDER BY car.created_at DESC`;

    const [rows] = await db.execute(query, params);
    return rows;
  } catch (error) {
    console.error("Error getting approval requests by role:", error);
    throw error;
  }
};

// Get specific approval request
export const getApprovalRequestById = async (id) => {
  try {
    const [rows] = await db.execute(
      `SELECT car.*, 
             u_requester.userName as requester_name, u_requester.emailId as requester_email,
             u_hod.userName as hod_name,
             u_principal.userName as principal_name,
             u_superadmin.userName as superadmin_name
       FROM content_approval_requests car
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
export const approveRequest = async (requestId, approverId, approverRole, comments = null) => {
  try {
    let updateFields = [];
    let updateValues = [];

    // Determine which approval level to update
    if (approverRole.endsWith('Hod')) {
      updateFields = ['hod_approved_by = ?', 'hod_approved_at = CURRENT_TIMESTAMP'];
      updateValues = [approverId];
      if (comments) {
        updateFields.push('hod_comments = ?');
        updateValues.push(comments);
      }
    } else if (approverRole === 'principal') {
      updateFields = ['principal_approved_by = ?', 'principal_approved_at = CURRENT_TIMESTAMP'];
      updateValues = [approverId];
      if (comments) {
        updateFields.push('principal_comments = ?');
        updateValues.push(comments);
      }
    } else if (approverRole === 'superAdmin') {
      updateFields = ['superadmin_approved_by = ?', 'superadmin_approved_at = CURRENT_TIMESTAMP'];
      updateValues = [approverId];
      if (comments) {
        updateFields.push('superadmin_comments = ?');
        updateValues.push(comments);
      }
    }

    // Get current request to check approval level
    const request = await getApprovalRequestById(requestId);
    if (!request) throw new Error('Request not found');

    // Update approval level
    const newApprovalLevel = request.approval_level + 1;
    updateFields.push('approval_level = ?');
    updateValues.push(newApprovalLevel);

    // Check if this completes the approval process
    if (newApprovalLevel > request.required_approval_level) {
      updateFields.push('status = ?', 'final_approved_by = ?', 'final_approved_at = CURRENT_TIMESTAMP');
      updateValues.push('approved', approverId);
    }

    updateValues.push(requestId);
    
    const [result] = await db.execute(
      `UPDATE content_approval_requests 
       SET ${updateFields.join(', ')} 
       WHERE id = ?`,
      updateValues
    );

    // Log the approval action
    const action = newApprovalLevel > request.required_approval_level ? 'approved' : 'approved';
    await logApprovalAction(requestId, action, approverId, approverRole, comments);

    return result;
  } catch (error) {
    console.error("Error approving request:", error);
    throw error;
  }
};

// Reject request
export const rejectRequest = async (requestId, rejectedBy, rejectorRole, comments) => {
  try {
    const [result] = await db.execute(
      `UPDATE content_approval_requests 
       SET status = 'rejected'
       WHERE id = ?`,
      [requestId]
    );

    // Log the rejection
    await logApprovalAction(requestId, 'rejected', rejectedBy, rejectorRole, comments);

    return result;
  } catch (error) {
    console.error("Error rejecting request:", error);
    throw error;
  }
};

// Request revision
export const requestRevision = async (requestId, reviewerId, reviewerRole, comments) => {
  try {
    const [result] = await db.execute(
      `UPDATE content_approval_requests 
       SET status = 'needs_revision', approval_level = 1
       WHERE id = ?`,
      [requestId]
    );

    // Log the revision request
    await logApprovalAction(requestId, 'revised', reviewerId, reviewerRole, comments);

    return result;
  } catch (error) {
    console.error("Error requesting revision:", error);
    throw error;
  }
};

// Mark request as implemented
export const markAsImplemented = async (requestId, implementedBy) => {
  try {
    const [result] = await db.execute(
      `UPDATE content_approval_requests 
       SET implemented_at = CURRENT_TIMESTAMP
       WHERE id = ? AND status = 'approved'`,
      [requestId]
    );

    // Log the implementation
    await logApprovalAction(requestId, 'implemented', implementedBy, 'system', 'Content successfully implemented');

    return result;
  } catch (error) {
    console.error("Error marking as implemented:", error);
    throw error;
  }
};

// Log approval action
export const logApprovalAction = async (requestId, action, performedBy, performerRole, comments = null) => {
  try {
    // Get current status for history
    const request = await getApprovalRequestById(requestId);
    const previousStatus = request ? request.status : null;

    let newStatus = previousStatus;
    switch (action) {
      case 'approved':
        newStatus = request && request.approval_level >= request.required_approval_level ? 'approved' : 'pending';
        break;
      case 'rejected':
        newStatus = 'rejected';
        break;
      case 'revised':
        newStatus = 'needs_revision';
        break;
      case 'implemented':
        newStatus = 'approved';
        break;
    }

    const [result] = await db.execute(
      `INSERT INTO content_change_history 
       (approval_request_id, action, performed_by, performer_role, comments, previous_status, new_status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [requestId, action, performedBy, performerRole, comments, previousStatus, newStatus]
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
    const [rows] = await db.execute(
      `SELECT cch.*, u.userName, u.emailId
       FROM content_change_history cch
       LEFT JOIN users u ON cch.performed_by = u.id
       WHERE cch.approval_request_id = ?
       ORDER BY cch.action_timestamp ASC`,
      [requestId]
    );
    return rows;
  } catch (error) {
    console.error("Error getting approval history:", error);
    throw error;
  }
};

// Get pending approvals count for dashboard
export const getPendingApprovalsCount = async (userRole, department = null) => {
  try {
    let query = `
      SELECT COUNT(*) as count
      FROM content_approval_requests
      WHERE status = 'pending'
    `;
    const params = [];

    if (userRole.endsWith('Hod') && department) {
      query += ` AND department = ? AND approval_level = 1`;
      params.push(department);
    } else if (userRole === 'principal') {
      query += ` AND required_approval_level >= 2 AND approval_level = 2`;
    } else if (userRole === 'superAdmin') {
      query += ` AND approval_level = 3`;
    } else {
      return { count: 0 };
    }

    const [rows] = await db.execute(query, params);
    return rows[0];
  } catch (error) {
    console.error("Error getting pending approvals count:", error);
    throw error;
  }
};

// Get department by user role
export const getDepartmentByUserRole = (userRole) => {
  const departmentMap = {
    'compHod': 'computer-engineering',
    'mechHod': 'mechanical-engineering',
    'electricalHod': 'electrical-engineering',
    'extcHod': 'extc',
    'bshHod': 'basic-science-and-humanities',
    'itHod': 'computer-science-and-engineering'
  };
  return departmentMap[userRole] || null;
}; 