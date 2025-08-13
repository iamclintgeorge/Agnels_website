import {
  getIQACSection,
  upsertIQACSection,
  getAllIQACSections,
  deleteIQACSection,
} from "../../models/website/iqacModel.js";

export const iqacGetSectionController = async (req, res) => {
  try {
    const { sectionKey } = req.params;
    if (!sectionKey) return res.status(400).json({ message: "sectionKey is required" });
    const data = await getIQACSection(sectionKey);
    res.json(data);
  } catch (error) {
    console.error("IQAC get section error:", error);
    res.status(500).json({ message: "Error fetching IQAC section" });
  }
};

export const iqacUpsertSectionController = async (req, res) => {
  try {
    const { sectionKey } = req.params;
    const contentObject = req.body;
    if (!sectionKey) return res.status(400).json({ message: "sectionKey is required" });
    if (!contentObject || typeof contentObject !== "object")
      return res.status(400).json({ message: "content must be an object" });
    const updated = await upsertIQACSection(sectionKey, contentObject);
    res.json(updated);
  } catch (error) {
    console.error("IQAC upsert section error:", error);
    res.status(500).json({ message: "Error saving IQAC section" });
  }
};

export const iqacGetAllSectionsController = async (_req, res) => {
  try {
    const data = await getAllIQACSections();
    res.json(data);
  } catch (error) {
    console.error("IQAC get all sections error:", error);
    res.status(500).json({ message: "Error fetching IQAC sections" });
  }
};

export const iqacDeleteSectionController = async (req, res) => {
  try {
    const { sectionKey } = req.params;
    if (!sectionKey) return res.status(400).json({ message: "sectionKey is required" });
    const result = await deleteIQACSection(sectionKey);
    res.json({ success: true, affectedRows: result.affectedRows });
  } catch (error) {
    console.error("IQAC delete section error:", error);
    res.status(500).json({ message: "Error deleting IQAC section" });
  }
};


