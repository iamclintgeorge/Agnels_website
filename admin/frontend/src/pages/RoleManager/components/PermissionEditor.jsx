import React from "react";

const PermissionEditor = ({ 
  targetRole, 
  availablePermissions, 
  onPermissionToggle 
}) => {
  // Group permissions by category
  const groupedPermissions = availablePermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {});

  return (
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
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
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
};

export default PermissionEditor; 