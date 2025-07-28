import db from '../../config/db.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'public/images/infrastructure/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'infrastructure-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

const InfrastructureModel = {
  // Get all infrastructures for a specific department
  getByDepartment: async (departmentId) => {
    try {
      const [rows] = await db.promise().query(
        'SELECT * FROM infrastructures WHERE department_id = ? ORDER BY created_timestamp DESC',
        [departmentId]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get infrastructure by ID
  getById: async (id) => {
    try {
      const [rows] = await db.promise().query(
        'SELECT * FROM infrastructures WHERE id = ?',
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Get all infrastructures (for admin overview)
  getAll: async () => {
    try {
      const [rows] = await db.promise().query(`
        SELECT i.*, d.name as department_name 
        FROM infrastructures i 
        LEFT JOIN departments d ON i.department_id = d.id 
        ORDER BY i.created_timestamp DESC
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Create new infrastructure
  create: async (infrastructureData) => {
    const { name, description1, image, department_id, created_by } = infrastructureData;
    
    try {
      const [result] = await db.promise().query(
        'INSERT INTO infrastructures (name, description1, image, department_id, created_by) VALUES (?, ?, ?, ?, ?)',
        [name, description1, image, department_id, created_by]
      );
      
      return {
        id: result.insertId,
        name,
        description1,
        image,
        department_id,
        created_by
      };
    } catch (error) {
      throw error;
    }
  },

  // Update infrastructure (only name and description)
  update: async (id, updateData) => {
    const { name, description1 } = updateData;
    
    try {
      const [result] = await db.promise().query(
        'UPDATE infrastructures SET name = ?, description1 = ? WHERE id = ?',
        [name, description1, id]
      );
      
      if (result.affectedRows === 0) {
        throw new Error('Infrastructure not found');
      }
      
      return { id, name, description1 };
    } catch (error) {
      throw error;
    }
  },

  // Delete infrastructure
  delete: async (id) => {
    try {
      // First get the infrastructure to get the image path
      const infrastructure = await InfrastructureModel.getById(id);
      
      if (!infrastructure) {
        throw new Error('Infrastructure not found');
      }
      
      // Delete from database
      const [result] = await db.promise().query(
        'DELETE FROM infrastructures WHERE id = ?',
        [id]
      );
      
      if (result.affectedRows === 0) {
        throw new Error('Infrastructure not found');
      }
      
      // Delete image file if it exists
      if (infrastructure.image) {
        const imagePath = path.join('public', infrastructure.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      
      return { id, deleted: true };
    } catch (error) {
      throw error;
    }
  },

  // Get infrastructure count by department
  getCountByDepartment: async (departmentId) => {
    try {
      const [rows] = await db.promise().query(
        'SELECT COUNT(*) as count FROM infrastructures WHERE department_id = ?',
        [departmentId]
      );
      return rows[0].count;
    } catch (error) {
      throw error;
    }
  },

  // Get latest infrastructures (for dashboard)
  getLatest: async (limit = 10) => {
    try {
      const [rows] = await db.promise().query(`
        SELECT i.*, d.name as department_name 
        FROM infrastructures i 
        LEFT JOIN departments d ON i.department_id = d.id 
        ORDER BY i.created_timestamp DESC 
        LIMIT ?
      `, [limit]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Bulk delete infrastructures by department
  deleteByDepartment: async (departmentId) => {
    try {
      // Get all infrastructures for this department to delete their images
      const infrastructures = await InfrastructureModel.getByDepartment(departmentId);
      
      // Delete images
      infrastructures.forEach(infra => {
        if (infra.image) {
          const imagePath = path.join('public', infra.image);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }
      });
      
      // Delete from database
      const [result] = await db.promise().query(
        'DELETE FROM infrastructures WHERE department_id = ?',
        [departmentId]
      );
      
      return { deletedCount: result.affectedRows };
    } catch (error) {
      throw error;
    }
  },

  // Search infrastructures
  search: async (searchTerm, departmentId = null) => {
    try {
      let query = `
        SELECT i.*, d.name as department_name 
        FROM infrastructures i 
        LEFT JOIN departments d ON i.department_id = d.id 
        WHERE (i.name LIKE ? OR i.description1 LIKE ?)
      `;
      let params = [`%${searchTerm}%`, `%${searchTerm}%`];
      
      if (departmentId) {
        query += ' AND i.department_id = ?';
        params.push(departmentId);
      }
      
      query += ' ORDER BY i.created_timestamp DESC';
      
      const [rows] = await db.promise().query(query, params);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get infrastructure statistics
  getStats: async () => {
    try {
      const [totalRows] = await db.promise().query('SELECT COUNT(*) as total FROM infrastructures');
      const [deptRows] = await db.promise().query(`
        SELECT d.name as department_name, COUNT(i.id) as count 
        FROM departments d 
        LEFT JOIN infrastructures i ON d.id = i.department_id 
        GROUP BY d.id, d.name
      `);
      
      return {
        total: totalRows[0].total,
        byDepartment: deptRows
      };
    } catch (error) {
      throw error;
    }
  }
};

export { InfrastructureModel, upload }; 