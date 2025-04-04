// models/placement.js
import db from "../../config/db.js"; // Adjust the path accordingly

export const getOverview = () => {
  const sql = "SELECT * FROM placement_overview LIMIT 1";
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result[0] || {});
    });
  });
};

export const updateOverview = (description, vision, mission) => {
  const sql = `INSERT INTO placement_overview (description, vision, mission) 
               VALUES (?, ?, ?)
               ON DUPLICATE KEY UPDATE 
               description = VALUES(description),
               vision = VALUES(vision),
               mission = VALUES(mission)`;
  return new Promise((resolve, reject) => {
    db.query(sql, [description, vision, mission], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Statistics Model
export const getStatistics = () => {
  const sql = "SELECT * FROM placement_statistics ORDER BY academic_year DESC";
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

};

export const addStatistics = (academic_year, total_placements, average_package, highest_package, companies_visited) => {
  const sql = `INSERT INTO placement_statistics 
                 (academic_year, total_placements, average_package, highest_package, companies_visited) 
                 VALUES (?, ?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.query(sql, [academic_year, total_placements, average_package, highest_package, companies_visited], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

export const deleteStatistics = (id) => {
  const sql = "DELETE FROM placement_statistics WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

export const updateStatistics = (id, academic_year, total_placements, average_package, highest_package, companies_visited) => {
  const sql = `UPDATE placement_statistics 
                 SET academic_year = ?, 
                     total_placements = ?, 
                     average_package = ?, 
                     highest_package = ?, 
                     companies_visited = ? 
                 WHERE id = ?`;
  return new Promise((resolve, reject) => {
    db.query(sql, [academic_year, total_placements, average_package, highest_package, companies_visited, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Recruiters Model
export const getRecruiters = () => {
  const sql = "SELECT * FROM placement_recruiters ORDER BY created_at DESC";
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

};

export const addRecruiter = (company_name, logo_path, description) => {
  const sql = `INSERT INTO placement_recruiters (company_name, logo_path, description) 
               VALUES (?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.query(sql, [company_name, logo_path, description], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

export const deleteRecruiter = (id) => {
  const selectSql = "SELECT logo_path FROM placement_recruiters WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(selectSql, [id], (err, result) => {
      if (err) return reject(err);
      const deleteSql = "DELETE FROM placement_recruiters WHERE id = ?";
      db.query(deleteSql, [id], (deleteErr, deleteResult) => {
        if (deleteErr) return reject(deleteErr);
        resolve({ logo_path: result[0]?.logo_path, deleteResult });
      });
    });
  });
};

export const updateRecruiter = (id, company_name, description, logo_path) => {
  const sql = `UPDATE placement_recruiters 
               SET company_name = ?, description = ?, logo_path = ? 
               WHERE id = ?`;
  return new Promise((resolve, reject) => {
    db.query(sql, [company_name, description, logo_path, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
