// admin/backend/models/researchModel.js
import db from "../../config/db.js";

// Research Home Text Operations
export const researchHomeDisplay = async () => {
  const query = `
    SELECT id, section, content 
    FROM researchhome 
    WHERE section = 'researchHome'
  `;

  try {
    const [rows] = await db.promise().query(query);
    return rows;
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

export const researchHomeUpdate = async (id, content) => {
  const query = `
    UPDATE researchhome 
    SET content = ?, updated_at = CURRENT_TIMESTAMP 
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

// Research PDFs Operations
// export const researchPdfUpload = async (section, topic, filePath) => {
//   // First, check if a PDF already exists for this section
//   const checkQuery = `
//     SELECT id FROM researchtable 
//     WHERE section = ?
//   `;
//   const insertQuery = `
//     INSERT INTO researchtable (section, topic, content) 
//     VALUES (?, ?, ?)
//   `;
//   const updateQuery = `
//     UPDATE researchtable 
//     SET content = ?, updated_at = CURRENT_TIMESTAMP 
//     WHERE section = ?
//   `;

//   try {
//     const [existing] = await db.promise().query(checkQuery, [section]);
//     if (existing.length > 0) {
//       // Update existing record
//       const [result] = await db.promise().query(updateQuery, [filePath, section]);
//       return result;
//     } else {
//       // Insert new record
//       const [result] = await db.promise().query(insertQuery, [section, topic, filePath]);
//       return result;
//     }
//   } catch (error) {
//     console.error("Database insertion/update error:", error);
//     throw error;
//   }
// };



export const researchPdfUpload = async (section, topic, filePath, filename) => {
  const checkQuery = `
    SELECT id FROM researchtable 
    WHERE section = ?
  `;
  const insertQuery = `
    INSERT INTO researchtable (section, topic, content, filename) 
    VALUES (?, ?, ?, ?)
  `;
  const updateQuery = `
    UPDATE researchtable 
    SET content = ?, filename = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE section = ?
  `;

  try {
    const [existing] = await db.promise().query(checkQuery, [section]);
    if (existing.length > 0) {
      // Update existing record
      const [result] = await db.promise().query(updateQuery, [filePath, filename, section]);
      return result;
    } else {
      // Insert new record
      const [result] = await db.promise().query(insertQuery, [section, topic, filePath, filename]);
      return result;
    }
  } catch (error) {
    console.error("Database insertion/update error:", error);
    throw error;
  }
};




// export const researchPdfDisplay = async () => {
//   const query = `
//     SELECT id, section, topic, content 
//     FROM researchtable
//   `;

//   try {
//     const [rows] = await db.promise().query(query);
//     return rows;
//   } catch (error) {
//     console.error("Database fetch error:", error);
//     throw error;
//   }
// };

export const researchPdfDisplay = async (section = null) => {
  let query = `
    SELECT id, section, topic, content, filename 
    FROM researchtable
  `;
  const params = [];
  if (section) {
    query += ` WHERE section = ?`;
    params.push(section);
  }

  try {
    const [rows] = await db.promise().query(query, params);
    return rows;
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};


// export const researchPdfDelete = async (section) => {
//   const selectQuery = `
//     SELECT content 
//     FROM researchtable 
//     WHERE section = ?
//   `;
//   const deleteQuery = `
//     DELETE FROM researchtable 
//     WHERE section = ?
//   `;

//   try {
//     const [[pdf]] = await db.promise().query(selectQuery, [section]);
//     if (!pdf) return null;

//     const [result] = await db.promise().query(deleteQuery, [section]);
//     return result.affectedRows > 0 ? pdf : null;
//   } catch (error) {
//     console.error("Database deletion error:", error);
//     throw error;
//   }
// };


export const researchPdfDelete = async (id) => {
  const selectQuery = `
    SELECT content, filename 
    FROM researchtable 
    WHERE id = ?
  `;
  const deleteQuery = `
    DELETE FROM researchtable 
    WHERE id = ?
  `;

  try {
    const [[pdf]] = await db.promise().query(selectQuery, [id]);
    if (!pdf) return null;

    const [result] = await db.promise().query(deleteQuery, [id]);
    return result.affectedRows > 0 ? pdf : null;
  } catch (error) {
    console.error("Database deletion error:", error);
    throw error;
  }
};