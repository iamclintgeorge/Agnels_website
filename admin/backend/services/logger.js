import winston from "winston";
import { createWriteStream } from "fs";
import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import db from "../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure logs directory exists
const logsDir = path.join(__dirname, "../logs");
try {
  await mkdir(logsDir, { recursive: true });
} catch (error) {
  // Directory already exists or other error
}

// Custom format for console and file logging
const customFormat = winston.format.combine(
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ level, message, timestamp, ...meta }) => {
    let metaStr = "";
    if (Object.keys(meta).length > 0) {
      metaStr = " " + JSON.stringify(meta);
    }
    return `${timestamp} [${level.toUpperCase()}]: ${message}${metaStr}`;
  })
);

// Create Winston logger
const logger = winston.createLogger({
  level: "info",
  format: customFormat,
  transports: [
    // File transport for general logs
    new winston.transports.File({
      filename: path.join(logsDir, "error.log"),
      level: "error",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: path.join(logsDir, "combined.log"),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Console transport for development
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), customFormat),
    }),
  ],
});

// Function to log admin activities to MySQL database
export const logAdminActivity = async (activityData) => {
  try {
    const {
      userId,
      username,
      userRole,
      action,
      resource,
      resourceId = null,
      method,
      endpoint,
      ipAddress = null,
      userAgent = null,
      requestData = null,
      responseStatus = null,
      oldData = null,
      newData = null,
      description = null,
      sessionId = null,
    } = activityData;

    const query = `
      INSERT INTO admin_activity_logs (
        user_id, username, user_role, action, resource, resource_id,
        method, endpoint, ip_address, user_agent, request_data,
        response_status, old_data, new_data, description, session_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      userId,
      username,
      userRole,
      action,
      resource,
      resourceId,
      method,
      endpoint,
      ipAddress,
      userAgent,
      requestData ? JSON.stringify(requestData) : null,
      responseStatus,
      oldData ? JSON.stringify(oldData) : null,
      newData ? JSON.stringify(newData) : null,
      description,
      sessionId,
    ];

    await new Promise((resolve, reject) => {
      db.promise().query(query, values, (error, results) => {
        if (error) {
          logger.error("Failed to log admin activity to database:", error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    // Also log to file for backup
    logger.info("Admin Activity", {
      userId,
      username,
      userRole,
      action,
      resource,
      resourceId,
      method,
      endpoint,
      description,
    });
  } catch (error) {
    logger.error("Error logging admin activity:", error);
  }
};

// Function to get activity logs with pagination and filtering
export const getActivityLogs = async (filters = {}) => {
  try {
    const {
      userId,
      username,
      userRole,
      action,
      resource,
      startDate,
      endDate,
      limit = 50,
      offset = 0,
    } = filters;

    let query = "SELECT * FROM admin_activity_logs WHERE 1=1";
    const values = [];

    if (userId) {
      query += " AND user_id = ?";
      values.push(userId);
    }

    if (username) {
      query += " AND username LIKE ?";
      values.push(`%${username}%`);
    }

    if (userRole) {
      query += " AND user_role = ?";
      values.push(userRole);
    }

    if (action) {
      query += " AND action = ?";
      values.push(action);
    }

    if (resource) {
      query += " AND resource = ?";
      values.push(resource);
    }

    if (startDate) {
      query += " AND timestamp >= ?";
      values.push(startDate);
    }

    if (endDate) {
      query += " AND timestamp <= ?";
      values.push(endDate);
    }

    query += " ORDER BY timestamp DESC LIMIT ? OFFSET ?";
    values.push(parseInt(limit), parseInt(offset));

    return new Promise((resolve, reject) => {
      db.promise().query(query, values, (error, results) => {
        if (error) {
          logger.error("Failed to fetch activity logs:", error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  } catch (error) {
    logger.error("Error fetching activity logs:", error);
    throw error;
  }
};

// Function to get activity logs statistics
export const getActivityStats = async (filters = {}) => {
  try {
    const {
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // Last 30 days
      endDate = new Date().toISOString().split("T")[0],
    } = filters;

    const queries = {
      totalActivities: `
        SELECT COUNT(*) as count FROM admin_activity_logs 
        WHERE timestamp BETWEEN ? AND ?
      `,
      activitiesByAction: `
        SELECT action, COUNT(*) as count FROM admin_activity_logs 
        WHERE timestamp BETWEEN ? AND ?
        GROUP BY action ORDER BY count DESC
      `,
      activitiesByUser: `
        SELECT username, user_role, COUNT(*) as count FROM admin_activity_logs 
        WHERE timestamp BETWEEN ? AND ?
        GROUP BY username, user_role ORDER BY count DESC LIMIT 10
      `,
      activitiesByResource: `
        SELECT resource, COUNT(*) as count FROM admin_activity_logs 
        WHERE timestamp BETWEEN ? AND ?
        GROUP BY resource ORDER BY count DESC
      `,
    };

    const results = {};

    for (const [key, query] of Object.entries(queries)) {
      results[key] = await new Promise((resolve, reject) => {
        db.promise().query(query, [startDate, endDate], (error, result) => {
          if (error) {
            logger.error(`Failed to fetch ${key}:`, error);
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    }

    return results;
  } catch (error) {
    logger.error("Error fetching activity statistics:", error);
    throw error;
  }
};

export default logger;
