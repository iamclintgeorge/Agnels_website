import db from "../../config/db.js"; // Adjust the path accordingly

export const getOverview = async () => {
  const sql = "SELECT * FROM placement_overview LIMIT 1";
  try {
    const [result] = await db.promise().query(sql);
    return result[0] || {};
  } catch (err) {
    throw err;
  }
};

export const updateOverview = async (description, vision, mission) => {
  const sql = `INSERT INTO placement_overview (description, vision, mission) 
               VALUES (?, ?, ?)
               ON DUPLICATE KEY UPDATE 
               description = VALUES(description),
               vision = VALUES(vision),
               mission = VALUES(mission)`;
  try {
    const [result] = await db
      .promise()
      .query(sql, [description, vision, mission]);
    return result;
  } catch (err) {
    throw err;
  }
};

// Statistics Model
export const getStatistics = async () => {
  const sql = "SELECT * FROM placement_statistics ORDER BY academic_year DESC";
  try {
    const [result] = await db.promise().query(sql);
    return result;
  } catch (err) {
    throw err;
  }
};

export const addStatistics = async (
  academic_year,
  total_placements,
  average_package,
  highest_package,
  companies_visited
) => {
  const sql = `INSERT INTO placement_statistics 
                 (academic_year, total_placements, average_package, highest_package, companies_visited) 
                 VALUES (?, ?, ?, ?, ?)`;
  try {
    const [result] = await db
      .promise()
      .query(sql, [
        academic_year,
        total_placements,
        average_package,
        highest_package,
        companies_visited,
      ]);
    return result;
  } catch (err) {
    throw err;
  }
};

export const deleteStatistics = async (id) => {
  const sql = "DELETE FROM placement_statistics WHERE id = ?";
  try {
    const [result] = await db.promise().query(sql, [id]);
    return result;
  } catch (err) {
    throw err;
  }
};

export const updateStatistics = async (
  id,
  academic_year,
  total_placements,
  average_package,
  highest_package,
  companies_visited
) => {
  const sql = `UPDATE placement_statistics 
                 SET academic_year = ?, 
                     total_placements = ?, 
                     average_package = ?, 
                     highest_package = ?, 
                     companies_visited = ? 
                 WHERE id = ?`;
  try {
    const [result] = await db
      .promise()
      .query(sql, [
        academic_year,
        total_placements,
        average_package,
        highest_package,
        companies_visited,
        id,
      ]);
    return result;
  } catch (err) {
    throw err;
  }
};

// Recruiters Model
export const getRecruiters = async () => {
  const sql = "SELECT * FROM placement_recruiters ORDER BY created_at DESC";
  try {
    const [result] = await db.promise().query(sql);
    return result;
  } catch (err) {
    throw err;
  }
};

export const addRecruiter = async (company_name, logo_path, description) => {
  const sql = `INSERT INTO placement_recruiters (company_name, logo_path, description) 
               VALUES (?, ?, ?)`;
  try {
    const [result] = await db
      .promise()
      .query(sql, [company_name, logo_path, description]);
    return result;
  } catch (err) {
    throw err;
  }
};

export const deleteRecruiter = async (id) => {
  const selectSql = "SELECT logo_path FROM placement_recruiters WHERE id = ?";
  try {
    const [result] = await db.promise().query(selectSql, [id]);
    const deleteSql = "DELETE FROM placement_recruiters WHERE id = ?";
    const [deleteResult] = await db.promise().query(deleteSql, [id]);
    return { logo_path: result[0]?.logo_path, deleteResult };
  } catch (err) {
    throw err;
  }
};

export const updateRecruiter = async (
  id,
  company_name,
  description,
  logo_path
) => {
  const sql = `UPDATE placement_recruiters 
               SET company_name = ?, description = ?, logo_path = ? 
               WHERE id = ?`;
  try {
    const [result] = await db
      .promise()
      .query(sql, [company_name, description, logo_path, id]);
    return result;
  } catch (err) {
    throw err;
  }
};
