import axios from "axios";

const API_BASE_URL = "http://localhost:3663/api";

// Configure axios defaults
axios.defaults.withCredentials = true;

export const aboutUsService = {
  // Get all sections
  async getAllSections() {
    try {
      const response = await axios.get(`${API_BASE_URL}/aboutus/sections`);
      return response.data.data || response.data;
    } catch (error) {
      console.error("Error fetching About Us sections:", error);
      throw new Error("Failed to fetch About Us sections");
    }
  },

  // Get specific section
  async getSection(sectionName) {
    try {
      const response = await axios.get(`${API_BASE_URL}/aboutus/sections/${sectionName}`);
      return response.data.data || response.data;
    } catch (error) {
      console.error("Error fetching About Us section:", error);
      throw new Error("Failed to fetch About Us section");
    }
  },

  // Update section content
  async updateSection(sectionName, content) {
    try {
      const response = await axios.put(`${API_BASE_URL}/aboutus/sections/${sectionName}`, {
        content: JSON.stringify(content)
      });
      return response.data;
    } catch (error) {
      console.error("Error updating About Us section:", error);
      throw new Error("Failed to update About Us section");
    }
  },

  // Create new section
  async createSection(sectionName, content) {
    try {
      const response = await axios.post(`${API_BASE_URL}/aboutus/sections`, {
        section_name: sectionName,
        content: JSON.stringify(content)
      });
      return response.data;
    } catch (error) {
      console.error("Error creating About Us section:", error);
      throw new Error("Failed to create About Us section");
    }
  },

  // Delete section
  async deleteSection(sectionName) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/aboutus/sections/${sectionName}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting About Us section:", error);
      throw new Error("Failed to delete About Us section");
    }
  },

  // Upload file (PDFs, documents)
  async uploadFile(file) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${API_BASE_URL}/aboutus/upload/file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.url || response.data.filePath;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("Failed to upload file");
    }
  },

  // Upload image
  async uploadImage(file) {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(`${API_BASE_URL}/aboutus/upload/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.url || response.data.imagePath;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  },

  // Get section templates/structures
  async getSectionTemplates() {
    try {
      const response = await axios.get(`${API_BASE_URL}/aboutus/templates`);
      return response.data.data || response.data;
    } catch (error) {
      console.error("Error fetching section templates:", error);
      throw new Error("Failed to fetch section templates");
    }
  },

  // Bulk update sections
  async bulkUpdateSections(sections) {
    try {
      const response = await axios.put(`${API_BASE_URL}/aboutus/sections/bulk`, {
        sections
      });
      return response.data;
    } catch (error) {
      console.error("Error bulk updating sections:", error);
      throw new Error("Failed to bulk update sections");
    }
  },

  // Get section history/revisions
  async getSectionHistory(sectionName) {
    try {
      const response = await axios.get(`${API_BASE_URL}/aboutus/sections/${sectionName}/history`);
      return response.data.data || response.data;
    } catch (error) {
      console.error("Error fetching section history:", error);
      throw new Error("Failed to fetch section history");
    }
  },

  // Publish/unpublish section
  async toggleSectionVisibility(sectionName, isVisible) {
    try {
      const response = await axios.patch(`${API_BASE_URL}/aboutus/sections/${sectionName}/visibility`, {
        is_visible: isVisible
      });
      return response.data;
    } catch (error) {
      console.error("Error toggling section visibility:", error);
      throw new Error("Failed to toggle section visibility");
    }
  },
}; 