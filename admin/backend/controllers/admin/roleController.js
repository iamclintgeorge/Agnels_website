import {
  getAllRoles,
  getRoleById,
  getRoleByName,
  createRole,
  updateRole,
  deleteRole,
  getAllPermissions,
  createPermission,
  updateUserRole,
  getUsersByRole,
} from "../../models/admin/roleModel.js";

// Get all roles
export const getAllRolesController = async (req, res) => {
  try {
    const roles = await getAllRoles();
    res.json({
      success: true,
      data: roles
    });
  } catch (error) {
    console.error("Error in getAllRolesController:", error);
    res.status(500).json({ 
      success: false,
      error: "Error fetching roles" 
    });
  }
};

// Get role by ID
export const getRoleByIdController = async (req, res) => {
  try {
    const { roleId } = req.params;
    
    if (!roleId) {
      return res.status(400).json({ 
        success: false,
        error: "Role ID is required" 
      });
    }

    const role = await getRoleById(roleId);
    
    if (!role) {
      return res.status(404).json({ 
        success: false,
        error: "Role not found" 
      });
    }

    res.json({
      success: true,
      data: role
    });
  } catch (error) {
    console.error("Error in getRoleByIdController:", error);
    res.status(500).json({ 
      success: false,
      error: "Error fetching role" 
    });
  }
};

// Create new role
export const createRoleController = async (req, res) => {
  try {
    const roleData = req.body;
    
    // Validate required fields
    if (!roleData.name || !roleData.displayName) {
      return res.status(400).json({ 
        success: false,
        error: "Role name and display name are required" 
      });
    }

    // Check if role name already exists
    const existingRole = await getRoleByName(roleData.name);
    if (existingRole) {
      return res.status(409).json({ 
        success: false,
        error: "Role with this name already exists" 
      });
    }

    const newRoleData = {
      role_name: roleData.name,
      display_name: roleData.displayName,
      permissions: roleData.permissions || [],
      is_system_role: roleData.isSystemRole || 0
    };

    const newRole = await createRole(newRoleData);
    res.status(201).json({
      success: true,
      data: newRole,
      message: "Role created successfully"
    });
  } catch (error) {
    console.error("Error in createRoleController:", error);
    res.status(500).json({ 
      success: false,
      error: "Error creating role" 
    });
  }
};

// Update role
export const updateRoleController = async (req, res) => {
  try {
    const { roleId } = req.params;
    const roleData = req.body;
    
    if (!roleId) {
      return res.status(400).json({ 
        success: false,
        error: "Role ID is required" 
      });
    }

    // Check if role exists
    const existingRole = await getRoleById(roleId);
    if (!existingRole) {
      return res.status(404).json({ 
        success: false,
        error: "Role not found" 
      });
    }

    // Prevent modification of system roles
    if (existingRole.is_system_role && roleData.name !== existingRole.role_name) {
      return res.status(403).json({ 
        success: false,
        error: "Cannot modify system role name" 
      });
    }

    const updateData = {
      role_name: roleData.name || existingRole.role_name,
      display_name: roleData.displayName || existingRole.display_name,
      permissions: roleData.permissions || existingRole.permissions,
      is_system_role: existingRole.is_system_role
    };

    const success = await updateRole(roleId, updateData);
    
    if (!success) {
      return res.status(400).json({ 
        success: false,
        error: "Failed to update role" 
      });
    }

    res.json({
      success: true,
      message: "Role updated successfully"
    });
  } catch (error) {
    console.error("Error in updateRoleController:", error);
    res.status(500).json({ 
      success: false,
      error: "Error updating role" 
    });
  }
};

// Delete role
export const deleteRoleController = async (req, res) => {
  try {
    const { roleId } = req.params;
    
    if (!roleId) {
      return res.status(400).json({ 
        success: false,
        error: "Role ID is required" 
      });
    }

    const success = await deleteRole(roleId);
    
    if (!success) {
      return res.status(400).json({ 
        success: false,
        error: "Failed to delete role or role not found" 
      });
    }

    res.json({
      success: true,
      message: "Role deleted successfully"
    });
  } catch (error) {
    console.error("Error in deleteRoleController:", error);
    
    if (error.message === "Cannot delete system role") {
      return res.status(403).json({ 
        success: false,
        error: "Cannot delete system role" 
      });
    }
    
    res.status(500).json({ 
      success: false,
      error: "Error deleting role" 
    });
  }
};

// Get all permissions
export const getAllPermissionsController = async (req, res) => {
  try {
    const permissions = await getAllPermissions();
    res.json({
      success: true,
      data: permissions
    });
  } catch (error) {
    console.error("Error in getAllPermissionsController:", error);
    res.status(500).json({ 
      success: false,
      error: "Error fetching permissions" 
    });
  }
};

// Create permission
export const createPermissionController = async (req, res) => {
  try {
    const permissionData = req.body;
    
    // Validate required fields
    if (!permissionData.permission_name || !permissionData.display_name) {
      return res.status(400).json({ 
        success: false,
        error: "Permission name and display name are required" 
      });
    }

    const newPermission = await createPermission(permissionData);
    res.status(201).json({
      success: true,
      data: newPermission,
      message: "Permission created successfully"
    });
  } catch (error) {
    console.error("Error in createPermissionController:", error);
    res.status(500).json({ 
      success: false,
      error: "Error creating permission" 
    });
  }
};

// Update user role
export const updateUserRoleController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { roleId } = req.body;
    
    if (!userId || !roleId) {
      return res.status(400).json({ 
        success: false,
        error: "User ID and Role ID are required" 
      });
    }

    const success = await updateUserRole(userId, roleId);
    
    if (!success) {
      return res.status(400).json({ 
        success: false,
        error: "Failed to update user role" 
      });
    }

    res.json({
      success: true,
      message: "User role updated successfully"
    });
  } catch (error) {
    console.error("Error in updateUserRoleController:", error);
    res.status(500).json({ 
      success: false,
      error: "Error updating user role" 
    });
  }
};

// Get users by role
export const getUsersByRoleController = async (req, res) => {
  try {
    const { roleName } = req.params;
    
    if (!roleName) {
      return res.status(400).json({ 
        success: false,
        error: "Role name is required" 
      });
    }

    const users = await getUsersByRole(roleName);
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error("Error in getUsersByRoleController:", error);
    res.status(500).json({ 
      success: false,
      error: "Error fetching users by role" 
    });
  }
};

// Bulk update roles (for backward compatibility)
export const bulkUpdateRolesController = async (req, res) => {
  try {
    const { roles } = req.body;
    
    if (!roles || !Array.isArray(roles)) {
      return res.status(400).json({ 
        success: false,
        error: "Roles array is required" 
      });
    }

    // Process each role update
    for (const role of roles) {
      if (role.id) {
        const updateData = {
          role_name: role.name,
          display_name: role.displayName,
          permissions: role.permissions,
          is_system_role: role.isSystemRole || 0
        };
        await updateRole(role.id, updateData);
      }
    }

    res.json({
      success: true,
      message: "Roles updated successfully"
    });
  } catch (error) {
    console.error("Error in bulkUpdateRolesController:", error);
    res.status(500).json({ 
      success: false,
      error: "Error updating roles" 
    });
  }
}; 