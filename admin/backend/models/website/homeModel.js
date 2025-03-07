import db from "../../config/db.js";

export const carouselUpload = async (altText, imageUrl) => {
  const query = `
    INSERT INTO carousel (Alt_text, filename)
    VALUES (?, ?)
  `;
  const values = [altText, imageUrl];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database insertion error:", error);
    throw error;
  }
};

export const carouselDisplay = async () => {
  const query = `
      SELECT Alt_text as altText, filename as imageUrl 
      FROM carousel
    `;

  try {
    const [rows] = await db.promise().query(query);
    return rows;
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};
