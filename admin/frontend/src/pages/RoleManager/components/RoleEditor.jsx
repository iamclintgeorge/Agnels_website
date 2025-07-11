import React from "react";
import { X, Save } from "lucide-react";
import PermissionEditor from "./PermissionEditor";

const RoleEditor = ({ 
  isOpen,
  isCreateMode,
  role,
  availablePermissions,
  onClose,
  onSave,
  onRoleChange,
  onPermissionToggle
}) => {
  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    onRoleChange(field, value);
  };

  const handleSave = () => {
    if (role.name && role.displayName) {
      onSave();
    } else {
      alert("Please fill in both role name and display name");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {isCreateMode ? "Create New Role" : `Edit Role: ${role.displayName}`}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Role Information */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role Name (ID) *
            </label>
            <input
              type="text"
              value={role.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., cseHod"
              disabled={!isCreateMode}
            />
            <p className="text-xs text-gray-500 mt-1">
              {isCreateMode ? "This will be used as the unique identifier" : "Role ID cannot be changed"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Name *
            </label>
            <input
              type="text"
              value={role.displayName || ""}
              onChange={(e) => handleInputChange("displayName", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., HOD (Computer Science)"
            />
          </div>
        </div>

        {/* Permissions Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Assign Permissions
          </h3>
          <PermissionEditor
            targetRole={role}
            availablePermissions={availablePermissions}
            onPermissionToggle={onPermissionToggle}
          />
        </div>

        {/* Selected Permissions Summary */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-700 mb-2">
            Selected Permissions ({role.permissions ? role.permissions.length : 0})
          </h4>
          <div className="flex flex-wrap gap-2">
            {role.permissions && role.permissions.length > 0 ? (
              role.permissions.map((permission) => (
                <span
                  key={permission}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {availablePermissions.find((p) => p.id === permission)?.name || permission}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-sm">No permissions selected</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Save size={16} />
            <span>{isCreateMode ? "Create Role" : "Save Changes"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleEditor; 