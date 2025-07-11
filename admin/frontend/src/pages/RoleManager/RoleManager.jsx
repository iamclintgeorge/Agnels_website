import React, { useState, useEffect } from "react";
import { Users, Shield } from "lucide-react";
import { toast } from "react-toastify";
import RoleList from "./components/RoleList";
import RoleEditor from "./components/RoleEditor";
import PermissionEditor from "./components/PermissionEditor";
import { roleService } from "./services/roleService";
import { availablePermissions } from "./constants/permissions";

const RoleManager = () => {
  // State management
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("roles");
  
  // Role editor state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    name: "",
    displayName: "",
    permissions: [],
  });

  // Load roles on component mount
  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      setLoading(true);
      const rolesData = await roleService.getRoles();
      setRoles(rolesData);
    } catch (error) {
      console.error("Error loading roles:", error);
      toast.error("Failed to load roles");
    } finally {
      setLoading(false);
    }
  };

  // Role management handlers
  const handleCreateRole = () => {
    setCurrentRole({
      name: "",
      displayName: "",
      permissions: [],
    });
    setIsCreateMode(true);
    setIsEditorOpen(true);
  };

  const handleEditRole = (role) => {
    setCurrentRole({ ...role });
    setIsCreateMode(false);
    setIsEditorOpen(true);
  };

  const handleSaveRole = async () => {
    try {
      if (isCreateMode) {
        const newRole = {
          ...currentRole,
          id: Date.now(),
          name: currentRole.name.toLowerCase().replace(/\s+/g, "_"),
        };
        
        await roleService.createRole(newRole);
        setRoles([...roles, newRole]);
        toast.success("Role created successfully");
      } else {
        await roleService.updateRole(currentRole.id, currentRole);
        setRoles(roles.map(role => role.id === currentRole.id ? currentRole : role));
        toast.success("Role updated successfully");
      }
      
      setIsEditorOpen(false);
      setCurrentRole({ name: "", displayName: "", permissions: [] });
    } catch (error) {
      console.error("Error saving role:", error);
      toast.error(`Failed to ${isCreateMode ? "create" : "update"} role`);
    }
  };

  const handleDeleteRole = async (roleId) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      try {
        await roleService.deleteRole(roleId);
        setRoles(roles.filter(role => role.id !== roleId));
        toast.success("Role deleted successfully");
      } catch (error) {
        console.error("Error deleting role:", error);
        toast.error("Failed to delete role");
      }
    }
  };

  const handleRoleChange = (field, value) => {
    setCurrentRole(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePermissionToggle = (permissionId, targetRole) => {
    const updatedPermissions = targetRole.permissions.includes(permissionId)
      ? targetRole.permissions.filter(p => p !== permissionId)
      : [...targetRole.permissions, permissionId];

    setCurrentRole(prev => ({
      ...prev,
      permissions: updatedPermissions
    }));
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setCurrentRole({ name: "", displayName: "", permissions: [] });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading roles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Role & Permission Management
          </h1>
          <p className="text-gray-600">
            Manage user roles and their access permissions
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setSelectedTab("roles")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === "roles"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Users className="inline mr-2" size={16} />
                Roles ({roles.length})
              </button>
              <button
                onClick={() => setSelectedTab("permissions")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === "permissions"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Shield className="inline mr-2" size={16} />
                All Permissions ({availablePermissions.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {selectedTab === "roles" ? (
          <RoleList
            roles={roles}
            availablePermissions={availablePermissions}
            onCreateNew={handleCreateRole}
            onEditRole={handleEditRole}
            onDeleteRole={handleDeleteRole}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Available Permissions</h2>
            <PermissionEditor
              targetRole={{ permissions: [] }}
              availablePermissions={availablePermissions}
              onPermissionToggle={() => {}} // Read-only view
            />
          </div>
        )}

        {/* Role Editor Modal */}
        <RoleEditor
          isOpen={isEditorOpen}
          isCreateMode={isCreateMode}
          role={currentRole}
          availablePermissions={availablePermissions}
          onClose={handleCloseEditor}
          onSave={handleSaveRole}
          onRoleChange={handleRoleChange}
          onPermissionToggle={handlePermissionToggle}
        />
      </div>
    </div>
  );
};

export default RoleManager; 