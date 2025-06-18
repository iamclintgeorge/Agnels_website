import db from "../../config/db.js";

// Save or update IIC text
export const saveIICText = async (section, content) => {
  const query = `
    INSERT INTO iic_text (section, content) 
    VALUES (?, ?) 
    ON DUPLICATE KEY UPDATE content = VALUES(content)
  `;
  try {
    const [result] = await db.promise().query(query, [section, content]);
    return result;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

// Get IIC text
export const getIICText = async (section) => {
  const query = `SELECT * FROM iic_text WHERE section = ?`;  
  try {
    const [rows] = await db.promise().query(query, [section]);
    return rows.length ? rows[0] : null;  
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

// Update IIC text
export const updateIICText = async (id, content) => {
  const query = `UPDATE iic_text SET content = ? WHERE id = ?`;
  try {
    const [result] = await db.promise().query(query, [content, id]);
    return result;
  } catch (error) {
    console.error("Database error updating text:", error);
    throw error;
  }
};

// Upload PDF (for Innovation and Startup Policy)
export const uploadIICPDF = async (file_url, title) => {
  const query = `
    INSERT INTO iic_pdf (file_url, title) VALUES (?, ?)
  `;
  try {
    const [result] = await db.promise().query(query, [file_url, title]);
    return result;
  } catch (error) {
    console.error("Database error saving PDF:", error);
    throw error;
  }
};

// Get list of PDFs
export const getIICPDFs = async () => {
  const query = `SELECT id, file_url, title FROM iic_pdf`;
  try {
    const [rows] = await db.promise().query(query);
    return rows;
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};
