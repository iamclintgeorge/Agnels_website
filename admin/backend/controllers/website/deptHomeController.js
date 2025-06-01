import {
  deptHomeTextDisplay,
  deptHomeTextUpdate,
} from "../../models/website/deptHomeModel.js";

export const deptHomeTextController = async (req, res) => {
  try {
    const text = await deptHomeTextDisplay();
    res.json(text);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Error fetching Department Home text" });
  }
};

export const deptHomeTextUpdateController = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const updatedText = await deptHomeTextUpdate(id, content);
    if (!updatedText) {
      return res.status(404).json({ message: "Text not found" });
    }

    res.json({ message: "Text updated successfully", content: updatedText });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Error updating Department Home text" });
  }
};
