import db from "../../config/db.js";

// Save or update NIRF text and PDF
export const saveNIRFData = async (year, content, pdf_url, pdf_title) => {
  const query = `
    INSERT INTO nirf_data (year, content, pdf_url, pdf_title) 
    VALUES (?, ?, ?, ?) 
    ON DUPLICATE KEY UPDATE content = VALUES(content), pdf_url = VALUES(pdf_url), pdf_title = VALUES(pdf_title)
  `;
  try {
    const [result] = await db.promise().query(query, [year, content, pdf_url, pdf_title]);
    return result;
  } catch (error) {
    console.error("Database error saving NIRF data:", error);
    throw error;
  }
};

// Get NIRF data by year
export const getNIRFData = async (year) => {
  const query = `SELECT * FROM nirf_data WHERE year = ?`;
  try {
    const [rows] = await db.promise().query(query, [year]);
    return rows.length ? rows[0] : null;
  } catch (error) {
    console.error("Database fetch error for NIRF data:", error);
    throw error;
  }
};

// Get all NIRF data
export const getAllNIRFData = async () => {
  const query = `SELECT year, pdf_url, pdf_title, content FROM nirf_data`;
  try {
    const [rows] = await db.promise().query(query);
    return rows;
  } catch (error) {
    console.error("Database fetch error for all NIRF data:", error);
    throw error;
  }
};