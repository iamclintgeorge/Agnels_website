import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Users,
  Shield,
  Settings,
} from "lucide-react";

// Mock data - replace with actual API calls
const mockRoles = [
  {
    id: 1,
    name: "superAdmin",
    displayName: "Super Admin",
    permissions: ["all"],
  },
  {
    id: 2,
    name: "compHod",
    displayName: "HOD (Computer)",
    permissions: [
      "dashboard",
      "home_page",
      "departments.computer-engineering",
      "manage_users",
    ],
  },
  {
    id: 3,
    name: "mechHod",
    displayName: "HOD (Mechanical)",
    permissions: [
      "dashboard",
      "home_page",
      "departments.mechanical-engineering",
    ],
  },
  {
    id: 4,
    name: "extcHod",
    displayName: "HOD (EXTC)",
    permissions: ["dashboard", "home_page", "departments.extc"],
  },
  {
    id: 5,
    name: "bshHod",
    displayName: "HOD (BSH)",
    permissions: [
      "dashboard",
      "home_page",
      "departments.basic-science-and-humanities",
    ],
  },
  {
    id: 6,
    name: "cseHod",
    displayName: "HOD (CSE)",
    permissions: [
      "dashboard",
      "home_page",
      "departments.information-technology",
    ],
  },
  {
    id: 7,
    name: "electricalHod",
    displayName: "HOD (Electrical)",
    permissions: [
      "dashboard",
      "home_page",
      "departments.electrical-engineering",
    ],
  },
  {
    id: 8,
    name: "teach_staff",
    displayName: "Teaching Staff",
    permissions: ["dashboard", "home_page", "students_corner"],
  },
  {
    id: 9,
    name: "non_teach_staff",
    displayName: "Non-Teaching Staff",
    permissions: ["dashboard", "home_page"],
  },
  {
    id: 10,
    name: "principal",
    displayName: "Principal",
    permissions: [
      "dashboard",
      "home_page",
      "about_us",
      "academics",
      "research",
    ],
  },
];

const availablePermissions = [
  { id: "dashboard", name: "Dashboard", category: "core" },
  { id: "home_page", name: "Home Page Management", category: "content" },
  { id: "about_us", name: "About Us", category: "content" },
  {
    id: "departments.computer-engineering",
    name: "Computer Engineering Dept",
    category: "departments",
  },
  {
    id: "departments.mechanical-engineering",
    name: "Mechanical Engineering Dept",
    category: "departments",
  },
  { id: "departments.extc", name: "EXTC Dept", category: "departments" },
  {
    id: "departments.electrical-engineering",
    name: "Electrical Engineering Dept",
    category: "departments",
  },
  {
    id: "departments.computer-science-and-engineering",
    name: "CSE Dept",
    category: "departments",
  },
  {
    id: "departments.basic-science-and-humanities",
    name: "BSH Dept",
    category: "departments",
  },
  { id: "admission", name: "Admission", category: "content" },
  { id: "academics", name: "Academics", category: "content" },
  {
    id: "training_placement",
    name: "Training & Placement",
    category: "content",
  },
  { id: "students_corner", name: "Students Corner", category: "content" },
  { id: "research", name: "Research & Publication", category: "content" },
  { id: "human_resource", name: "Human Resource", category: "content" },
  { id: "alumni", name: "Alumni Page", category: "content" },
  { id: "downloads", name: "Downloads Page", category: "content" },
  { id: "nirf", name: "NIRF", category: "content" },
  { id: "nba_naac", name: "NBA/NAAC", category: "content" },
  { id: "manage_users", name: "Manage Users", category: "admin" },
  { id: "logs", name: "Logs", category: "admin" },
];

const RolePermissionManager = () => {
  const [roles, setRoles] = useState(mockRoles);
  const [editingRole, setEditingRole] = useState(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState("roles");
  const [newRole, setNewRole] = useState({
    name: "",
    displayName: "",
    permissions: [],
  });

  const handleCreateRole = () => {
    if (newRole.name && newRole.displayName) {
      const newRoleData = {
        id: Date.now(),
        name: newRole.name.toLowerCase().replace(/\s+/g, "_"),
        displayName: newRole.displayName,
        permissions: newRole.permissions,
      };
      setRoles([...roles, newRoleData]);
      setNewRole({ name: "", displayName: "", permissions: [] });
      setIsCreateMode(false);
    }
  };

  const handleEditRole = (role) => {
    setEditingRole({ ...role });
  };

  const handleSaveEdit = () => {
    setRoles(
      roles.map((role) => (role.id === editingRole.id ? editingRole : role))
    );
    setEditingRole(null);
  };

  const handleDeleteRole = (roleId) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      setRoles(roles.filter((role) => role.id !== roleId));
    }
  };

  const handlePermissionToggle = (permissionId, targetRole) => {
    const updatedPermissions = targetRole.permissions.includes(permissionId)
      ? targetRole.permissions.filter((p) => p !== permissionId)
      : [...targetRole.permissions, permissionId];

    if (isCreateMode) {
      setNewRole({ ...newRole, permissions: updatedPermissions });
    } else {
      setEditingRole({ ...editingRole, permissions: updatedPermissions });
    }
  };

  const groupedPermissions = availablePermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {});

  const RoleCard = ({ role }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {role.displayName}
          </h3>
          <p className="text-sm text-gray-600">Role ID: {role.name}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditRole(role)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit2 size={16} />
          </button>
          {role.name !== "superAdmin" && (
            <button
              onClick={() => handleDeleteRole(role.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
      <div className="mb-3">
        <p className="text-sm font-medium text-gray-700 mb-2">Permissions:</p>
        <div className="flex flex-wrap gap-1">
          {role.permissions.includes("all") ? (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              All Permissions
            </span>
          ) : (
            role.permissions.map((permission) => (
              <span
                key={permission}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {availablePermissions.find((p) => p.id === permission)?.name ||
                  permission}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const PermissionEditor = ({ targetRole, onPermissionToggle }) => (
    <div className="space-y-6">
      {Object.entries(groupedPermissions).map(([category, permissions]) => (
        <div key={category} className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-3 capitalize">
            {category} Permissions
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {permissions.map((permission) => (
              <label
                key={permission.id}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={targetRole.permissions.includes(permission.id)}
                  onChange={() => onPermissionToggle(permission.id, targetRole)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{permission.name}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
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
                Roles
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
                Permissions
              </button>
            </nav>
          </div>
        </div>

        {selectedTab === "roles" && (
          <div>
            {/* Create New Role Button */}
            <div className="mb-6">
              <button
                onClick={() => setIsCreateMode(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Create New Role</span>
              </button>
            </div>

            {/* Create Role Modal */}
            {isCreateMode && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Create New Role</h2>
                    <button
                      onClick={() => setIsCreateMode(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role Name (ID)
                      </label>
                      <input
                        type="text"
                        value={newRole.name}
                        onChange={(e) =>
                          setNewRole({ ...newRole, name: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., cseHod"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={newRole.displayName}
                        onChange={(e) =>
                          setNewRole({
                            ...newRole,
                            displayName: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., HOD (Computer Science)"
                      />
                    </div>
                  </div>

                  <PermissionEditor
                    targetRole={newRole}
                    onPermissionToggle={handlePermissionToggle}
                  />

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setIsCreateMode(false)}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateRole}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Create Role
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Role Modal */}
            {editingRole && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                      Edit Role: {editingRole.displayName}
                    </h2>
                    <button
                      onClick={() => setEditingRole(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role Name (ID)
                      </label>
                      <input
                        type="text"
                        value={editingRole.name}
                        onChange={(e) =>
                          setEditingRole({
                            ...editingRole,
                            name: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={editingRole.name === "superAdmin"}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={editingRole.displayName}
                        onChange={(e) =>
                          setEditingRole({
                            ...editingRole,
                            displayName: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {editingRole.name !== "superAdmin" && (
                    <PermissionEditor
                      targetRole={editingRole}
                      onPermissionToggle={handlePermissionToggle}
                    />
                  )}

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setEditingRole(null)}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      <Save size={16} className="inline mr-2" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Roles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roles.map((role) => (
                <RoleCard key={role.id} role={role} />
              ))}
            </div>
          </div>
        )}

        {selectedTab === "permissions" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              Available Permissions
            </h2>
            <div className="space-y-6">
              {Object.entries(groupedPermissions).map(
                ([category, permissions]) => (
                  <div
                    key={category}
                    className="border-l-4 border-blue-500 pl-4"
                  >
                    <h3 className="font-medium text-gray-800 mb-3 capitalize">
                      {category}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {permissions.map((permission) => (
                        <div
                          key={permission.id}
                          className="bg-gray-50 p-3 rounded-md"
                        >
                          <p className="font-medium text-sm">
                            {permission.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: {permission.id}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RolePermissionManager;
