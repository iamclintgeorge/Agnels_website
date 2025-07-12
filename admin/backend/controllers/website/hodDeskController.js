import {
  getHodTextBySection,
  createHodText,
  updateHodTextById,
  deleteHodTextById,
  getAllHodText,
} from "../../models/website/hodDeskModel.js";
import { logCustomActivity } from "../../middlewares/loggingMiddleware.js";
import db from "../../config/db.js";

// Get HOD text for a specific department
export const getHodText = async (req, res) => {
  try {
    const { department } = req.params;

    // Map department names to section names
    const sectionMap = {
      computer: "comHod",
      mechanical: "mechHod",
      extc: "extcHod",
      electrical: "electricalHod",
      it: "itHod",
      bsh: "bshHod",
    };

    const section = sectionMap[department];
    if (!section) {
      return res.status(400).json({ error: "Invalid department specified" });
    }

    const result = await getHodTextBySection(section);

    if (result.length === 0) {
      // If no content exists, create a default entry
      await createHodText(
        section,
        "<p>Welcome to the HOD Desk. Content will be added soon.</p>"
      );
      const newResult = await getHodTextBySection(section);
      return res.json(newResult);
    }

    res.json(result);
  } catch (error) {
    console.error("Error getting HOD text:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create new HOD text
export const createHodTextEntry = async (req, res) => {
  try {
    const { department } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    // Map department names to section names
    const sectionMap = {
      computer: "comHod",
      mechanical: "mechHod",
      extc: "extcHod",
      electrical: "electricalHod",
      it: "itHod",
      bsh: "bshHod",
    };

    const section = sectionMap[department];
    if (!section) {
      return res.status(400).json({ error: "Invalid department specified" });
    }

    // Check if content already exists for this section
    const existing = await getHodTextBySection(section);
    if (existing.length > 0) {
      return res
        .status(400)
        .json({
          error: "Content already exists for this section. Use update instead.",
        });
    }

    const result = await createHodText(section, content);
    res.status(201).json({
      message: "HOD text created successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error creating HOD text:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update HOD text
export const updateHodText = async (req, res) => {
  try {
    const { department, id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    // Get old data before updating for logging
    const oldDataQuery = await new Promise((resolve, reject) => {
      const query = "SELECT * FROM infoText WHERE id = ?";
      db.query(query, [id], (error, results) => {
        if (error) reject(error);
        else resolve(results[0]);
      });
    });

    const result = await updateHodTextById(id, content);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "HOD text not found" });
    }

    // Log the update with old and new data
    await logCustomActivity(req, {
      action: "UPDATE",
      resource: "hod_desk",
      resourceId: id,
      oldData: oldDataQuery,
      newData: { content },
      description: `Updated HOD desk content for ${department} department`,
    });

    res.json({ message: "HOD text updated successfully" });
  } catch (error) {
    console.error("Error updating HOD text:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete HOD text
export const deleteHodText = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const result = await deleteHodTextById(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "HOD text not found" });
    }

    res.json({ message: "HOD text deleted successfully" });
  } catch (error) {
    console.error("Error deleting HOD text:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all HOD text entries (admin only)
export const getAllHodTextEntries = async (req, res) => {
  try {
    const result = await getAllHodText();
    res.json(result);
  } catch (error) {
    console.error("Error getting all HOD text:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
