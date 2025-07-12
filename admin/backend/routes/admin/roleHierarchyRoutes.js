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
      const [rows] = await db.promise().query("SELECT * FROM role_hierarchy");
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
    const { master, slave } = req.body;
    console.log("/role-hierarchy");
    console.log(master, slave);
    if (!master || !slave) {
      return res
        .status(400)
        .json({ message: "Master and Slave are required." });
    }
    try {
      const [result] = await db
        .promise()
        .query("INSERT INTO role_hierarchy (masterId, slaveId) VALUES (?, ?)", [
          master,
          slave,
        ]);
      res.status(201).json({
        message: "Role hierarchy created successfully",
        status: "success",
        data: result,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Database error", error: err });
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
