import db from "../../config/db.js";

export const compActivityUpload = async (
  department,
  section,
  title,
  filename
) => {
  const query = `
    INSERT INTO department_activities (department, section, title, filename)
    VALUES (?, ?, ?, ?)
  `;
  const values = [department, section, title, filename];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database insertion error:", error);
    throw error;
  }
};

export const compActivityDisplay = async (department, section) => {
  const query = `
    SELECT id, title, filename AS pdfUrl, created_at, updated_at
    FROM department_activities
    WHERE department = ? AND section = ?
  `;
  const values = [department, section];

  try {
    const [rows] = await db.promise().query(query, values);
    return rows;
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

export const compActivityDelete = async (id, department, section) => {
  const selectQuery = `
    SELECT filename
    FROM department_activities
    WHERE id = ? AND department = ? AND section = ?
  `;
  const deleteQuery = `
    DELETE FROM department_activities
    WHERE id = ? AND department = ? AND section = ?
  `;
  const values = [id, department, section];

  try {
    const [[pdf]] = await db.promise().query(selectQuery, values);
    if (!pdf) return null;

    const [result] = await db.promise().query(deleteQuery, values);
    return result.affectedRows > 0 ? pdf : null;
  } catch (error) {
    console.error("Database deletion error:", error);
    throw error;
  }
};
