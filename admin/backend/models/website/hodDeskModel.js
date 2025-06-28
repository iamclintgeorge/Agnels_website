import db from "../../config/db.js";

// Get HOD text by section
export const getHodTextBySection = async (section) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM infoText WHERE Section = ? ORDER BY Created_At DESC LIMIT 1",
      [section]
    );
    return rows;
  } catch (error) {
    console.error("Error getting HOD text by section:", error);
    throw error;
  }
};

// Create new HOD text entry
export const createHodText = async (section, content) => {
  try {
    const [result] = await db.execute(
      "INSERT INTO infoText (Section, Content) VALUES (?, ?)",
      [section, content]
    );
    return result;
  } catch (error) {
    console.error("Error creating HOD text:", error);
    throw error;
  }
};

// Update HOD text by ID
export const updateHodTextById = async (id, content) => {
  try {
    const [result] = await db.execute(
      "UPDATE infoText SET Content = ?, Updated_At = CURRENT_TIMESTAMP WHERE id = ?",
      [content, id]
    );
    return result;
  } catch (error) {
    console.error("Error updating HOD text:", error);
    throw error;
  }
};

// Delete HOD text by ID
export const deleteHodTextById = async (id) => {
  try {
    const [result] = await db.execute(
      "DELETE FROM infoText WHERE id = ?",
      [id]
    );
    return result;
  } catch (error) {
    console.error("Error deleting HOD text:", error);
    throw error;
  }
};

// Get all HOD text entries (for admin purposes)
export const getAllHodText = async () => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM infoText ORDER BY Section, Created_At DESC"
    );
    return rows;
  } catch (error) {
    console.error("Error getting all HOD text:", error);
    throw error;
  }
}; 