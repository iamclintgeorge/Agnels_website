import {
  cseHomeTextDisplay,
  cseHomeTextUpdate,
} from "../../models/website/cseModel.js";

export const cseHomeTextController = async (req, res) => {
  try {
    const text = await cseHomeTextDisplay();
    res.json(text);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Error fetching CSE Department Home text" });
  }
};

export const cseHomeTextUpdateController = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const updatedText = await cseHomeTextUpdate(id, content);
    if (!updatedText) {
      return res.status(404).json({ message: "Text not found" });
    }

    res.json({ message: "Text updated successfully", content: updatedText });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Error updating CSE Department Home text" });
  }
}; 