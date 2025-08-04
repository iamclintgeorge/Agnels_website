import db from "../../config/db.js";

// // Save or update NIRF text and PDF
// export const saveNIRFData = async (year, content, pdf_url, pdf_title) => {
//   const query = `
//     INSERT INTO nirf_data (year, content, pdf_url, pdf_title) 
//     VALUES (?, ?, ?, ?) 
//     ON DUPLICATE KEY UPDATE content = VALUES(content), pdf_url = VALUES(pdf_url), pdf_title = VALUES(pdf_title)
//   `;
//   try {
//     const [result] = await db.promise().query(query, [year, content, pdf_url, pdf_title]);
//     return result;
//   } catch (error) {
//     console.error("Database error saving NIRF data:", error);
//     throw error;
//   }
// };

// // Get NIRF data by year
// export const getNIRFData = async (year) => {
//   const query = `SELECT * FROM nirf_data WHERE year = ?`;
//   try {
//     const [rows] = await db.promise().query(query, [year]);
//     return rows.length ? rows[0] : null;
//   } catch (error) {
//     console.error("Database fetch error for NIRF data:", error);
//     throw error;
//   }
// };

// // Get all NIRF data
// export const getAllNIRFData = async () => {
//   const query = `SELECT year, pdf_url, pdf_title, content FROM nirf_data`;
//   try {
//     const [rows] = await db.promise().query(query);
//     return rows;
//   } catch (error) {
//     console.error("Database fetch error for all NIRF data:", error);
//     throw error;
//   }
// };


// import db from "../../config/db.js";

// Save NIRF page
export const saveNIRFData = async (subject, attachment) => {
  const query = `
    INSERT INTO nirf_pages (subject, attachment)
    VALUES (?, ?)
  `;
  try {
    const [result] = await db.promise().query(query, [subject, attachment]);
    return result;
  } catch (error) {
    console.error("Database error saving NIRF page:", error);
    throw error;
  }
};

// Update NIRF page
export const updateNIRFPage = async (id, subject, attachment) => {
  const query = `
    UPDATE nirf_pages 
    SET subject = ?, attachment = ?
    WHERE id = ?
  `;
  try {
    const [result] = await db.promise().query(query, [subject, attachment, id]);
    return result;
  } catch (error) {
    console.error("Database error updating NIRF page:", error);
    throw error;
  }
};

// Get NIRF pages (all or by ID)
export const getAllNIRFData = async (id = null) => {
  let query = "SELECT * FROM nirf_pages";
  let params = [];
  
  if (id) {
    query += " WHERE id = ?";
    params = [id];
  }
  
  query += " ORDER BY id DESC";
  
  try {
    const [rows] = await db.promise().query(query, params);
    return id ? (rows.length ? rows[0] : null) : rows;
  } catch (error) {
    console.error("Database error fetching NIRF pages:", error);
    throw error;
  }
};

// Delete NIRF page
export const deleteNIRFPage = async (id) => {
  const query = "DELETE FROM nirf_pages WHERE id = ?";
  try {
    const [result] = await db.promise().query(query, [id]);
    return result;
  } catch (error) {
    console.error("Database error deleting NIRF page:", error);
    throw error;
  }
};

// Get NIRF page by subject
export const getNIRFData = async (subject) => {
  const query = "SELECT * FROM nirf_pages WHERE subject = ?";
  try {
    const [rows] = await db.promise().query(query, [subject]);
    return rows.length ? rows[0] : null;
  } catch (error) {
    console.error("Database error fetching NIRF page by subject:", error);
    throw error;
  }
};

// Optional: Export all functions as an object (for backward compatibility)
export const NIRFPagesModel = {
  saveNIRFData,
  updateNIRFPage,
 getAllNIRFData,
  deleteNIRFPage,
  getNIRFData
};