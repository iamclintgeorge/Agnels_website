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
      SELECT Id, Alt_text AS altText, filename AS imageUrl 
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

export const carouselDelete = async (id) => {
  const query = `
    DELETE FROM carousel 
    WHERE Id = ?
  `;
  const selectQuery = `
    SELECT filename as imageUrl 
    FROM carousel 
    WHERE Id = ?
  `;

  try {
    const [[image]] = await db.promise().query(selectQuery, [id]);
    if (!image) return null;

    const [result] = await db.promise().query(query, [id]);
    return result.affectedRows > 0 ? image : null;
  } catch (error) {
    console.error("Database deletion error:", error);
    throw error;
  }
};

export const introTextDisplay = async () => {
  const query = `
      SELECT * FROM introText WHERE Section = 'aboutUsText';
    `;

  try {
    const [rows] = await db.promise().query(query);
    return rows;
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

export const introTextUpdate = async (id, content) => {
  if (!id || id === "undefined") {
    throw new Error("Invalid ID provided for update");
  }

  const query = `
    UPDATE introText 
    SET Content = ?, Updated_At = CURRENT_TIMESTAMP 
    WHERE id = ?
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
