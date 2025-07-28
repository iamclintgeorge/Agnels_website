import db from "../../config/db.js";

export const createRole = async (name, displayName, permissions) => {
  const query =
    "INSERT INTO roles (name, displayName, permissions) VALUES (?, ?, ?)";
  const values = [name, displayName, JSON.stringify(permissions)];
  const [result] = await db.promise().query(query, values);
  return result.insertId;
};

export const updateRole = async (id, name, displayName, permissions) => {
  const query =
    "UPDATE roles SET name = ?, displayName = ?, permissions = ? WHERE id = ?";
  const values = [name, displayName, JSON.stringify(permissions), id];
  await db.promise().query(query, values);
};

export const deleteRole = async (id) => {
  const query = "DELETE FROM roles WHERE id = ?";
  await db.promise().query(query, [id]);
};

export const createPermission = async (id, name, category) => {
  const query = "INSERT INTO permissions (id, name, category) VALUES (?, ?, ?)";
  const values = [id, name, category];
  try {
    await db.promise().query(query, values);
  } catch (error) {
    console.log("Error from createPermission:", error);
  }
};

export const updatePermission = async (id, name, category) => {
  const query = "UPDATE permissions SET name = ?, category = ? WHERE id = ?";
  const values = [name, category, id];
  await db.promise().query(query, values);
};

export const deletePermission = async (id) => {
  const query = "DELETE FROM permissions WHERE id = ?";
  await db.promise().query(query, [id]);
};
