import db from "../../config/db.js";

// Research Home Text Operations (Unchanged)
export const researchHomeDisplay = async () => {
  const query = `SELECT id, section, content FROM researchhome`;
  try {
    const [rows] = await db.promise().query(query);
    return rows;
  } catch (error) {
    console.error("Database fetch error in researchHomeDisplay:", error);
    throw new Error(`Failed to fetch research home text: ${error.message}`);
  }
};

export const researchHomeUpload = async (section, content) => {
  const insertQuery = `INSERT INTO researchhome (section, content, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)`;
  try {
    const [result] = await db.promise().query(insertQuery, [section, content]);
    return { id: result.insertId, section, content };
  } catch (error) {
    console.error("Database insertion error in researchHomeUpload:", error);
    throw new Error(`Failed to upload research home text: ${error.message}`);
  }
};

export const researchHomeUpdate = async (id, content) => {
  const query = `UPDATE researchhome SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
  try {
    const [result] = await db.promise().query(query, [content, id]);
    if (result.affectedRows === 0) return null;
    return { id, content };
  } catch (error) {
    console.error("Database update error in researchHomeUpdate:", error);
    throw new Error(`Failed to update research home text: ${error.message}`);
  }
};

// --- Research PDFs Operations ---

// ✅ FIXED: Simplified to only INSERT a new PDF record.
export const researchPdfUpload = async (section, topic, filePath, filename) => {
  const insertQuery = `
    INSERT INTO researchtable (section, topic, content, filename, created_at) 
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
  `;
  try {
    const [result] = await db
      .promise()
      .query(insertQuery, [section, topic, filePath, filename]);
    return { id: result.insertId, section, topic, content: filePath, filename };
  } catch (error) {
    console.error("Database insertion error in researchPdfUpload:", error);
    throw new Error(`Failed to upload PDF: ${error.message}`);
  }
};

// ✅ NEW: Helper function to find a single PDF record by its ID.
export const findResearchPdfById = async (id) => {
  const query = `SELECT id, content, filename FROM researchtable WHERE id = ?`;
  try {
    const [[pdf]] = await db.promise().query(query, [id]);
    return pdf;
  } catch (error) {
    console.error("Database fetch error in findResearchPdfById:", error);
    throw new Error(`Failed to find PDF by ID: ${error.message}`);
  }
};

export const researchPdfUpdate = async (id, filePath, filename) => {
  const query = `UPDATE researchtable SET content = ?, filename = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
  try {
    const [result] = await db.promise().query(query, [filePath, filename, id]);
    if (result.affectedRows === 0) return null;
    return { id, content: filePath, filename };
  } catch (error) {
    console.error("Database update error in researchPdfUpdate:", error);
    throw new Error(`Failed to update PDF: ${error.message}`);
  }
};

export const researchPdfDisplay = async (section = null) => {
  let query = `SELECT id, section, topic, content, filename FROM researchtable`;
  const params = [];
  if (section) {
    query += ` WHERE section = ?`;
    params.push(section);
  }
  try {
    const [rows] = await db.promise().query(query, params);
    return rows;
  } catch (error) {
    console.error("Database fetch error in researchPdfDisplay:", error);
    throw new Error(`Failed to fetch PDFs: ${error.message}`);
  }
};

export const researchPdfDelete = async (id) => {
  const selectQuery = `SELECT content, filename FROM researchtable WHERE id = ?`;
  const deleteQuery = `DELETE FROM researchtable WHERE id = ?`;
  try {
    const [[pdf]] = await db.promise().query(selectQuery, [id]);
    if (!pdf) return null;
    await db.promise().query(deleteQuery, [id]);
    return pdf;
  } catch (error) {
    console.error("Database deletion error in researchPdfDelete:", error);
    throw new Error(`Failed to delete PDF: ${error.message}`);
  }
};
