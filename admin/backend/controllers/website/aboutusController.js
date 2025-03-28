import { principalTextDisplay } from "../../models/website/aboutusModel.js";

export const principalDisplayController = async (req, res) => {
  try {
    const text = await principalTextDisplay();
    res.json(text);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Error fetching Principal's Desk Text" });
  }
};
