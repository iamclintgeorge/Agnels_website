import db from "../../config/db.js";

// Get all roles
export const getAllRoles = async () => {
  const query = `
    SELECT 
      id, 
      role_name, 
      display_name, 
      permissions, 
      is_system_role,
      created_at, 
      updated_at
    FROM roles 
    ORDER BY id ASC;
  `;

  try {
    const [rows] = await db.query(query);
    // Parse permissions JSON for each role
    return rows.map(role => ({
      ...role,
      permissions: role.permissions ? JSON.parse(role.permissions) : []
    }));
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

// Get role by ID
export const getRoleById = async (roleId) => {
  const query = `
    SELECT 
      id, 
      role_name, 
      display_name, 
      permissions, 
      is_system_role,
      created_at, 
      updated_at
    FROM roles 
    WHERE id = ?;
  `;

  try {
    const [rows] = await db.query(query, [roleId]);
    if (rows.length === 0) {
      return null;
    }
    
    const role = rows[0];
    return {
      ...role,
      permissions: role.permissions ? JSON.parse(role.permissions) : []
    };
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

// Get role by name
export const getRoleByName = async (roleName) => {
  const query = `
    SELECT 
      id, 
      role_name, 
      display_name, 
      permissions, 
      is_system_role,
      created_at, 
      updated_at
    FROM roles 
    WHERE role_name = ?;
  `;

  try {
    const [rows] = await db.query(query, [roleName]);
    if (rows.length === 0) {
      return null;
    }
    
    const role = rows[0];
    return {
      ...role,
      permissions: role.permissions ? JSON.parse(role.permissions) : []
    };
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

// Create new role
export const createRole = async (roleData) => {
  const query = `
    INSERT INTO roles (
      role_name, 
      display_name, 
      permissions, 
      is_system_role
    ) VALUES (?, ?, ?, ?);
  `;

  try {
    const permissionsJson = JSON.stringify(roleData.permissions || []);
    const [result] = await db.query(query, [
      roleData.role_name,
      roleData.display_name,
      permissionsJson,
      roleData.is_system_role || 0
    ]);
    
    return { id: result.insertId, ...roleData };
  } catch (error) {
    console.error("Database insert error:", error);
    throw error;
  }
};

// Update role
export const updateRole = async (roleId, roleData) => {
  const query = `
    UPDATE roles 
    SET 
      role_name = ?, 
      display_name = ?, 
      permissions = ?, 
      is_system_role = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?;
  `;

  try {
    const permissionsJson = JSON.stringify(roleData.permissions || []);
    const [result] = await db.query(query, [
      roleData.role_name,
      roleData.display_name,
      permissionsJson,
      roleData.is_system_role || 0,
      roleId
    ]);
    
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
};

// Delete role
export const deleteRole = async (roleId) => {
  // First check if role is a system role
  const checkQuery = `SELECT is_system_role FROM roles WHERE id = ?;`;
  
  try {
    const [checkRows] = await db.query(checkQuery, [roleId]);
    if (checkRows.length === 0) {
      throw new Error("Role not found");
    }
    
    if (checkRows[0].is_system_role) {
      throw new Error("Cannot delete system role");
    }

    const query = `DELETE FROM roles WHERE id = ? AND is_system_role = 0;`;
    const [result] = await db.query(query, [roleId]);
    
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Database delete error:", error);
    throw error;
  }
};

// Get all available permissions
export const getAllPermissions = async () => {
  const query = `
    SELECT 
      id, 
      permission_name, 
      display_name, 
      category, 
      description,
      created_at
    FROM permissions 
    ORDER BY category ASC, permission_name ASC;
  `;

  try {
    const [rows] = await db.query(query);
    return rows;
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

// Create permission
export const createPermission = async (permissionData) => {
  const query = `
    INSERT INTO permissions (
      permission_name, 
      display_name, 
      category, 
      description
    ) VALUES (?, ?, ?, ?);
  `;

  try {
    const [result] = await db.query(query, [
      permissionData.permission_name,
      permissionData.display_name,
      permissionData.category,
      permissionData.description
    ]);
    
    return { id: result.insertId, ...permissionData };
  } catch (error) {
    console.error("Database insert error:", error);
    throw error;
  }
};

// Update user role
export const updateUserRole = async (userId, roleId) => {
  const query = `
    UPDATE users 
    SET role = (SELECT role_name FROM roles WHERE id = ?)
    WHERE id = ?;
  `;

  try {
    const [result] = await db.query(query, [roleId, userId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
};

// Get users by role
export const getUsersByRole = async (roleName) => {
  const query = `
    SELECT 
      id, 
      userName, 
      emailId, 
      role,
      createdAt
    FROM users 
    WHERE role = ?;
  `;

  try {
    const [rows] = await db.query(query, [roleName]);
    return rows;
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
}; 