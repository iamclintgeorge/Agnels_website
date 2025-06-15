import db from "../../config/db.js";

// Upload PDF (for Teaching/Non-Teaching Staff)
export const uploadHumanRPDF = async (file_url, title, category) => {
  const query = `
    INSERT INTO humanr_pdf (file_url, title, category) 
    VALUES (?, ?, ?)
  `;
  try {
    const [result] = await db.promise().query(query, [file_url, title, category]);
    return result;
  } catch (error) {
    console.error("Database error saving HumanR PDF:", error);
    throw error;
  }
};

// Get list of PDFs by category (teachingstaff / nonteachingstaff)
export const getHumanRPDFsByCategory = async (category) => {
  const query = `
    SELECT id, file_url, title 
    FROM humanr_pdf 
    WHERE category = ?
    ORDER BY created_at DESC
  `;
  try {
    const [rows] = await db.promise().query(query, [category]);
    return rows;
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};
