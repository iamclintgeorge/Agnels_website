import db from "../../config/db.js";

// Create download
export const downloadCreate = async (title, description, category, pdf_url, external_link, display_order, created_by) => {
  const query = `
    INSERT INTO downloads (title, description, category, pdf_url, external_link, display_order, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [title, description, category, pdf_url, external_link, display_order, created_by];
  
  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database insertion error:", error);
    throw error;
  }
};

// Fetch all downloads
export const downloadFetch = async () => {
  const query = `
    SELECT * FROM downloads 
    WHERE is_active = true 
    ORDER BY category, display_order ASC, created_at DESC
  `;
  
  try {
    const [rows] = await db.promise().query(query);
    return rows;
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

// Fetch downloads by category
export const downloadFetchByCategory = async (category) => {
  const query = `
    SELECT * FROM downloads 
    WHERE category = ? AND is_active = true 
    ORDER BY display_order ASC, created_at DESC
  `;
  
  try {
    const [rows] = await db.promise().query(query, [category]);
    return rows;
  } catch (error) {
    console.error("Database fetch by category error:", error);
    throw error;
  }
};

// Get download by ID
export const downloadGetById = async (id) => {
  const query = `SELECT * FROM downloads WHERE id = ?`;
  
  try {
    const [rows] = await db.promise().query(query, [id]);
    return rows[0];
  } catch (error) {
    console.error("Database get by ID error:", error);
    throw error;
  }
};

// Update download
export const downloadUpdate = async (id, title, description, category, pdf_url, external_link, display_order) => {
  const query = `
    UPDATE downloads 
    SET title = ?, description = ?, category = ?, pdf_url = ?, external_link = ?, display_order = ?
    WHERE id = ?
  `;
  const values = [title, description, category, pdf_url, external_link, display_order, id];
  
  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
};

// Delete download (soft delete)
export const downloadDelete = async (id) => {
  const query = `UPDATE downloads SET is_active = false WHERE id = ?`;
  
  try {
    const [result] = await db.promise().query(query, [id]);
    return result;
  } catch (error) {
    console.error("Database delete error:", error);
    throw error;
  }
};