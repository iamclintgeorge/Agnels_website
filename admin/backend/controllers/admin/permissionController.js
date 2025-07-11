import {
  createRole,
  updateRole,
  deleteRole,
  createPermission,
  updatePermission,
  deletePermission,
} from "../../models/admin/roleModels.js";

export const createRoleController = async (req, res) => {
  try {
    const { name, displayName, permissions } = req.body;
    const id = await createRole(name, displayName, permissions);
    res.status(201).json({ id, name, displayName, permissions });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create role", error: error.message });
  }
};

export const updateRoleController = async (req, res) => {
  try {
    const { id, name, displayName, permissions } = req.body;
    await updateRole(id, name, displayName, permissions);
    res.status(200).json({ id, name, displayName, permissions });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update role", error: error.message });
  }
};

export const deleteRoleController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteRole(id);
    res.status(200).json({ message: "Role deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete role", error: error.message });
  }
};

export const createPermissionController = async (req, res) => {
  try {
    const { id, name, category } = req.body;
    await createPermission(id, name, category);
    res.status(201).json({ id, name, category });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create permission", error: error.message });
  }
};

export const updatePermissionController = async (req, res) => {
  try {
    const { id, name, category } = req.body;
    await updatePermission(id, name, category);
    res.status(200).json({ id, name, category });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update permission", error: error.message });
  }
};

export const deletePermissionController = async (req, res) => {
  try {
    const { id } = req.params;
    await deletePermission(id);
    res.status(200).json({ message: "Permission deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete permission", error: error.message });
  }
};
