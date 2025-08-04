import db from "../../config/db.js";

export const computerHomeTextDisplay = async (id) => {
  const query = `
    SELECT * FROM abouts WHERE department_id = ?;
  `;
  const value = id;

  try {
    const [rows] = await db.promise().query(query, value);
    return rows;
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

export const computerHomeTextUpdate = async (departmentId, id, content) => {
  if (
    !id ||
    id === "undefined" ||
    !departmentId ||
    departmentId === "undefined"
  ) {
    throw new Error("Invalid ID provided for update");
  }

  const query = `
    UPDATE abouts 
    SET paragraph1 = ? 
    WHERE department_id = ?;
  `;
  const values = [content, departmentId];

  try {
    const [result] = await db.promise().query(query, values);
    if (result.affectedRows === 0) return null;
    return { id, content };
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
};
