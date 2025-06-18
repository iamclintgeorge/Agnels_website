// controllers/placementController.js
import * as PlacementModel from "../../models/website/placementModel.js";
import fs from "fs";
import path from "path";

// Get overview
export const getOverview = async (req, res) => {
  try {
    const overview = await PlacementModel.getOverview();
    res.json(overview);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Failed to fetch overview", error: err.message });
  }
};

// Update overview
export const updateOverview = async (req, res) => {
  const { description, vision, mission } = req.body;
  try {
    await PlacementModel.updateOverview(description, vision, mission);
    res.json({ message: "Overview updated successfully" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Failed to update overview", error: err.message });
  }
};

// Statistics actions (get, add, delete, update)
export const getStatistics = async (req, res) => {
  try {
    const statistics = await PlacementModel.getStatistics();
    res.json(statistics);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch statistics", error: err.message });
  }
};

export const addStatistics = async (req, res) => {
  const { academic_year, total_placements, average_package, highest_package, companies_visited } = req.body;
  try {
    const result = await PlacementModel.addStatistics(academic_year, total_placements, average_package, highest_package, companies_visited);
    res.json({ message: "Statistics added successfully", id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: "Failed to add statistics", error: err.message });
  }
};

export const deleteStatistics = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await PlacementModel.deleteStatistics(id);
    res.json({ message: "Statistics deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete statistics", error: err.message });
  }
};

export const updateStatistics = async (req, res) => {
  const { id } = req.params;
  const { academic_year, total_placements, average_package, highest_package, companies_visited } = req.body;
  try {
    await PlacementModel.updateStatistics(id, academic_year, total_placements, average_package, highest_package, companies_visited);
    res.json({ message: "Statistics updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update statistics", error: err.message });
  }
};

// Recruiters actions (get, add, delete, update)
export const getRecruiters = async (req, res) => {
  try {
    const recruiters = await PlacementModel.getRecruiters();
    res.json(recruiters);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch recruiters", error: err.message });
  }
};

export const addRecruiter = async (req, res) => {
  const { company_name, description } = req.body;
  const logo_path = req.file ? `/uploads/recruiters/${req.file.filename}` : null;
  try {
    const result = await PlacementModel.addRecruiter(company_name, logo_path, description);
    res.json({ message: "Recruiter added successfully", id: result.insertId, logo_path });
  } catch (err) {
    res.status(500).json({ message: "Failed to add recruiter", error: err.message });
  }
};

export const deleteRecruiter = async (req, res) => {
  const { id } = req.params;
  try {
    const { logo_path, deleteResult } = await PlacementModel.deleteRecruiter(id);
    if (logo_path) {
      const filePath = path.join(__dirname, "../public", logo_path);
      try {
        fs.unlinkSync(filePath);
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
    res.json({ message: "Recruiter deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete recruiter", error: err.message });
  }
};

export const updateRecruiter = async (req, res) => {
  const { id } = req.params;
  const { company_name, description, remove_logo } = req.body;
  const logo_path = req.file ? `/uploads/recruiters/${req.file.filename}` : null;
  try {
    await PlacementModel.updateRecruiter(id, company_name, description, logo_path);
    res.json({ message: "Recruiter updated successfully", logo_path });
  } catch (err) {
    res.status(500).json({ message: "Failed to update recruiter", error: err.message });
  }
};
