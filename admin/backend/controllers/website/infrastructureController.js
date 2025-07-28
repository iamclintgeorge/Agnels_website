import { InfrastructureModel, upload } from '../../models/website/infrastructureModel.js';
import path from 'path';
import fs from 'fs';

const InfrastructureController = {
  // Get all infrastructures for a specific department (public endpoint)
  getByDepartment: async (req, res) => {
    try {
      const { departmentId } = req.params;
      
      if (!departmentId) {
        return res.status(400).json({
          success: false,
          message: 'Department ID is required'
        });
      }
      
      const infrastructures = await InfrastructureModel.getByDepartment(departmentId);
      
      res.json({
        success: true,
        data: infrastructures,
        message: 'Infrastructures retrieved successfully'
      });
    } catch (error) {
      console.error('Error getting infrastructures by department:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve infrastructures',
        error: error.message
      });
    }
  },

  // Get infrastructure by ID (public endpoint)
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Infrastructure ID is required'
        });
      }
      
      const infrastructure = await InfrastructureModel.getById(id);
      
      if (!infrastructure) {
        return res.status(404).json({
          success: false,
          message: 'Infrastructure not found'
        });
      }
      
      res.json({
        success: true,
        data: infrastructure,
        message: 'Infrastructure retrieved successfully'
      });
    } catch (error) {
      console.error('Error getting infrastructure by ID:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve infrastructure',
        error: error.message
      });
    }
  },

  // Get all infrastructures (admin endpoint)
  getAll: async (req, res) => {
    try {
      const infrastructures = await InfrastructureModel.getAll();
      
      res.json({
        success: true,
        data: infrastructures,
        message: 'All infrastructures retrieved successfully'
      });
    } catch (error) {
      console.error('Error getting all infrastructures:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve infrastructures',
        error: error.message
      });
    }
  },

  // Create new infrastructure (admin endpoint)
  create: async (req, res) => {
    try {
      const { name, description1, department_id } = req.body;
      const created_by = req.user?.id || 1; // Default to admin user
      
      // Validation
      if (!name || !description1 || !department_id) {
        return res.status(400).json({
          success: false,
          message: 'Name, description, and department ID are required'
        });
      }
      
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Infrastructure image is required'
        });
      }
      
      // Construct image path
      const imagePath = `images/infrastructure/${req.file.filename}`;
      
      const infrastructureData = {
        name: name.trim(),
        description1: description1.trim(),
        image: imagePath,
        department_id: parseInt(department_id),
        created_by
      };
      
      const newInfrastructure = await InfrastructureModel.create(infrastructureData);
      
      res.status(201).json({
        success: true,
        data: newInfrastructure,
        message: 'Infrastructure created successfully'
      });
    } catch (error) {
      console.error('Error creating infrastructure:', error);
      
      // Delete uploaded file if there was an error
      if (req.file) {
        const filePath = path.join('public/images/infrastructure/', req.file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      
      res.status(500).json({
        success: false,
        message: 'Failed to create infrastructure',
        error: error.message
      });
    }
  },

  // Update infrastructure (admin endpoint)
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description1 } = req.body;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Infrastructure ID is required'
        });
      }
      
      // Validation
      if (!name || !description1) {
        return res.status(400).json({
          success: false,
          message: 'Name and description are required'
        });
      }
      
      const updateData = {
        name: name.trim(),
        description1: description1.trim()
      };
      
      const updatedInfrastructure = await InfrastructureModel.update(id, updateData);
      
      res.json({
        success: true,
        data: updatedInfrastructure,
        message: 'Infrastructure updated successfully'
      });
    } catch (error) {
      console.error('Error updating infrastructure:', error);
      
      if (error.message === 'Infrastructure not found') {
        return res.status(404).json({
          success: false,
          message: 'Infrastructure not found'
        });
      }
      
      res.status(500).json({
        success: false,
        message: 'Failed to update infrastructure',
        error: error.message
      });
    }
  },

  // Delete infrastructure (admin endpoint)
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Infrastructure ID is required'
        });
      }
      
      const result = await InfrastructureModel.delete(id);
      
      res.json({
        success: true,
        data: result,
        message: 'Infrastructure deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting infrastructure:', error);
      
      if (error.message === 'Infrastructure not found') {
        return res.status(404).json({
          success: false,
          message: 'Infrastructure not found'
        });
      }
      
      res.status(500).json({
        success: false,
        message: 'Failed to delete infrastructure',
        error: error.message
      });
    }
  },

  // Get infrastructure count by department (admin endpoint)
  getCountByDepartment: async (req, res) => {
    try {
      const { departmentId } = req.params;
      
      if (!departmentId) {
        return res.status(400).json({
          success: false,
          message: 'Department ID is required'
        });
      }
      
      const count = await InfrastructureModel.getCountByDepartment(departmentId);
      
      res.json({
        success: true,
        data: { count },
        message: 'Infrastructure count retrieved successfully'
      });
    } catch (error) {
      console.error('Error getting infrastructure count:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve infrastructure count',
        error: error.message
      });
    }
  },

  // Get latest infrastructures (admin endpoint)
  getLatest: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const infrastructures = await InfrastructureModel.getLatest(limit);
      
      res.json({
        success: true,
        data: infrastructures,
        message: 'Latest infrastructures retrieved successfully'
      });
    } catch (error) {
      console.error('Error getting latest infrastructures:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve latest infrastructures',
        error: error.message
      });
    }
  },

  // Search infrastructures (admin endpoint)
  search: async (req, res) => {
    try {
      const { q: searchTerm, department_id } = req.query;
      
      if (!searchTerm) {
        return res.status(400).json({
          success: false,
          message: 'Search term is required'
        });
      }
      
      const infrastructures = await InfrastructureModel.search(searchTerm, department_id);
      
      res.json({
        success: true,
        data: infrastructures,
        message: 'Search results retrieved successfully'
      });
    } catch (error) {
      console.error('Error searching infrastructures:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to search infrastructures',
        error: error.message
      });
    }
  },

  // Get infrastructure statistics (admin endpoint)
  getStats: async (req, res) => {
    try {
      const stats = await InfrastructureModel.getStats();
      
      res.json({
        success: true,
        data: stats,
        message: 'Infrastructure statistics retrieved successfully'
      });
    } catch (error) {
      console.error('Error getting infrastructure statistics:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve infrastructure statistics',
        error: error.message
      });
    }
  },

  // Bulk delete infrastructures by department (admin endpoint)
  deleteByDepartment: async (req, res) => {
    try {
      const { departmentId } = req.params;
      
      if (!departmentId) {
        return res.status(400).json({
          success: false,
          message: 'Department ID is required'
        });
      }
      
      const result = await InfrastructureModel.deleteByDepartment(departmentId);
      
      res.json({
        success: true,
        data: result,
        message: `${result.deletedCount} infrastructures deleted successfully`
      });
    } catch (error) {
      console.error('Error deleting infrastructures by department:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete infrastructures',
        error: error.message
      });
    }
  }
};

export { InfrastructureController, upload }; 