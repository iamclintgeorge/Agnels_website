import db from "../../config/db.js";

export const bshHomeTextDisplay = async () => {
  const query = `
    SELECT * FROM infoText WHERE Section = 'bsh_home';
  `;

  try {
    const [rows] = await db.promise().query(query);
    return rows;
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

export const bshHomeTextUpdate = async (id, content) => {
  if (!id || id === "undefined") {
    throw new Error("Invalid ID provided for update");
  }

  const query = `
    UPDATE infoText 
    SET Content = ?, Updated_At = CURRENT_TIMESTAMP 
    WHERE id = ? AND Section = 'bsh_home';
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