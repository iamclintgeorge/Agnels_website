import {
  getImportantLinks,
  getImportantLinkById,
  createImportantLink,
  updateImportantLink,
  deleteImportantLink,
} from "../../models/website/importantLinksModel.js";

export const importantLinksGetController = async (req, res) => {
  try {
    const links = await getImportantLinks();
    res.json({ success: true, data: links });
  } catch (error) {
    console.error("Error fetching important links:", error);
    res.status(500).json({ success: false, message: "Error fetching important links" });
  }
};

export const importantLinkGetByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const link = await getImportantLinkById(id);
    if (!link) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: link });
  } catch (error) {
    console.error("Error fetching important link:", error);
    res.status(500).json({ success: false, message: "Error fetching important link" });
  }
};

export const importantLinkCreateController = async (req, res) => {
  try {
    const { title, link } = req.body;
    if (!title || !link) {
      return res.status(400).json({ success: false, message: "title and link are required" });
    }
    const result = await createImportantLink({ title, link });
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error("Error creating important link:", error);
    res.status(500).json({ success: false, message: "Error creating important link" });
  }
};

export const importantLinkUpdateController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, link } = req.body;
    if (!title || !link) {
      return res.status(400).json({ success: false, message: "title and link are required" });
    }
    const result = await updateImportantLink(id, { title, link });
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.json({ success: true });
  } catch (error) {
    console.error("Error updating important link:", error);
    res.status(500).json({ success: false, message: "Error updating important link" });
  }
};

export const importantLinkDeleteController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteImportantLink(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting important link:", error);
    res.status(500).json({ success: false, message: "Error deleting important link" });
  }
};

