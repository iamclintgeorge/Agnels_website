import axios from "axios";

const API_BASE_URL = "http://localhost:3663/api";

// Configure axios defaults
axios.defaults.withCredentials = true;

export const roleService = {
  // Get all roles
  async getRoles() {
    try {
      const response = await axios.get(`${API_BASE_URL}/roles`);
      return response.data.data || response.data;
    } catch (error) {
      console.error("Error fetching roles:", error);
      throw new Error("Failed to fetch roles");
    }
  },

  // Create a new role
  async createRole(roleData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/roles`, roleData);
      return response.data;
    } catch (error) {
      console.error("Error creating role:", error);
      throw new Error("Failed to create role");
    }
  },

  // Update an existing role
  async updateRole(roleId, roleData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/roles/${roleId}`, roleData);
      return response.data;
    } catch (error) {
      console.error("Error updating role:", error);
      throw new Error("Failed to update role");
    }
  },

  // Delete a role
  async deleteRole(roleId) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/roles/${roleId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting role:", error);
      throw new Error("Failed to delete role");
    }
  },

  // Get all available permissions
  async getPermissions() {
    try {
      const response = await axios.get(`${API_BASE_URL}/permissions`);
      return response.data.data || response.data;
    } catch (error) {
      console.error("Error fetching permissions:", error);
      throw new Error("Failed to fetch permissions");
    }
  },

  // Bulk update roles (for backward compatibility)
  async updateAllRoles(roles) {
    try {
      const response = await axios.put(`${API_BASE_URL}/roles`, { roles });
      return response.data;
    } catch (error) {
      console.error("Error updating all roles:", error);
      throw new Error("Failed to update roles");
    }
  },
}; 