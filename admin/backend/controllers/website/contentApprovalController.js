import axios from "axios";
import db from "../../config/db.js";
import fs from "fs";
import path from "path";
import FormData from "form-data";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// import * as ApprovalModel from "../../models/website/contentApprovalModel.js";
import { createApprovalRequestModal } from "../../models/website/contentApprovalModel.js";

// Create approval request
export const createApprovalRequest = async (req, res) => {
  try {
    const body = req.body;
    // const contentType = body.contentType || body.content_type;
    // const contentId = body.contentId || body.content_id;
    const method = body.method;
    const section = body.section;
    const title = body.title;
    const changeSummary = body.changeSummary || body.change_summary;
    const currentContent = body.currentContent || body.current_content;
    const file = req.file;
    const uploadedFilename = file?.filename || null;
    let proposedContent = body.proposedContent || body.proposed_content;
    if (uploadedFilename) {
      const parsed = JSON.parse(proposedContent || "{}");
      parsed.imageFilename = uploadedFilename;
      proposedContent = JSON.stringify(parsed);
    }
    const endpoint = body.endpoint_url;
    const id = body.id;
    // const changeType = body.changeType || body.operation || body.change_type;

    const req_userID = req.session.user.id;
    const requesterRole = req.session.user.role;

    // Validate required fields
    if (!method || !title || !section) {
      return res.status(400).json({
        success: false,
        message: "method, section and title are required.",
      });
    }
    // Create approval request
    const response = await createApprovalRequestModal({
      method,
      section,
      title,
      changeSummary,
      currentContent,
      proposedContent,
      endpoint,
      id,
      req_userID,
      requesterRole,
    });

    res.status(201).json({
      success: true,
      message: "Approval request created successfully",
      response,
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

// Get pending approvals for current user to review
export const getPendingApprovals = async (req, res) => {
  try {
    const masterId = req.session.user.id;
    console.log("Master ID:", masterId);
    console.log("User info", req.session.user);

    // Get all slave roles for this master user
    const query = `SELECT slaveId FROM role_hierarchy WHERE masterId = ?`;
    const [slaveRows] = await db.promise().query(query, [masterId]);
    const slaveIds = slaveRows.map((row) => row.slaveId);
    if (slaveIds.length === 0) {
      return res.json({ success: true, requests: [] });
    }

    console.log("Slave ID:", slaveIds);
    // Get all pending requests from these slaves
    const [requests] = await db
      .promise()
      .query(`SELECT * FROM approval_requests WHERE req_roleID IN (?)`, [
        slaveIds,
      ]);
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

// export const approveRequest = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const slaveId = req.body.slaveId;

//     // Check for master verification
//     const [verifyMaster] = await db
//       .promise()
//       .query(`SELECT masterId FROM role_hierarchy WHERE slaveId = ?`, [
//         slaveId,
//       ]);

//     if (verifyMaster.length === 0) {
//       return res
//         .status(403)
//         .json({ success: false, message: "Master not authorized" });
//     }

//     // Fetch the request details
//     const [fetchDetails] = await db
//       .promise()
//       .query(`SELECT * FROM approval_requests WHERE id = ?`, [id]);

//     const requestData = fetchDetails[0];
//     if (!requestData) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Request not found" });
//     }

//     const {
//       req_userID,
//       req_userRole,
//       title,
//       section,
//       method,
//       status,
//       change_summary,
//       current_content,
//       proposed_content,
//       endpoint_url,
//       content_id,
//     } = requestData;

//     const dataToForward = {
//       id,
//       req_userID,
//       req_userRole,
//       title,
//       section,
//       method,
//       status,
//       change_summary,
//       current_content,
//       proposed_content,
//       content_id,
//     };

//     // Handle file if it's a pending upload
//     // if (proposed_content.startsWith("/uploads/pending/")) {
//     //   const fileName = path.basename(proposed_content);
//     //   const oldPath = path.join(
//     //     __dirname,
//     //     "../public/uploads/pending",
//     //     fileName
//     //   );
//     //   const newPath = path.join(__dirname, "../public/uploads", fileName);

//     //   try {
//     //     fs.renameSync(oldPath, newPath);
//     //     dataToForward.proposed_content = `/uploads/${fileName}`;
//     //   } catch (moveErr) {
//     //     return res.status(500).json({
//     //       success: false,
//     //       message: "File move failed",
//     //       error: moveErr.message,
//     //     });
//     //   }
//     // }

//     try {
//       if (method === "PUT") {
//         await axios.put(`http://localhost:3663/${endpoint_url}/${content_id}`, {
//           content: proposed_content,
//         });
//       } else if (method === "POST") {
//         const parsed = JSON.parse(proposed_content);
//         const fileName = parsed.imageFilename;

//         const pendingPath = path.join(
//           __dirname,
//           "../../public/uploads/pending",
//           fileName
//         );
//         const finalPath = path.join(
//           __dirname,
//           "../../public/uploads",
//           fileName
//         );

//         // Move file from pending to uploads if it exists
//         if (fs.existsSync(pendingPath)) {
//           try {
//             fs.renameSync(pendingPath, finalPath);
//             console.log("Moved from pending to uploads.");
//           } catch (err) {
//             return res.status(500).json({
//               success: false,
//               message: "File move failed",
//               error: err.message,
//             });
//           }
//         }

//         // Create form data matching original working structure
//         const form = new FormData();
//         form.append("altText", parsed.altText); // <- not inside "content"
//         form.append("image", fs.createReadStream(finalPath));

//         try {
//           await axios.post(`http://localhost:3663/${endpoint_url}`, form, {
//             headers: form.getHeaders(),
//           });
//           res
//             .status(200)
//             .json({ success: true, message: "Forwarded successfully" });
//         } catch (error) {
//           console.error("Error while forwarding the request:", error.message);
//           return res.status(500).json({
//             success: false,
//             message: "Error forwarding the approved request",
//             error: error.message,
//           });
//         }
//       } else if (method === "DELETE") {
//         await axios.delete(
//           `http://localhost:3663/${endpoint_url}/${content_id}`
//         );
//       } else {
//         return res
//           .status(400)
//           .json({ success: false, message: "Invalid method" });
//       }

//       const updateQuery = `UPDATE approval_requests SET status = ? WHERE id = ?`;
//       await db.promise().query(updateQuery, ["Approved", id]);

//       return res
//         .status(200)
//         .json({ success: true, message: "Request approved successfully" });
//     } catch (error) {
//       console.error("Error while forwarding the request:", error.message);
//       return res.status(500).json({
//         success: false,
//         message: "Error forwarding approved request",
//         error: error.message,
//       });
//     }
//   } catch (error) {
//     console.error("Error approving request:", error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to approve request",
//       error: error.message,
//     });
//   }
// };

export const approveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const slaveId = req.body.slaveId;

    // Verify master-slave relationship
    const [verifyMaster] = await db
      .promise()
      .query(`SELECT masterId FROM role_hierarchy WHERE slaveId = ?`, [
        slaveId,
      ]);

    if (verifyMaster.length === 0) {
      return res
        .status(403)
        .json({ success: false, message: "Master not authorized" });
    }

    // Fetch request details
    const [fetchDetails] = await db
      .promise()
      .query(`SELECT * FROM approval_requests WHERE id = ?`, [id]);

    const requestData = fetchDetails[0];
    if (!requestData) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }

    const { method, endpoint_url, content_id, proposed_content } = requestData;

    // Forward based on method type
    try {
      const url = `http://localhost:3663/${endpoint_url}`;

      if (method === "PUT") {
        await axios.put(`${url}/${content_id}`, {
          content: proposed_content,
        });
      } else if (method === "POST") {
        await axios.post(url, {
          content: proposed_content,
        });
      } else if (method === "DELETE") {
        await axios.delete(`${url}/${content_id}`);
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Invalid method" });
      }

      // Update status to Approved
      await db
        .promise()
        .query(`UPDATE approval_requests SET status = ? WHERE id = ?`, [
          "Approved",
          id,
        ]);

      return res.status(200).json({
        success: true,
        message: "Request approved and forwarded successfully",
      });
    } catch (forwardErr) {
      console.error("Error while forwarding the request:", forwardErr.message);
      return res.status(500).json({
        success: false,
        message: "Error forwarding the approved request",
        error: forwardErr.message,
      });
    }
  } catch (err) {
    console.error("Error approving request:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to approve request",
      error: err.message,
    });
  }
};

// Reject request
export const rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const slaveId = req.body.slaveId;

    // Verify master authorization
    const [verifyMaster] = await db
      .promise()
      .query(`SELECT masterId FROM role_hierarchy WHERE slaveId = ?`, [
        slaveId,
      ]);

    if (verifyMaster.length === 0) {
      return res.status(403).json({
        success: false,
        message: "Master not authorized",
      });
    }

    // Fetch request details
    const [fetchDetails] = await db
      .promise()
      .query(`SELECT proposed_content FROM approval_requests WHERE id = ?`, [
        id,
      ]);

    const requestData = fetchDetails[0];
    if (!requestData) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    // Attempt to delete the file from /uploads/pending if it exists
    try {
      const { imageFilename } = JSON.parse(
        requestData.proposed_content || "{}"
      );
      if (imageFilename) {
        const pendingPath = path.join("public/uploads/pending", imageFilename);
        if (fs.existsSync(pendingPath)) {
          fs.unlinkSync(pendingPath);
        }
      }
    } catch (parseErr) {
      console.warn(
        "Could not parse proposed_content or delete file:",
        parseErr.message
      );
    }

    // Update the request status to Rejected
    await db
      .promise()
      .query(`UPDATE approval_requests SET status = ? WHERE id = ?`, [
        "Rejected",
        id,
      ]);

    res.status(200).json({
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

// export const rejectRequest = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const slaveId = req.body.slaveId;

//     // Check for master verification
//     const [verifyMaster] = await db
//       .promise()
//       .query(`SELECT masterId FROM role_hierarchy WHERE slaveId = ?`, [
//         slaveId,
//       ]);

//     if (verifyMaster.length > 0) {
//       // Update the request status
//       const updateQuery = `UPDATE approval_requests SET status = ? WHERE id = ?`;
//       await db.promise().query(updateQuery, ["Rejected", id]);
//     } else {
//       return res.status(500).json({
//         success: false,
//         message: "Master not authorized",
//       });
//     }
//   } catch (error) {
//     console.error("Error Rejecting request:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to Reject request",
//       error: error.message,
//     });
//   }
// };

// // Request revision
// export const requestRevision = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { comments } = req.body;
//     const reviewerId = req.session.user.id;
//     const reviewerRole = req.session.user.role;

//     if (!comments) {
//       return res.status(400).json({
//         success: false,
//         message: "Comments are required for revision request",
//       });
//     }

//     const request = await ApprovalModel.getApprovalRequestById(id);
//     if (!request) {
//       return res.status(404).json({
//         success: false,
//         message: "Approval request not found",
//       });
//     }

//     await ApprovalModel.requestRevision(id, reviewerId, reviewerRole, comments);

//     res.json({
//       success: true,
//       message: "Revision requested successfully",
//     });
//   } catch (error) {
//     console.error("Error requesting revision:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to request revision",
//       error: error.message,
//     });
//   }
// };

// Get approval requests for current user
// export const getMyApprovalRequests = async (req, res) => {
//   try {
//     const { status } = req.query;
//     const userId = req.session.user.id;
//     const userRole = req.session.user.role;

//     const department = ApprovalModel.getDepartmentByUserRole(userRole);
//     const requests = await ApprovalModel.getApprovalRequestsByRole(
//       userRole,
//       userId,
//       status,
//       department
//     );

//     res.json({
//       success: true,
//       requests,
//     });
//   } catch (error) {
//     console.error("Error getting approval requests:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to get approval requests",
//       error: error.message,
//     });
//   }
// };

// Get specific approval request details
// export const getApprovalRequest = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userRole = req.session.user.role;
//     const userId = req.session.user.id;

//     const request = await ApprovalModel.getApprovalRequestById(id);
//     if (!request) {
//       return res.status(404).json({
//         success: false,
//         message: "Approval request not found",
//       });
//     }

//     // Check if user has permission to view this request
//     const department = ApprovalModel.getDepartmentByUserRole(userRole);
//     if (
//       userRole !== "superAdmin" &&
//       userRole !== "principal" &&
//       request.department !== department &&
//       request.requested_by !== userId
//     ) {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied",
//       });
//     }

//     // Get approval history
//     const history = await ApprovalModel.getApprovalHistory(id);

//     res.json({
//       success: true,
//       request,
//       history,
//     });
//   } catch (error) {
//     console.error("Error getting approval request:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to get approval request",
//       error: error.message,
//     });
//   }
// };

// // Get dashboard statistics
// export const getDashboardStats = async (req, res) => {
//   try {
//     const userRole = req.session.user.role;
//     const department = ApprovalModel.getDepartmentByUserRole(userRole);

//     const pendingCount = await ApprovalModel.getPendingApprovalsCount(
//       userRole,
//       department
//     );

//     // Get additional stats for different roles
//     let stats = {
//       pendingApprovals: pendingCount.count,
//     };

//     if (userRole === "superAdmin" || userRole === "principal") {
//       // Get all requests by status for admin/principal view
//       const allRequests = await ApprovalModel.getApprovalRequestsByRole(
//         userRole,
//         null
//       );
//       stats.totalRequests = allRequests.length;
//       stats.approvedRequests = allRequests.filter(
//         (r) => r.status === "approved"
//       ).length;
//       stats.rejectedRequests = allRequests.filter(
//         (r) => r.status === "rejected"
//       ).length;
//       stats.needsRevision = allRequests.filter(
//         (r) => r.status === "needs_revision"
//       ).length;
//     }

//     res.json({
//       success: true,
//       stats,
//     });
//   } catch (error) {
//     console.error("Error getting dashboard stats:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to get dashboard stats",
//       error: error.message,
//     });
//   }
// };

// // Get approval history for a request
// export const getApprovalHistory = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const history = await ApprovalModel.getApprovalHistory(id);

//     res.json({
//       success: true,
//       history,
//     });
//   } catch (error) {
//     console.error("Error getting approval history:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to get approval history",
//       error: error.message,
//     });
//   }
// };

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
