import db from "../../config/db.js";

const DeptPdfModel = {
  getAllByDepartmentAndSection: (department, section) => {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM dept_Pdf_files WHERE department = ? AND section = ? ORDER BY created_at DESC";
      db.promise().query(query, [department, section], (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Transform the results to include proper PDF URL
          const transformedResults = results.map((result) => ({
            ...result,
            pdfUrl: `/cdn/department/${department}/${section}/${result.filename}`,
          }));
          resolve(transformedResults);
        }
      });
    });
  },

  create: (department, section, title, filename) => {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO dept_Pdf_files (department, section, title, filename) VALUES (?, ?, ?, ?)";
      db.promise().query(
        query,
        [department, section, title, filename],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              id: results.insertId,
              department,
              section,
              title,
              filename,
            });
          }
        }
      );
    });
  },

  deleteById: (id) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM dept_Pdf_files WHERE id = ?";
      db.promise().query(query, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM dept_Pdf_files WHERE id = ?";
      db.promise().query(query, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

  updateById: (id, title) => {
    return new Promise((resolve, reject) => {
      const query =
        "UPDATE dept_Pdf_files SET title = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
      db.promise().query(query, [title, id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
};

export default DeptPdfModel;
