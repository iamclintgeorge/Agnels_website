import db from "../../config/db.js";

export const electricalHomeTextDisplay = async () => {
  const query = `
    SELECT * FROM infoText WHERE Section = 'electrical_home';
  `;

  try {
    const [rows] = await db.promise().query(query);
    return rows;
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

export const electricalHomeTextUpdate = async (id, content) => {
  if (!id || id === "undefined") {
    throw new Error("Invalid ID provided for update");
  }

  const query = `
    UPDATE infoText 
    SET Content = ?, Updated_At = CURRENT_TIMESTAMP 
    WHERE id = ? AND Section = 'electrical_home';
  `;
  const values = [content, id];

  try {
    const [result] = await db.promise().query(query, values);
    if (result.affectedRows === 0) return null;
    return { id, content };
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
}; 