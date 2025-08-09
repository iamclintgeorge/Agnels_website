import db from "../../config/db.js";

// Fetch all important links
export const getImportantLinks = async () => {
  const query = `
    SELECT id, title, link
    FROM important_links
    ORDER BY id ASC
  `;

  try {
    const [rows] = await db.promise().query(query);
    return rows;
  } catch (error) {
    console.error("Database error fetching important links:", error);
    throw error;
  }
};

export const getImportantLinkById = async (id) => {
  const query = `SELECT id, title, link FROM important_links WHERE id = ?`;
  try {
    const [rows] = await db.promise().query(query, [id]);
    return rows[0] || null;
  } catch (error) {
    console.error("Database error fetching important link by id:", error);
    throw error;
  }
};

export const createImportantLink = async ({ title, link }) => {
  const query = `INSERT INTO important_links (title, link) VALUES (?, ?)`;
  try {
    const [result] = await db.promise().query(query, [title, link]);
    return result;
  } catch (error) {
    console.error("Database error creating important link:", error);
    throw error;
  }
};

export const updateImportantLink = async (id, { title, link }) => {
  const query = `UPDATE important_links SET title = ?, link = ? WHERE id = ?`;
  try {
    const [result] = await db.promise().query(query, [title, link, id]);
    return result;
  } catch (error) {
    console.error("Database error updating important link:", error);
    throw error;
  }
};

export const deleteImportantLink = async (id) => {
  const query = `DELETE FROM important_links WHERE id = ?`;
  try {
    const [result] = await db.promise().query(query, [id]);
    return result;
  } catch (error) {
    console.error("Database error deleting important link:", error);
    throw error;
  }
};

