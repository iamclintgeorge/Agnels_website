import { getActivityLogs, getActivityStats } from "../../services/logger.js";

// Get activity logs with filtering and pagination
export const getActivities = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      userId,
      username,
      userRole,
      action,
      resource,
      startDate,
      endDate,
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const filters = {
      userId: userId || null,
      username: username || null,
      userRole: userRole || null,
      action: action || null,
      resource: resource || null,
      startDate: startDate || null,
      endDate: endDate || null,
      limit: parseInt(limit),
      offset: offset,
    };

    // Remove null values
    Object.keys(filters).forEach((key) => {
      if (filters[key] === null || filters[key] === "") {
        delete filters[key];
      }
    });

    const activities = await getActivityLogs(filters);

    // Get total count for pagination
    const countFilters = { ...filters };
    delete countFilters.limit;
    delete countFilters.offset;
    const totalActivities = await getActivityLogs(countFilters);
    const totalCount = totalActivities.length;

    res.json({
      activities,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalCount,
        totalPages: Math.ceil(totalCount / parseInt(limit)),
        hasNext: offset + parseInt(limit) < totalCount,
        hasPrev: parseInt(page) > 1,
      },
      filters: req.query,
    });
  } catch (error) {
    console.error("Error fetching activity logs:", error);
    res.status(500).json({ error: "Failed to fetch activity logs" });
  }
};

// Get activity statistics
export const getStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const filters = {};
    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;

    const stats = await getActivityStats(filters);

    res.json({
      stats,
      dateRange: {
        startDate: startDate || "Last 30 days",
        endDate: endDate || "Today",
      },
    });
  } catch (error) {
    console.error("Error fetching activity statistics:", error);
    res.status(500).json({ error: "Failed to fetch activity statistics" });
  }
};

// Get activity log by ID
export const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;

    const activities = await getActivityLogs({ limit: 1, offset: 0 });
    const activity = activities.find((a) => a.id === parseInt(id));

    if (!activity) {
      return res.status(404).json({ error: "Activity log not found" });
    }

    res.json(activity);
  } catch (error) {
    console.error("Error fetching activity log:", error);
    res.status(500).json({ error: "Failed to fetch activity log" });
  }
};

// Get current user's activity logs
export const getMyActivities = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      action,
      resource,
      startDate,
      endDate,
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const filters = {
      userId: req.user.id,
      action: action || null,
      resource: resource || null,
      startDate: startDate || null,
      endDate: endDate || null,
      limit: parseInt(limit),
      offset: offset,
    };

    // Remove null values
    Object.keys(filters).forEach((key) => {
      if (filters[key] === null || filters[key] === "") {
        delete filters[key];
      }
    });

    const activities = await getActivityLogs(filters);

    res.json({
      activities,
      user: {
        id: req.user.id,
        username: req.user.username,
        role: req.user.role,
      },
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching user activities:", error);
    res.status(500).json({ error: "Failed to fetch your activities" });
  }
};

// Get activity logs for a specific resource
export const getResourceActivities = async (req, res) => {
  try {
    const { resource } = req.params;
    const { page = 1, limit = 30, action, startDate, endDate } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const filters = {
      resource: resource,
      action: action || null,
      startDate: startDate || null,
      endDate: endDate || null,
      limit: parseInt(limit),
      offset: offset,
    };

    // Remove null values
    Object.keys(filters).forEach((key) => {
      if (filters[key] === null || filters[key] === "") {
        delete filters[key];
      }
    });

    const activities = await getActivityLogs(filters);

    res.json({
      activities,
      resource,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching resource activities:", error);
    res.status(500).json({ error: "Failed to fetch resource activities" });
  }
};

// Get unique values for filter dropdowns
export const getFilterOptions = async (req, res) => {
  try {
    // Get all activities to extract unique values
    const allActivities = await getActivityLogs({ limit: 10000, offset: 0 });

    const filterOptions = {
      userRoles: [...new Set(allActivities.map((a) => a.user_role))].filter(
        Boolean
      ),
      actions: [...new Set(allActivities.map((a) => a.action))].filter(Boolean),
      resources: [...new Set(allActivities.map((a) => a.resource))].filter(
        Boolean
      ),
      users: [
        ...new Set(
          allActivities.map((a) => ({
            id: a.user_id,
            username: a.username,
            role: a.user_role,
          }))
        ),
      ].filter(Boolean),
    };

    res.json(filterOptions);
  } catch (error) {
    console.error("Error fetching filter options:", error);
    res.status(500).json({ error: "Failed to fetch filter options" });
  }
};

// Export activity logs to CSV format
export const exportActivities = async (req, res) => {
  try {
    const { userId, username, userRole, action, resource, startDate, endDate } =
      req.query;

    const filters = {
      userId: userId || null,
      username: username || null,
      userRole: userRole || null,
      action: action || null,
      resource: resource || null,
      startDate: startDate || null,
      endDate: endDate || null,
      limit: 10000, // Large limit for export
      offset: 0,
    };

    // Remove null values
    Object.keys(filters).forEach((key) => {
      if (filters[key] === null || filters[key] === "") {
        delete filters[key];
      }
    });

    const activities = await getActivityLogs(filters);

    // Convert to CSV
    const csvHeader = [
      "ID",
      "Timestamp",
      "Username",
      "User Role",
      "Action",
      "Resource",
      "Resource ID",
      "Method",
      "Endpoint",
      "IP Address",
      "Description",
    ].join(",");

    const csvRows = activities.map((activity) =>
      [
        activity.id,
        activity.timestamp,
        activity.username,
        activity.user_role,
        activity.action,
        activity.resource,
        activity.resource_id || "",
        activity.method,
        activity.endpoint,
        activity.ip_address || "",
        `"${activity.description || ""}"`,
      ].join(",")
    );

    const csv = [csvHeader, ...csvRows].join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="activity_logs_${
        new Date().toISOString().split("T")[0]
      }.csv"`
    );
    res.send(csv);
  } catch (error) {
    console.error("Error exporting activity logs:", error);
    res.status(500).json({ error: "Failed to export activity logs" });
  }
};
