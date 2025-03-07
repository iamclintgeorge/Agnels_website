import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import db from "../config/db.js"; // Updated to use your existing db config
import fs from "fs";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads/recruiters/"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Get overview
router.get("/overview", (req, res) => {
  const sql = "SELECT * FROM placement_overview LIMIT 1";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ message: "Failed to fetch overview", error: err.message });
    }
    res.json(result[0] || {});
  });
});

// Update overview
router.put("/overview", (req, res) => {
  const { description, vision, mission } = req.body;
  const sql = `INSERT INTO placement_overview (description, vision, mission) 
                 VALUES (?, ?, ?)
                 ON DUPLICATE KEY UPDATE 
                 description = VALUES(description),
                 vision = VALUES(vision),
                 mission = VALUES(mission)`;

  db.query(sql, [description, vision, mission], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ message: "Failed to update overview", error: err.message });
    }
    res.json({ message: "Overview updated successfully" });
  });
});

// Get statistics
router.get("/statistics", (req, res) => {
  const sql = "SELECT * FROM placement_statistics ORDER BY academic_year DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ message: "Failed to fetch statistics", error: err.message });
    }
    res.json(result);
  });
});

// Add statistics
router.post("/statistics", (req, res) => {
  const {
    academic_year,
    total_placements,
    average_package,
    highest_package,
    companies_visited,
  } = req.body;
  console.log("Received statistics:", req.body); // Debug log

  const sql = `INSERT INTO placement_statistics 
                 (academic_year, total_placements, average_package, highest_package, companies_visited) 
                 VALUES (?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [
      academic_year,
      total_placements,
      average_package,
      highest_package,
      companies_visited,
    ],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ message: "Failed to add statistics", error: err.message });
      }
      console.log("Statistics added:", result); // Debug log
      res.json({
        message: "Statistics added successfully",
        id: result.insertId,
      });
    }
  );
});

// Delete statistics
router.delete("/statistics/:id", (req, res) => {
  console.log("Deleting statistics with ID:", req.params.id); // Debug log

  const sql = "DELETE FROM placement_statistics WHERE id = ?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ message: "Failed to delete statistics", error: err.message });
    }
    console.log("Delete result:", result); // Debug log
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Statistics not found" });
    }
    res.json({ message: "Statistics deleted successfully" });
  });
});

// Update statistics
router.put("/statistics/:id", (req, res) => {
  const {
    academic_year,
    total_placements,
    average_package,
    highest_package,
    companies_visited,
  } = req.body;
  const sql = `UPDATE placement_statistics 
                 SET academic_year = ?, 
                     total_placements = ?, 
                     average_package = ?, 
                     highest_package = ?, 
                     companies_visited = ?
                 WHERE id = ?`;

  db.query(
    sql,
    [
      academic_year,
      total_placements,
      average_package,
      highest_package,
      companies_visited,
      req.params.id,
    ],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ message: "Failed to update statistics", error: err.message });
      }
      res.json({ message: "Statistics updated successfully" });
    }
  );
});

// Get recruiters
router.get("/recruiters", (req, res) => {
  const sql = "SELECT * FROM placement_recruiters ORDER BY created_at DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ message: "Failed to fetch recruiters", error: err.message });
    }
    res.json(result);
  });
});

// Add recruiter
router.post("/recruiters", upload.single("logo"), (req, res) => {
  console.log("Received recruiter data:", req.body); // Debug log
  console.log("Received file:", req.file); // Debug log

  const { company_name, description } = req.body;
  const logo_path = req.file
    ? `/uploads/recruiters/${req.file.filename}`
    : null;

  const sql = `INSERT INTO placement_recruiters (company_name, logo_path, description) 
                 VALUES (?, ?, ?)`;

  db.query(sql, [company_name, logo_path, description], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ message: "Failed to add recruiter", error: err.message });
    }
    console.log("Recruiter added:", result); // Debug log
    res.json({
      message: "Recruiter added successfully",
      id: result.insertId,
      logo_path: logo_path,
    });
  });
});

// Delete recruiter
router.delete("/recruiters/:id", (req, res) => {
  console.log("Deleting recruiter with ID:", req.params.id); // Debug log

  // First get the logo path
  const selectSql = "SELECT logo_path FROM placement_recruiters WHERE id = ?";
  db.query(selectSql, [req.params.id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ message: "Failed to delete recruiter", error: err.message });
    }

    const deleteSql = "DELETE FROM placement_recruiters WHERE id = ?";
    db.query(deleteSql, [req.params.id], (deleteErr, deleteResult) => {
      if (deleteErr) {
        console.error("Database error:", deleteErr);
        return res.status(500).json({
          message: "Failed to delete recruiter",
          error: deleteErr.message,
        });
      }

      // If there was a logo and the delete was successful, delete the file
      if (result[0]?.logo_path && deleteResult.affectedRows > 0) {
        const filePath = path.join(__dirname, "../public", result[0].logo_path);
        try {
          fs.unlinkSync(filePath);
        } catch (error) {
          console.error("Error deleting file:", error);
          // Continue even if file deletion fails
        }
      }

      if (deleteResult.affectedRows === 0) {
        return res.status(404).json({ message: "Recruiter not found" });
      }

      res.json({ message: "Recruiter deleted successfully" });
    });
  });
});

// Update recruiter
router.put("/recruiters/:id", upload.single("logo"), (req, res) => {
  const { company_name, description, remove_logo } = req.body;
  let updateFields = { company_name, description };

  // Get the current logo path
  db.query(
    "SELECT logo_path FROM placement_recruiters WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ message: "Failed to update recruiter", error: err.message });
      }

      const currentLogoPath = result[0]?.logo_path;

      // Handle logo update
      if (req.file) {
        // New logo uploaded
        updateFields.logo_path = `/uploads/recruiters/${req.file.filename}`;

        // Delete old logo if exists
        if (currentLogoPath) {
          const oldFilePath = path.join(
            __dirname,
            "../public",
            currentLogoPath
          );
          try {
            fs.unlinkSync(oldFilePath);
          } catch (error) {
            console.error("Error deleting old file:", error);
          }
        }
      } else if (remove_logo === "true" && currentLogoPath) {
        // Remove logo if requested
        updateFields.logo_path = null;
        const oldFilePath = path.join(__dirname, "../public", currentLogoPath);
        try {
          fs.unlinkSync(oldFilePath);
        } catch (error) {
          console.error("Error deleting file:", error);
        }
      }

      // Update the database
      const sql = `UPDATE placement_recruiters 
                    SET ? 
                    WHERE id = ?`;

      db.query(
        sql,
        [updateFields, req.params.id],
        (updateErr, updateResult) => {
          if (updateErr) {
            console.error("Database error:", updateErr);
            return res.status(500).json({
              message: "Failed to update recruiter",
              error: updateErr.message,
            });
          }
          res.json({
            message: "Recruiter updated successfully",
            logo_path: updateFields.logo_path,
          });
        }
      );
    }
  );
});

export default router;
