import axios from "axios";
import db from "../../config/db.js";
import fs from "fs";
import path from "path";
import FormData from "form-data";
import { fileURLToPath } from "url";
import logger from "../../services/logger.js";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// import * as ApprovalModel from "../../models/website/contentApprovalModel.js";
import { createApprovalRequestModal } from "../../models/website/contentApprovalModel.js";

// Create approval request
export const createApprovalRequest = async (req, res) => {
  const body = req.body;
  const method = body.method;
  const section = body.section;
  const title = body.title;
  const changeSummary = body.changeSummary || body.change_summary;
  const currentContent = body.currentContent || body.current_content;
  const file = req.file;
  const uploadedFilename = file?.filename || null;
  let proposedContent = body.proposedContent || body.proposed_content;
  const endpoint = body.endpoint_url;
  const id = body.id;
  const username = req.session.user.userName;
  const client_ip =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const req_userID = req.session.user.id;
  const requesterRole = req.session.user.role;
  console.log("client_ip", client_ip);
  try {
    if (uploadedFilename) {
      const parsed = JSON.parse(proposedContent || "{}");
      parsed.imageFilename = uploadedFilename;
      proposedContent = JSON.stringify(parsed);
    }

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
      username,
      client_ip,
    });

    logger.info("Created Approval Request", {
      id: uuidv4(),
      title: `${title}`,
      service: `${section}`,
      description: `${username} Made a Content Approval Request for ${title}`,
      level: "INFO",
      created_by: `${username}`,
      source_ip: `${client_ip}`,
      created_on: new Date().toISOString(),
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
    logger.warn("Error creating approval request", {
      id: uuidv4(),
      title: `Error creating approval request`,
      service: `${section}`,
      description: `There was an Error when ${username} tried to make a Content Approval Request for ${title}. Error: ${error}`,
      level: "WARN",
      created_by: `${username}`,
      source_ip: `${client_ip}`,
      created_on: new Date().toISOString(),
    });
  }
};

// Get pending approvals for current user to review
export const getPendingApprovals = async (req, res) => {
  try {
    const userrole = req.session.user.role;

    //Fetch masterId from the `role` table using userrole
    const [[{ id: masterId }]] = await db
      .promise()
      .query("SELECT id FROM roles WHERE name = ?", userrole);

    console.log("Master ID:", masterId);
    console.log("User info", req.session.user);

    // Get all slave roles for this master user
    const query = `SELECT slaveId, userId FROM role_hierarchy WHERE masterId = ?`;
    const [slaveRows] = await db.promise().query(query, [masterId]);
    const slaveIds = slaveRows.map((row) => row.slaveId || row.userId);

    if (slaveIds.length === 0) {
      return res.json({ success: true, requests: [] });
    }

    console.log("Slave ID:", slaveIds);
    // Get all pending requests from these slaves
    const [requests] = await db
      .promise()
      .query(
        `SELECT * FROM approval_requests WHERE req_roleID IN (?) ORDER BY id DESC`,
        [slaveIds]
      );

    // console.log(requests);
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

export const approveRequest = async (req, res) => {
  let requestData;
  try {
    const { id } = req.params;
    const slaveId = req.body.slaveId;

    // Verify master-slave relationship
    // const [verifyMaster] = await db
    //   .promise()
    //   .query(`SELECT masterId FROM role_hierarchy WHERE slaveId = ?`, [
    //     slaveId,
    //   ]);

    // if (verifyMaster.length === 0) {
    //   return res
    //     .status(403)
    //     .json({ success: false, message: "Master not authorized" });
    // }

    // Fetch request details
    const [fetchDetails] = await db
      .promise()
      .query(`SELECT * FROM approval_requests WHERE id = ?`, [id]);

    requestData = fetchDetails[0];
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

      logger.info("Content Request Approved", {
        id: uuidv4(),
        title: `Content Request Approved`,
        service: `${requestData.section}`,
        description: `${requestData.req_username}'s Content Approval Request was Approved for ${requestData.title}`,
        level: "INFO",
        created_by: `${requestData.req_username}`,
        source_ip: `${requestData.req_userIP}`,
        created_on: new Date().toISOString(),
      });

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
    logger.warn("Error Approving Request", {
      id: uuidv4(),
      title: `Error Approving Request`,
      service: `${requestData.section}`,
      description: `There was an Error while Rejecting Content Approval Request for ${requestData.title}. Error: ${error}`,
      level: "WARN",
      created_by: `${requestData.req_username}`,
      source_ip: `${requestData.req_userIP}`,
      created_on: new Date().toISOString(),
    });
    return res.status(500).json({
      success: false,
      message: "Failed to approve request",
      error: err.message,
    });
  }
};

// Reject request
export const rejectRequest = async (req, res) => {
  let allData;
  try {
    const { id } = req.params;
    const slaveId = req.body.slaveId;

    /* 
      MasterId Verification Logic Needs to be FIXED.
      Current Problem:
      - The Frontend API sends the roleId
      - Now, userId ought to be required when considering standalone faculty member rather than allowing the entire "teach_staff" role to have the permission to approve.
      - Problem is that by what means can the userId be separated considering that certain positions such as "principal" etc must not require userId, rather roleId should be sufficient. Thus for current, there is no verification as such, only authorization here is the generic backend role authorization.
      - The comment is understandible vague and thus contact Clint George for further discussion
    */

    // Verify master authorization
    // const [verifyMaster] = await db
    //   .promise()
    //   .query(`SELECT masterId FROM role_hierarchy WHERE slaveId = ?`, [
    //     slaveId,
    //   ]);

    // if (verifyMaster.length === 0) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Master not authorized",
    //   });
    // }

    // Fetch request details
    const [fetchDetails] = await db
      .promise()
      .query(`SELECT * FROM approval_requests WHERE id = ?`, [id]);

    allData = fetchDetails[0];
    console.log("allData", allData);
    const requestData = fetchDetails[0].proposed_content
      ? fetchDetails[0].proposed_content
      : fetchDetails[0].current_content;
    if (!requestData) {
      return res.status(404).json({
        success: false,
        message: "requestData not found",
      });
    }

    // Attempt to delete the file from /cdn/pending if it exists
    try {
      const { imageFilename } = JSON.parse(requestData || "{}");
      console.log("imageFilename", imageFilename);
      console.log("requestData", requestData);
      if (imageFilename) {
        const pendingPath = path.join("public/cdn/pending", imageFilename);
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

    logger.info("Content Request Rejected", {
      id: uuidv4(),
      title: `Content Request Rejected`,
      service: `${allData.section}`,
      description: `${allData.req_username}'s Content Approval Request was Rejected for ${allData.title}`,
      level: "INFO",
      created_by: `${allData.req_username}`,
      source_ip: `${allData.req_userIP}`,
      created_on: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error rejecting request:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reject request",
      error: error.message,
    });
    logger.warn("Error Rejected Request", {
      id: uuidv4(),
      title: `Error Rejected Request`,
      service: `${allData.section}`,
      description: `There was an Error while Rejecting Content Approval Request for ${allData.title}. Error: ${error}`,
      level: "WARN",
      created_by: `${allData.req_username}`,
      source_ip: `${allData.req_userIP}`,
      created_on: new Date().toISOString(),
    });
  }
};

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
