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
import axios from "axios";

const RolePermissionManager = () => {
  const [roles, setRoles] = useState([]);
  const [editingRole, setEditingRole] = useState(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isRoleEditMode, setIsRoleEditMode] = useState(false);
  const [isPermissionCreateMode, setIsPermissionCreateMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState("roles");
  const [userRoles, setUserRoles] = useState([]);
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const [newRole, setNewRole] = useState({
    name: "",
    displayName: "",
    permissions: [],
    category: "",
  });
  const [facultyList, setFacultyList] = useState([]);
  const [selectedFacultyIds, setSelectedFacultyIds] = useState([]);
  const [searchFaculty, setSearchFaculty] = useState("");
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    fetchPermissions();
    fetchRoles();
  }, []);

  useEffect(() => {
    fetchFaculties();
  }, [isRoleEditMode]);

  const fetchRoles = async () => {
    try {
      const rolesRes = await axios.get("http://localhost:3663/api/fetchroles");
      setUserRoles(rolesRes.data);
      setRoles(rolesRes.data);
      console.log(rolesRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFaculties = async () => {
    try {
      const facRes = await axios.get(
        "http://localhost:3663/api/faculties?limit=1000"
      );
      setFacultyList(facRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPermissions = async () => {
    try {
      const permissionRes = await axios.get(
        "http://localhost:3663/api/fetchpermissions"
      );
      setAvailablePermissions(permissionRes.data);
      console.log(permissionRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE ROLE
  const handleCreateRole = async () => {
    if (newRole.name && newRole.displayName) {
      try {
        const response = await axios.post("http://localhost:3663/api/role", {
          name: newRole.name.toLowerCase().replace(/\s+/g, "_"),
          displayName: newRole.displayName,
          permissions: newRole.permissions,
        });
        if (response.status !== 201) throw new Error("Failed to create role");
        fetchRoles();
        setNewRole({ name: "", displayName: "", permissions: [] });
        setIsCreateMode(false);
      } catch (error) {
        console.error("Error creating role:", error);
        alert("Failed to create role. Please try again.");
      }
    }
  };

  const handleEditRole = (role) => {
    setEditingRole({ ...role });
  };

  // UPDATE ROLE
  const handleSaveEdit = async () => {
    try {
      const response = await axios.put("http://localhost:3663/api/role", {
        id: editingRole.id,
        name: editingRole.name,
        displayName: editingRole.displayName,
        permissions: editingRole.permissions,
      });
      if (response.status !== 200) throw new Error("Failed to update role");
      // Refetch roles to get updated data from backend
      await fetchRoles();
      setEditingRole(null);
    } catch (error) {
      console.error("Error updating roles:", error);
      alert("Failed to update roles. Please try again.");
    }
  };

  // DELETE ROLE
  const handleDeleteRole = async (roleId) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      try {
        const response = await axios.delete(
          `http://localhost:3663/api/role/${roleId}`
        );
        if (response.status !== 200) throw new Error("Failed to delete role");
        fetchRoles();
      } catch (error) {
        console.error("Error deleting role:", error);
        alert("Failed to delete role. Please try again.");
      }
    }
  };

  // Handle Edit User Role
  const handleEditUserRole = async () => {
    try {
      console.log("selectedFacultyIds", selectedFacultyIds);
      console.log("roleName", roleName);
      const response = await axios.put(
        "http://localhost:3663/api/role/user-role",
        {
          userId: selectedFacultyIds,
          role: roleName,
        }
      );
      setIsRoleEditMode(false);
    } catch (error) {
      console.error("Error updating user roles:", error);
      alert("Failed to update user roles. Please try again.");
    }
  };

  // CREATE PERMISSION
  // const handleCreatePermission = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3663/api/permission",
  //       permission
  //     );
  //     if (response.status !== 201)
  //       throw new Error("Failed to create permission");
  //     fetchPermissions();
  //   } catch (error) {
  //     console.error("Error creating permission:", error);
  //     alert("Failed to create permission. Please try again.");
  //   }
  // };

  const handleCreatePermission = async () => {
    if (newRole.name && newRole.displayName) {
      try {
        const response = await axios.post(
          "http://localhost:3663/api/permission",
          {
            name: newRole.name.toLowerCase().replace(/\s+/g, "_"),
            displayName: newRole.displayName,
            permissions: newRole.permissions,
          }
        );
        if (response.status !== 201) throw new Error("Failed to create role");
        fetchRoles();
        setNewRole({ name: "", displayName: "", permissions: [] });
        setIsCreateMode(false);
      } catch (error) {
        console.error("Error creating role:", error);
        alert("Failed to create role. Please try again.");
      }
    }
  };

  // UPDATE PERMISSION
  const handleUpdatePermission = async (permission) => {
    try {
      const response = await axios.put(
        "http://localhost:3663/api/permission",
        permission
      );
      if (response.status !== 200)
        throw new Error("Failed to update permission");
      fetchPermissions();
    } catch (error) {
      console.error("Error updating permission:", error);
      alert("Failed to update permission. Please try again.");
    }
  };

  // DELETE PERMISSION
  const handleDeletePermission = async (permissionId) => {
    if (window.confirm("Are you sure you want to delete this permission?")) {
      try {
        const response = await axios.delete(
          `http://localhost:3663/api/permission/${permissionId}`
        );
        if (response.status !== 200)
          throw new Error("Failed to delete permission");
        fetchPermissions();
      } catch (error) {
        console.error("Error deleting permission:", error);
        alert("Failed to delete permission. Please try again.");
      }
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

  const RoleEditor = ({ targetRole }) => (
    <div className="space-y-2 mt-8">
      <h1 className="text-lg font-inter font-semibold pb-0 mb-0">
        Select New Role:
      </h1>
      {targetRole
        .sort((a, b) => a.displayName.localeCompare(b.displayName))
        .map((role) => (
          <label
            key={role.id}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="radio"
              name="role"
              checked={targetRole.permissions?.includes(role.id)}
              onChange={() => setRoleName(role.name)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{role.displayName}</span>
          </label>
        ))}
    </div>
  );

  return (
    <div className="min-h-screen p-6">
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
            <div className="flex mb-6">
              <div className="">
                <button
                  onClick={() => setIsCreateMode(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus size={16} />
                  <span>Create New Role</span>
                </button>
              </div>

              <div className="ml-4">
                <button
                  onClick={() => setIsRoleEditMode(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Edit2 size={16} />
                  <span>Change User Role</span>
                </button>
              </div>
            </div>
            {/* Create New Role Button */}

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

            {/* Edit User Role Modal */}
            {isRoleEditMode && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Edit User Role</h2>
                    <button
                      onClick={() => setIsRoleEditMode(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* {/* Faculty option */}
                  <div className="mt-4">
                    <input
                      type="text"
                      value={searchFaculty}
                      onChange={(e) => setSearchFaculty(e.target.value)}
                      placeholder="Search faculty by name..."
                      className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <div className="max-h-48 overflow-y-auto border border-gray-200 rounded p-2 space-y-1">
                      {facultyList
                        .filter((f) =>
                          f.name
                            .toLowerCase()
                            .includes(searchFaculty.toLowerCase())
                        )
                        .map((faculty) => (
                          <div key={faculty.id} className="flex items-center">
                            <input
                              type="checkbox"
                              value={faculty.id}
                              onChange={(e) => {
                                const updated = e.target.checked
                                  ? [...selectedFacultyIds, faculty.id]
                                  : selectedFacultyIds.filter(
                                      (id) => id !== faculty.id
                                    );
                                setSelectedFacultyIds(updated);
                              }}
                              checked={selectedFacultyIds.includes(faculty.id)}
                              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm">{faculty.name}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="mt-10">
                    <h1 className="text-lg font-inter font-semibold">
                      Selected Faculties:
                    </h1>
                    {selectedFacultyIds.length === 0 ? (
                      <p>No user selected</p>
                    ) : (
                      selectedFacultyIds.map((facultyId) => {
                        const faculty = facultyList.find(
                          (f) => f.id === facultyId
                        );
                        return faculty ? (
                          <div key={facultyId}>
                            <div>{faculty.name}</div>
                          </div>
                        ) : null;
                      })
                    )}
                  </div>

                  <RoleEditor targetRole={roles} />

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setIsRoleEditMode(false)}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEditUserRole}
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
          <div>
            {/* Create New Permission Button */}
            {/* <div className="mb-6">
              <button
                onClick={() => setIsPermissionCreateMode(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Create New Permission</span>
              </button>
            </div> */}

            {/* Create Permission Modal */}
            {/* {isPermissionCreateMode && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                      Create New Permission
                    </h2>
                    <button
                      onClick={() => setIsPermissionCreateMode(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Permission ID:
                      </label>
                      <input
                        type="text"
                        value={newRole.name}
                        onChange={(e) =>
                          setNewRole({ ...newRole, name: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., manage_users"
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
                        placeholder="e.g., Manage faculty Staffs"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category:
                      </label>
                      <input
                        type="text"
                        value={newRole.category}
                        onChange={(e) =>
                          setNewRole({ ...newRole, category: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Content"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setIsPermissionCreateMode(false)}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreatePermission}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Create Permission
                    </button>
                  </div>
                </div>
              </div>
            )} */}
            <div className="shadow-md p-6">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default RolePermissionManager;
