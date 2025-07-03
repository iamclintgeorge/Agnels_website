import fs from "fs/promises";
import path from "path";

export const updateRolePermissions = async (req, res) => {
  try {
    const { roles } = req.body;

    // Convert roles array to roleBasedAccess format
    const roleBasedAccess = roles.reduce((acc, role) => {
      acc[role.name] = role.permissions;
      return acc;
    }, {});

    // Path to permissionMap.js
    const permissionMapPath = path.join(
      process.cwd(),
      "utils",
      "permissionMap.js"
    );

    // Read current file content
    const currentContent = await fs.readFile(permissionMapPath, "utf8");

    // Find the start and end of roleBasedAccess
    const startMarker = "export const roleBasedAccess = ";
    const roleBasedAccessStart = currentContent.indexOf(startMarker);
    const roleBasedAccessEnd =
      currentContent.indexOf("};", roleBasedAccessStart) + 2;

    // Create new content
    const newContent =
      currentContent.substring(0, roleBasedAccessStart) +
      startMarker +
      JSON.stringify(roleBasedAccess, null, 2) +
      currentContent.substring(roleBasedAccessEnd);

    // Write the updated content back to the file
    await fs.writeFile(permissionMapPath, newContent, "utf8");

    // Clear require cache to reload the updated permissions
    delete require.cache[require.resolve("../../utils/permissionMap.js")];

    res.status(200).json({ message: "Role permissions updated successfully" });
  } catch (error) {
    console.error("Error updating role permissions:", error);
    res
      .status(500)
      .json({
        message: "Failed to update role permissions",
        error: error.message,
      });
  }
};
