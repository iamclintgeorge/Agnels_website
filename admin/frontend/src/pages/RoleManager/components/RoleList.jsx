import React from "react";
import { Plus } from "lucide-react";
import RoleCard from "./RoleCard";

const RoleList = ({ 
  roles, 
  availablePermissions, 
  onCreateNew, 
  onEditRole, 
  onDeleteRole 
}) => {
  return (
    <div>
      {/* Create New Role Button */}
      <div className="mb-6">
        <button
          onClick={onCreateNew}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Create New Role</span>
        </button>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <RoleCard
            key={role.id}
            role={role}
            availablePermissions={availablePermissions}
            onEdit={onEditRole}
            onDelete={onDeleteRole}
          />
        ))}
      </div>

      {/* Empty State */}
      {roles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">No roles found</div>
          <button
            onClick={onCreateNew}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your First Role
          </button>
        </div>
      )}
    </div>
  );
};

export default RoleList; 