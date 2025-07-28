import express from "express";
import db from "../../config/db.js";
import {
  authMiddleware,
  checkPermission,
} from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Fetch all master-slave role relationships
router.get(
  "/fetchmaster-slave",
  authMiddleware,
  checkPermission("manage_users"),
  async (req, res) => {
    try {
      const query = `
  SELECT 
    rh.masterId,
    rh.slaveId,
    rh.userId,
    r1.displayName AS masterName,
    r2.displayName AS slaveName,
    f.name AS facultyName
  FROM role_hierarchy rh
  LEFT JOIN roles r1 ON rh.masterId = r1.id
  LEFT JOIN roles r2 ON rh.slaveId = r2.id
  LEFT JOIN faculties f ON rh.userId = f.id
`;

      const [rows] = await db.promise().query(query);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ message: "Database error", error: err });
    }
  }
);

// Create a new master-slave relationship
router.post(
  "/role-hierarchy",
  authMiddleware,
  checkPermission("manage_users"),
  async (req, res) => {
    const { master, slaves = [], users = [] } = req.body;
    console.log("/role-hierarchy");
    console.log("Master:", master, "Slaves:", slaves, "Users:", users);

    if (!master || (!Array.isArray(slaves) && !Array.isArray(users))) {
      return res.status(400).json({
        message: "Master and at least one Slave or User is required.",
      });
    }

    if (slaves.length === 0 && users.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide at least one slaveId or userId." });
    }

    try {
      const queries = [];
      const slaveValues = slaves.map((slaveId) => [master, slaveId, null]);
      const userValues = users.map((userId) => [master, null, userId]);

      const allValues = [...slaveValues, ...userValues];

      if (allValues.length > 0) {
        const [result] = await db
          .promise()
          .query(
            "INSERT INTO role_hierarchy (masterId, slaveId, userId) VALUES ?",
            [allValues]
          );

        return res.status(201).json({
          message: "Role hierarchy created successfully",
          status: "success",
          data: result,
        });
      } else {
        return res
          .status(400)
          .json({ message: "No valid slaveId or userId provided." });
      }
    } catch (err) {
      console.error("Error:", err);
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }
  }
);

// Delete a master-slave relationship
router.delete(
  "/role-hierarchy/:masterId/:slaveId",
  authMiddleware,
  checkPermission("manage_users"),
  async (req, res) => {
    const { masterId, slaveId } = req.params;
    try {
      const [result] = await db
        .promise()
        .query(
          "DELETE FROM role_hierarchy WHERE masterId = ? AND slaveId = ?",
          [masterId, slaveId]
        );
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Relationship not found" });
      }
      res.json({
        message: "Role hierarchy deleted successfully",
        status: "success",
      });
    } catch (err) {
      res.status(500).json({ message: "Database error", error: err });
    }
  }
);

// Fetch a specific master-slave relationship
router.get(
  "/role-hierarchy/:masterId/:slaveId",
  authMiddleware,
  checkPermission("manage_users"),
  async (req, res) => {
    const { masterId, slaveId } = req.params;
    try {
      const [rows] = await db
        .promise()
        .query(
          "SELECT * FROM role_hierarchy WHERE masterId = ? AND slaveId = ?",
          [masterId, slaveId]
        );
      if (rows.length === 0) {
        return res.status(404).json({ message: "Relationship not found" });
      }
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ message: "Database error", error: err });
    }
  }
);

export default router;
