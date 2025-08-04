import {
  principalTextDisplay,
  principalTextUpdate,
  getAboutUsSection,
  upsertAboutUsSection,
  getAllAboutUsSections,
} from "../../models/website/aboutusModel.js";

export const principalDisplayController = async (req, res) => {
  try {
    const result = await principalTextDisplay();
    res.json(result);
  } catch (error) {
    console.error("Error in principalDisplayController:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const principalUpdateController = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  console.log("principalUpdateController", content);
  const result = await principalTextUpdate(id, content);
  res.status(200).json(result);
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// New controllers for other About Us sections
const SECTION_PREFIX = "aboutUs";

export const getSectionContent = async (req, res) => {
  try {
    const { sectionKey } = req.params;
    if (!sectionKey) {
      return res.status(400).json({ error: "Section key is required" });
    }

    const section = await getAboutUsSection(sectionKey);
    if (!section) {
      return res.json({ sectionKey, content: {} });
    }

    res.json(section);
  } catch (error) {
    console.error("Error in getSectionContent:", error);
    res.status(500).json({ error: "Error fetching section content" });
  }
};

export const updateSectionContent = async (req, res) => {
  try {
    const { sectionKey } = req.params;
    const contentObject = req.body;

    if (!sectionKey) {
      return res.status(400).json({ error: "Section key is required" });
    }

    if (!contentObject || typeof contentObject !== "object") {
      return res
        .status(400)
        .json({ error: "Content must be a valid JSON object" });
    }

    const updatedSection = await upsertAboutUsSection(
      sectionKey,
      contentObject
    );
    res.json(updatedSection);
  } catch (error) {
    console.error("Error in updateSectionContent:", error);
    res.status(500).json({ error: "Error updating section content" });
  }
};

export const getAllSections = async (req, res) => {
  try {
    const sections = await getAllAboutUsSections();
    res.json(sections);
  } catch (error) {
    console.error("Error in getAllSections:", error);
    res.status(500).json({ error: "Error fetching sections" });
  }
};
