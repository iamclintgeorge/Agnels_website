import { 
  principalTextDisplay,
  getAboutUsSection,
  upsertAboutUsSection,
  getAllAboutUsSections
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
    let contentObject = req.body;

    if (!sectionKey) {
      return res.status(400).json({ 
        success: false, 
        message: "Section key is required" 
      });
    }

    // Validate content object
    if (!contentObject) {
      contentObject = {}; // Provide default empty object if none provided
    }
    
    if (typeof contentObject !== 'object') {
      try {
        // Try to parse as JSON if it's a string
        contentObject = JSON.parse(contentObject);
      } catch (parseError) {
        return res.status(400).json({ 
          success: false, 
          message: "Content must be a valid JSON object" 
        });
      }
    }

    // Special handling for sections with nested objects
    if (sectionKey === "Managing Director's Desk") {
      // Ensure required nested objects exist
      contentObject.director = contentObject.director || {};
      contentObject.quotes = contentObject.quotes || {};
    }

    console.log(`Updating section ${sectionKey} with content:`, JSON.stringify(contentObject, null, 2));

    try {
      const updatedSection = await upsertAboutUsSection(sectionKey, contentObject);
      
      // Ensure that the response has the expected format
      const responseData = {
        success: true, 
        message: "Section updated successfully", 
        data: updatedSection
      };
      
      console.log("Sending success response:", responseData);
      res.json(responseData);
    } catch (dbError) {
      console.error(`Database error while updating section ${sectionKey}:`, dbError);
      res.status(500).json({
        success: false,
        message: `Database error: ${dbError.message}`
      });
    }
  } catch (error) {
    console.error(`General error in updateSectionContent for ${req.params?.sectionKey || 'unknown section'}:`, error);
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
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
