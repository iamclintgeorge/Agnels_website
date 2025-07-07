import React from "react";
import { Edit2, Trash2 } from "lucide-react";

const RoleCard = ({ role, availablePermissions, onEdit, onDelete }) => {
  return (
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
            onClick={() => onEdit(role)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit Role"
          >
            <Edit2 size={16} />
          </button>
          {role.name !== "superAdmin" && (
            <button
              onClick={() => onDelete(role.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Role"
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
};

export default RoleCard; 