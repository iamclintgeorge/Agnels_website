import db from "../../config/db.js";

export const principalTextDisplay = async () => {
  const query = `
        SELECT * FROM infoText WHERE Section = 'principalDesk';
      `;

  try {
    const [rows] = await db.promise().query(query);
    return rows;
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};
