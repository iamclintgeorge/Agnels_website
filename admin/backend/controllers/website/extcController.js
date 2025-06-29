import {
  extcHomeTextDisplay,
  extcHomeTextUpdate,
} from "../../models/website/extcModel.js";

export const extcHomeTextController = async (req, res) => {
  try {
    const text = await extcHomeTextDisplay();
    res.json(text);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Error fetching EXTC Department Home text" });
  }
};

export const extcHomeTextUpdateController = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const updatedText = await extcHomeTextUpdate(id, content);
    if (!updatedText) {
      return res.status(404).json({ message: "Text not found" });
    }

    res.json({ message: "Text updated successfully", content: updatedText });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Error updating EXTC Department Home text" });
  }
}; 