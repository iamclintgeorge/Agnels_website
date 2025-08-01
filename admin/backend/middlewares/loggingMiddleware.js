import { logAdminActivity } from "../services/logger.js";

// Helper function to determine action type from HTTP method and endpoint
const determineAction = (method, endpoint, statusCode) => {
  if (statusCode >= 400) return "ERROR";

  switch (method.toLowerCase()) {
    case "post":
      return "CREATE";
    case "put":
    case "patch":
      return "UPDATE";
    case "delete":
      return "DELETE";
    case "get":
      return "READ";
    default:
      return "UNKNOWN";
  }
};

// Helper function to determine resource from endpoint
const determineResource = (endpoint) => {
  const path = endpoint.toLowerCase();

  // Map endpoints to resources
  if (path.includes("/hod-desk")) return "hod_desk";
  if (path.includes("/placement")) return "placement";
  if (path.includes("/announcement")) return "announcements";
  if (path.includes("/research")) return "research";
  if (path.includes("/nirf")) return "nirf";
  if (path.includes("/nba") || path.includes("/naac")) return "nba_naac";
  if (path.includes("/iic")) return "iic";
  if (path.includes("/academics")) return "academics";
  if (path.includes("/about")) return "about_us";
  if (path.includes("/department")) return "department";
  if (path.includes("/human-resource")) return "human_resources";
  if (path.includes("/content-approval")) return "content_approval";
  if (path.includes("/user")) return "users";
  if (path.includes("/home")) return "homepage";
  if (path.includes("/activity")) return "activities";
  if (path.includes("/pdf")) return "documents";

  // Extract resource from endpoint if no specific mapping found
  const segments = path
    .split("/")
    .filter((segment) => segment && segment !== "api");
  return segments[0] || "unknown";
};

// Helper function to extract resource ID from endpoint
const extractResourceId = (endpoint, method) => {
  // Skip ID extraction for GET requests to list endpoints
  if (method.toLowerCase() === "get" && !endpoint.match(/\/\d+(?:\/|$)/)) {
    return null;
  }

  // Extract numeric ID from URL
  const idMatch = endpoint.match(/\/(\d+)(?:\/|$)/);
  return idMatch ? idMatch[1] : null;
};

// Helper function to get client IP address
const getClientIP = (req) => {
  return (
    req.headers["x-forwarded-for"] ||
    req.headers["x-real-ip"] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.ip ||
    "unknown"
  );
};

// Helper function to sanitize request data (remove sensitive information)
const sanitizeRequestData = (data) => {
  if (!data || typeof data !== "object") return data;

  const sanitized = { ...data };
  const sensitiveFields = [
    "password",
    "token",
    "secret",
    "key",
    "authorization",
  ];

  Object.keys(sanitized).forEach((key) => {
    if (sensitiveFields.some((field) => key.toLowerCase().includes(field))) {
      sanitized[key] = "[REDACTED]";
    }
  });

  return sanitized;
};

// Helper function to generate activity description
const generateDescription = (action, resource, resourceId, user) => {
  const resourceName = resource.replace("_", " ");
  const userName = user.username || "Unknown User";

  switch (action) {
    case "CREATE":
      return `${userName} created new ${resourceName}${
        resourceId ? ` with ID ${resourceId}` : ""
      }`;
    case "UPDATE":
      return `${userName} updated ${resourceName}${
        resourceId ? ` with ID ${resourceId}` : ""
      }`;
    case "DELETE":
      return `${userName} deleted ${resourceName}${
        resourceId ? ` with ID ${resourceId}` : ""
      }`;
    case "READ":
      return `${userName} accessed ${resourceName}${
        resourceId ? ` with ID ${resourceId}` : ""
      }`;
    default:
      return `${userName} performed ${action} on ${resourceName}`;
  }
};

// Main logging middleware
export const adminActivityLogger = (req, res, next) => {
  // Skip logging for certain endpoints
  const skipEndpoints = [
    "/api/auth/check",
    "/api/logs", // Prevent infinite loop
    "/health",
    "/favicon.ico",
  ];

  if (skipEndpoints.some((endpoint) => req.path.includes(endpoint))) {
    return next();
  }

  // Skip if user is not authenticated (handled by authMiddleware)
  if (!req.user) {
    return next();
  }

  // Store original response methods
  const originalSend = res.send;
  const originalJson = res.json;

  // Capture response data
  let responseData = null;
  let responseStatus = null;

  // Override res.send
  res.send = function (body) {
    responseData = body;
    responseStatus = res.statusCode;
    return originalSend.call(this, body);
  };

  // Override res.json
  res.json = function (obj) {
    responseData = obj;
    responseStatus = res.statusCode;
    return originalJson.call(this, obj);
  };

  // Log the activity after response is sent
  res.on("finish", async () => {
    try {
      // Only log if response was sent (not for aborted requests)
      if (responseStatus === null) return;

      const action = determineAction(req.method, req.path, responseStatus);
      const resource = determineResource(req.path);
      const resourceId = extractResourceId(req.path, req.method);

      const activityData = {
        userId: req.user.id,
        username: req.user.username,
        userRole: req.user.role,
        action: action,
        resource: resource,
        resourceId: resourceId,
        method: req.method,
        endpoint: req.originalUrl || req.url,
        ipAddress: getClientIP(req),
        userAgent: req.headers["user-agent"],
        requestData: sanitizeRequestData(req.body),
        responseStatus: responseStatus,
        description: generateDescription(
          action,
          resource,
          resourceId,
          req.user
        ),
        sessionId: req.sessionID,
      };

      // For UPDATE and DELETE operations, try to capture old data
      if (action === "UPDATE" || action === "DELETE") {
        // This would need to be implemented per resource type
        // For now, we'll leave it null and implement per controller if needed
        activityData.oldData = null;
      }

      // For CREATE operations, capture new data from response
      if (
        action === "CREATE" &&
        responseData &&
        typeof responseData === "object"
      ) {
        activityData.newData = responseData;
      }

      // Log the activity
      await logAdminActivity(activityData);
    } catch (error) {
      console.error("Error in admin activity logger:", error);
      // Don't throw error to avoid affecting the main request
    }
  });

  next();
};

// Middleware specifically for tracking data changes (to be used in controllers)
export const trackDataChange = (oldData) => {
  return (req, res, next) => {
    req.oldData = oldData;
    next();
  };
};

// Helper function to manually log custom activities (for use in controllers)
export const logCustomActivity = async (req, customData) => {
  if (!req.user) return;

  const baseData = {
    userId: req.user.id,
    username: req.user.username,
    userRole: req.user.role,
    method: req.method,
    endpoint: req.originalUrl || req.url,
    ipAddress: getClientIP(req),
    userAgent: req.headers["user-agent"],
    sessionId: req.sessionID,
    ...customData,
  };

  await logAdminActivity(baseData);
};

export default adminActivityLogger;
