import {
  computerHomeTextDisplay,
  computerHomeTextUpdate,
} from "../../models/website/computerModel.js";

export const computerHomeTextController = async (req, res) => {
  try {
    const text = await computerHomeTextDisplay();
    res.json(text);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Error fetching Computer Department Home text" });
  }
};

export const computerHomeTextUpdateController = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const updatedText = await computerHomeTextUpdate(id, content);
    if (!updatedText) {
      return res.status(404).json({ message: "Text not found" });
    }

    res.json({ message: "Text updated successfully", content: updatedText });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Error updating Computer Department Home text" });
  }
}; 