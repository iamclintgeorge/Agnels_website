import db from "../../config/db.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../../public/cdn/department");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Accept all file types for department documents
  cb(null, true);
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

class DepartmentModel {
  // DEPT_TEXT OPERATIONS
  static async createDeptText(departmentId, section, content, createdBy) {
    try {
      const [result] = await db
        .promise()
        .query(
          "INSERT INTO dept_text (department_id, section, content, created_by) VALUES (?, ?, ?, ?)",
          [departmentId, section, content, createdBy]
        );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getDeptText(departmentId, section) {
    try {
      const [rows] = await db
        .promise()
        .query(
          "SELECT * FROM dept_text WHERE department_id = ? AND section = ? ORDER BY updated_at DESC LIMIT 1",
          [departmentId, section]
        );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  static async updateDeptText(id, content) {
    try {
      const [result] = await db
        .promise()
        .query("UPDATE dept_text SET content = ? WHERE id = ?", [content, id]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteDeptText(id) {
    try {
      const [result] = await db
        .promise()
        .query("DELETE FROM dept_text WHERE id = ?", [id]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // DEPT_COMMITTEES OPERATIONS
  static async createCommittee(
    type,
    departmentId,
    year,
    attachment,
    createdBy
  ) {
    try {
      const [result] = await db
        .promise()
        .query(
          "INSERT INTO dept_committees (type, department_id, year, attachment, created_by) VALUES (?, ?, ?, ?, ?)",
          [type, departmentId, year, attachment, createdBy]
        );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getCommittees(departmentId, type = null) {
    try {
      let query = "SELECT * FROM dept_committees WHERE department_id = ?";
      let params = [departmentId];

      if (type) {
        query += " AND type = ?";
        params.push(type);
      }

      query += " ORDER BY year DESC, created_timestamp DESC";

      const [rows] = await db.promise().query(query, params);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async updateCommittee(id, year, attachment = null) {
    try {
      let query = "UPDATE dept_committees SET year = ?";
      let params = [year];

      if (attachment) {
        query += ", attachment = ?";
        params.push(attachment);
      }

      query += " WHERE id = ?";
      params.push(id);

      const [result] = await db.promise().query(query, params);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteCommittee(id) {
    try {
      // Get file path before deletion
      const [rows] = await db
        .promise()
        .query("SELECT attachment FROM dept_committees WHERE id = ?", [id]);

      const [result] = await db
        .promise()
        .query("DELETE FROM dept_committees WHERE id = ?", [id]);

      // Delete file if exists
      if (rows[0]?.attachment && !rows[0].attachment.startsWith("http")) {
        const filePath = path.join(
          __dirname,
          "../../public/cdn/department",
          rows[0].attachment
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  // DEPT_PUBLICATIONS OPERATIONS
  static async createPublication(departmentId, year, attachment, createdBy) {
    try {
      const [result] = await db
        .promise()
        .query(
          "INSERT INTO dept_publications (department_id, year, attachment, created_by) VALUES (?, ?, ?, ?)",
          [departmentId, year, attachment, createdBy]
        );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getPublications(departmentId) {
    try {
      const [rows] = await db
        .promise()
        .query(
          "SELECT * FROM dept_publications WHERE department_id = ? ORDER BY year DESC, created_timestamp DESC",
          [departmentId]
        );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async updatePublication(id, year, attachment = null) {
    try {
      let query = "UPDATE dept_publications SET year = ?";
      let params = [year];

      if (attachment) {
        query += ", attachment = ?";
        params.push(attachment);
      }

      query += " WHERE id = ?";
      params.push(id);

      const [result] = await db.promise().query(query, params);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deletePublication(id) {
    try {
      const [rows] = await db
        .promise()
        .query("SELECT attachment FROM dept_publications WHERE id = ?", [id]);

      const [result] = await db
        .promise()
        .query("DELETE FROM dept_publications WHERE id = ?", [id]);

      if (rows[0]?.attachment && !rows[0].attachment.startsWith("http")) {
        const filePath = path.join(
          __dirname,
          "../../public/cdn/department",
          rows[0].attachment
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  // MAGAZINES OPERATIONS
  static async createMagazine(departmentId, year, attachment, createdBy) {
    try {
      const [result] = await db
        .promise()
        .query(
          "INSERT INTO magzines (department_id, year, attachment, created_by) VALUES (?, ?, ?, ?)",
          [departmentId, year, attachment, createdBy]
        );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getMagazines(departmentId) {
    try {
      const [rows] = await db
        .promise()
        .query(
          "SELECT * FROM magzines WHERE department_id = ? ORDER BY year DESC, created_timestamp DESC",
          [departmentId]
        );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async updateMagazine(id, year, attachment = null) {
    try {
      let query = "UPDATE magzines SET year = ?";
      let params = [year];

      if (attachment) {
        query += ", attachment = ?";
        params.push(attachment);
      }

      query += " WHERE id = ?";
      params.push(id);

      const [result] = await db.promise().query(query, params);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteMagazine(id) {
    try {
      const [rows] = await db
        .promise()
        .query("SELECT attachment FROM magzines WHERE id = ?", [id]);

      const [result] = await db
        .promise()
        .query("DELETE FROM magzines WHERE id = ?", [id]);

      if (rows[0]?.attachment && !rows[0].attachment.startsWith("http")) {
        const filePath = path.join(
          __dirname,
          "../../public/cdn/department",
          rows[0].attachment
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  // TIME_TABLES OPERATIONS
  static async createTimeTable(
    departmentId,
    type,
    division,
    semester,
    attachment,
    createdBy
  ) {
    try {
      const [result] = await db
        .promise()
        .query(
          "INSERT INTO time_tables (department_id, type, division, semester, attachment) VALUES (?, ?, ?, ?, ?)",
          [departmentId, type, division, semester, attachment, createdBy]
        );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getTimeTables(departmentId, type = null, semester = null) {
    try {
      let query = "SELECT * FROM time_tables WHERE department_id = ?";
      let params = [departmentId];

      if (type) {
        query += " AND type = ?";
        params.push(type);
      }

      if (semester) {
        query += " AND semester = ?";
        params.push(semester);
      }

      // query += " ORDER BY semester DESC, created_timestamp DESC";

      const [rows] = await db.promise().query(query, params);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async updateTimeTable(
    id,
    type,
    division,
    semester,
    attachment = null
  ) {
    try {
      let query = "UPDATE time_tables SET type = ?, division = ?, semester = ?";
      let params = [type, division, semester];

      if (attachment) {
        query += ", attachment = ?";
        params.push(attachment);
      }

      query += " WHERE id = ?";
      params.push(id);

      const [result] = await db.promise().query(query, params);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteTimeTable(id) {
    try {
      const [rows] = await db
        .promise()
        .query("SELECT attachment FROM time_tables WHERE id = ?", [id]);

      const [result] = await db
        .promise()
        .query("DELETE FROM time_tables WHERE id = ?", [id]);

      if (rows[0]?.attachment && !rows[0].attachment.startsWith("http")) {
        const filePath = path.join(
          __dirname,
          "../../public/cdn/department",
          rows[0].attachment
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  // ACHIEVEMENTS OPERATIONS
  static async createAchievement(
    type,
    departmentId,
    year,
    attachment,
    createdBy
  ) {
    try {
      const [result] = await db
        .promise()
        .query(
          "INSERT INTO achievements (type, department_id, year, attachment, created_by) VALUES (?, ?, ?, ?, ?)",
          [type, departmentId, year, attachment, createdBy]
        );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getAchievements(departmentId, type = null) {
    try {
      let query = "SELECT * FROM achievements WHERE department_id = ?";
      let params = [departmentId];

      if (type) {
        query += " AND type = ?";
        params.push(type);
      }

      query += " ORDER BY year DESC, created_timestamp DESC";

      const [rows] = await db.promise().query(query, params);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async updateAchievement(id, year, attachment = null) {
    try {
      let query = "UPDATE achievements SET year = ?";
      let params = [year];

      if (attachment) {
        query += ", attachment = ?";
        params.push(attachment);
      }

      query += " WHERE id = ?";
      params.push(id);

      const [result] = await db.promise().query(query, params);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteAchievement(id) {
    try {
      const [rows] = await db
        .promise()
        .query("SELECT attachment FROM achievements WHERE id = ?", [id]);

      const [result] = await db
        .promise()
        .query("DELETE FROM achievements WHERE id = ?", [id]);

      if (rows[0]?.attachment && !rows[0].attachment.startsWith("http")) {
        const filePath = path.join(
          __dirname,
          "../../public/cdn/department",
          rows[0].attachment
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  // ACADEMIC_CALENDARS OPERATIONS
  static async createAcademicCalendar(
    type,
    departmentId,
    attachment,
    createdBy
  ) {
    try {
      const [result] = await db
        .promise()
        .query(
          "INSERT INTO academic_calendars (type, department_id, attachment, created_by) VALUES (?, ?, ?, ?)",
          [type, departmentId, attachment, createdBy]
        );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getAcademicCalendars(departmentId, type = null) {
    try {
      let query = "SELECT * FROM academic_calendars WHERE department_id = ?";
      let params = [departmentId];

      if (type) {
        query += " AND type = ?";
        params.push(type);
      }

      query += " ORDER BY created_timestamp DESC";

      const [rows] = await db.promise().query(query, params);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async updateAcademicCalendar(id, attachment) {
    try {
      const [result] = await db
        .promise()
        .query("UPDATE academic_calendars SET attachment = ? WHERE id = ?", [
          attachment,
          id,
        ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteAcademicCalendar(id) {
    try {
      const [rows] = await db
        .promise()
        .query("SELECT attachment FROM academic_calendars WHERE id = ?", [id]);

      const [result] = await db
        .promise()
        .query("DELETE FROM academic_calendars WHERE id = ?", [id]);

      if (rows[0]?.attachment && !rows[0].attachment.startsWith("http")) {
        const filePath = path.join(
          __dirname,
          "../../public/cdn/department",
          rows[0].attachment
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  // ACTIVITIES OPERATIONS
  static async createActivity(departmentId, heading, attachment, createdBy) {
    try {
      const [result] = await db
        .promise()
        .query(
          "INSERT INTO activities (department_id, heading, attachment, created_by) VALUES (?, ?, ?, ?)",
          [departmentId, heading, attachment, createdBy]
        );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getActivities(departmentId) {
    try {
      const [rows] = await db
        .promise()
        .query(
          "SELECT * FROM activities WHERE department_id = ? ORDER BY created_timestamp DESC",
          [departmentId]
        );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async updateActivity(id, heading, attachment = null) {
    try {
      let query = "UPDATE activities SET heading = ?";
      let params = [heading];

      if (attachment) {
        query += ", attachment = ?";
        params.push(attachment);
      }

      query += " WHERE id = ?";
      params.push(id);

      const [result] = await db.promise().query(query, params);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteActivity(id) {
    try {
      const [rows] = await db
        .promise()
        .query("SELECT attachment FROM activities WHERE id = ?", [id]);

      const [result] = await db
        .promise()
        .query("DELETE FROM activities WHERE id = ?", [id]);

      if (rows[0]?.attachment && !rows[0].attachment.startsWith("http")) {
        const filePath = path.join(
          __dirname,
          "../../public/cdn/department",
          rows[0].attachment
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  // ASSOCIATIONS OPERATIONS
  static async createAssociation(departmentId, year, attachment, createdBy) {
    try {
      const [result] = await db
        .promise()
        .query(
          "INSERT INTO associations (department_id, year, attachment, created_by) VALUES (?, ?, ?, ?)",
          [departmentId, year, attachment, createdBy]
        );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getAssociations(departmentId) {
    try {
      const [rows] = await db
        .promise()
        .query(
          "SELECT * FROM associations WHERE department_id = ? ORDER BY year DESC, created_timestamp DESC",
          [departmentId]
        );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async updateAssociation(id, year, attachment = null) {
    try {
      let query = "UPDATE associations SET year = ?";
      let params = [year];

      if (attachment) {
        query += ", attachment = ?";
        params.push(attachment);
      }

      query += " WHERE id = ?";
      params.push(id);

      const [result] = await db.promise().query(query, params);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteAssociation(id) {
    try {
      const [rows] = await db
        .promise()
        .query("SELECT attachment FROM associations WHERE id = ?", [id]);

      const [result] = await db
        .promise()
        .query("DELETE FROM associations WHERE id = ?", [id]);

      if (rows[0]?.attachment && !rows[0].attachment.startsWith("http")) {
        const filePath = path.join(
          __dirname,
          "../../public/cdn/department",
          rows[0].attachment
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  // UNDERGRADUATE_PROJECTS OPERATIONS (BE level)
  static async createUndergraduateProject(departmentId, projects, createdBy) {
    try {
      const [result] = await db
        .promise()
        .query(
          "INSERT INTO undergraduate_projects (department_id, projects) VALUES (?, ?)",
          [departmentId, projects]
        );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getUndergraduateProjects(departmentId) {
    try {
      const [rows] = await db
        .promise()
        .query("SELECT * FROM undergraduate_projects WHERE department_id = ?", [
          departmentId,
        ]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async updateUndergraduateProject(id, projects) {
    try {
      const [result] = await db
        .promise()
        .query("UPDATE undergraduate_projects SET projects = ? WHERE id = ?", [
          projects,
          id,
        ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUndergraduateProject(id) {
    try {
      const [result] = await db
        .promise()
        .query("DELETE FROM undergraduate_projects WHERE id = ?", [id]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // MINI_PROJECTS OPERATIONS (TE and SE level)
  static async createMiniProject(departmentId, level, projects, createdBy) {
    try {
      const [result] = await db
        .promise()
        .query(
          "INSERT INTO mini_projects (department_id, level, projects, created_by) VALUES (?, ?, ?, ?)",
          [departmentId, level, projects, createdBy]
        );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getMiniProjects(departmentId, level = null) {
    try {
      let query = "SELECT * FROM mini_projects WHERE department_id = ?";
      let params = [departmentId];

      if (level) {
        query += " AND level = ?";
        params.push(level);
      }

      const [rows] = await db.promise().query(query, params);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async updateMiniProject(id, projects) {
    try {
      const [result] = await db
        .promise()
        .query("UPDATE mini_projects SET projects = ? WHERE id = ?", [
          projects,
          id,
        ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteMiniProject(id) {
    try {
      const [result] = await db
        .promise()
        .query("DELETE FROM mini_projects WHERE id = ?", [id]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // UTILITY METHODS
  static async getAllDepartmentData(departmentId) {
    try {
      const [
        committees,
        publications,
        magazines,
        timeTables,
        achievements,
        academicCalendars,
        activities,
        associations,
        undergraduateProjects,
        miniProjects,
        deptTexts,
      ] = await Promise.all([
        this.getCommittees(departmentId),
        this.getPublications(departmentId),
        this.getMagazines(departmentId),
        this.getTimeTables(departmentId),
        this.getAchievements(departmentId),
        this.getAcademicCalendars(departmentId),
        this.getActivities(departmentId),
        this.getAssociations(departmentId),
        this.getUndergraduateProjects(departmentId),
        this.getMiniProjects(departmentId),
        db
          .promise()
          .query("SELECT * FROM dept_text WHERE department_id = ?", [
            departmentId,
          ]),
      ]);

      return {
        committees,
        publications,
        magazines,
        timeTables,
        achievements,
        academicCalendars,
        activities,
        associations,
        undergraduateProjects,
        miniProjects,
        deptTexts: deptTexts[0],
      };
    } catch (error) {
      throw error;
    }
  }

  static async getStatistics(departmentId = null) {
    try {
      let whereClause = departmentId ? "WHERE department_id = ?" : "";
      let params = departmentId ? [departmentId] : [];

      const queries = [
        `SELECT COUNT(*) as count FROM dept_committees ${whereClause}`,
        `SELECT COUNT(*) as count FROM dept_publications ${whereClause}`,
        `SELECT COUNT(*) as count FROM magzines ${whereClause}`,
        `SELECT COUNT(*) as count FROM time_tables ${whereClause}`,
        `SELECT COUNT(*) as count FROM achievements ${whereClause}`,
        `SELECT COUNT(*) as count FROM academic_calendars ${whereClause}`,
        `SELECT COUNT(*) as count FROM activities ${whereClause}`,
        `SELECT COUNT(*) as count FROM associations ${whereClause}`,
        `SELECT COUNT(*) as count FROM undergraduate_projects ${whereClause}`,
        `SELECT COUNT(*) as count FROM mini_projects ${whereClause}`,
        `SELECT COUNT(*) as count FROM dept_text ${whereClause}`,
      ];

      const results = await Promise.all(
        queries.map((query) => db.promise().query(query, params))
      );

      return {
        committees: results[0][0][0].count,
        publications: results[1][0][0].count,
        magazines: results[2][0][0].count,
        timeTables: results[3][0][0].count,
        achievements: results[4][0][0].count,
        academicCalendars: results[5][0][0].count,
        activities: results[6][0][0].count,
        associations: results[7][0][0].count,
        undergraduateProjects: results[8][0][0].count,
        miniProjects: results[9][0][0].count,
        deptTexts: results[10][0][0].count,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default DepartmentModel;
