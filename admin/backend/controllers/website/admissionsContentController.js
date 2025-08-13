import {
  getAdmissionsSection,
  upsertAdmissionsSection,
  getAllAdmissionsSections,
  deleteAdmissionsSection,
} from "../../models/website/admissionsContentModel.js";

export const admissionsGetSectionController = async (req, res) => {
  try {
    const { sectionKey } = req.params;
    if (!sectionKey) return res.status(400).json({ message: "sectionKey is required" });
    const data = await getAdmissionsSection(sectionKey);
    res.json(data);
  } catch (error) {
    console.error("Admissions get section error:", error);
    res.status(500).json({ message: "Error fetching admissions section" });
  }
};

export const admissionsUpsertSectionController = async (req, res) => {
  try {
    const { sectionKey } = req.params;
    const contentObject = req.body;
    if (!sectionKey) return res.status(400).json({ message: "sectionKey is required" });
    if (!contentObject || typeof contentObject !== "object")
      return res.status(400).json({ message: "content must be an object" });
    const updated = await upsertAdmissionsSection(sectionKey, contentObject);
    res.json(updated);
  } catch (error) {
    console.error("Admissions upsert section error:", error);
    res.status(500).json({ message: "Error saving admissions section" });
  }
};

export const admissionsGetAllSectionsController = async (_req, res) => {
  try {
    const data = await getAllAdmissionsSections();
    res.json(data);
  } catch (error) {
    console.error("Admissions get all sections error:", error);
    res.status(500).json({ message: "Error fetching admissions sections" });
  }
};

export const admissionsDeleteSectionController = async (req, res) => {
  try {
    const { sectionKey } = req.params;
    if (!sectionKey) return res.status(400).json({ message: "sectionKey is required" });
    const result = await deleteAdmissionsSection(sectionKey);
    res.json({ success: true, affectedRows: result.affectedRows });
  } catch (error) {
    console.error("Admissions delete section error:", error);
    res.status(500).json({ message: "Error deleting admissions section" });
  }
};

