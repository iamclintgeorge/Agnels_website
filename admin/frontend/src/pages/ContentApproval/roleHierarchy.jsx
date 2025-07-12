import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X, Users, Settings } from "lucide-react";
import axios from "axios";

const RoleHierarchy = () => {
  const [roles, setRoles] = useState([]);
  const [masterSlaveData, setMasterSlaveData] = useState([]);
  const [editingRole, setEditingRole] = useState(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState("roles");
  const [newHierarchy, setNewHierarchy] = useState({ master: "", slave: "" });

  // Fetch roles and hierarchy data
  useEffect(() => {
    fetchRoles();
    fetchMasterSlaveData();
  }, []);

  const fetchRoles = async () => {
    try {
      const rolesRes = await axios.get("http://localhost:3663/api/fetchroles");
      setRoles(rolesRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMasterSlaveData = async () => {
    try {
      const hierarchyRes = await axios.get(
        "http://localhost:3663/api/fetchmaster-slave"
      );
      setMasterSlaveData(hierarchyRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE ROLE HIERARCHY
  const handleCreateHierarchy = async () => {
    if (newHierarchy.master && newHierarchy.slave) {
      try {
        const response = await axios.post(
          "http://localhost:3663/api/role-hierarchy",
          newHierarchy
        );
        if (response.status !== 201)
          throw new Error("Failed to create hierarchy");
        fetchMasterSlaveData();
        setNewHierarchy({ master: "", slave: "" });
        setIsCreateMode(false);
      } catch (error) {
        console.error("Error creating hierarchy:", error);
        alert("Failed to create hierarchy. Please try again.");
      }
    }
  };

  // DELETE HIERARCHY
  const handleDeleteHierarchy = async (masterId, slaveId) => {
    if (window.confirm("Are you sure you want to remove this hierarchy?")) {
      try {
        const response = await axios.delete(
          `http://localhost:3663/api/role-hierarchy/${masterId}/${slaveId}`
        );
        if (response.status !== 200)
          throw new Error("Failed to delete hierarchy");
        fetchMasterSlaveData();
      } catch (error) {
        console.error("Error deleting hierarchy:", error);
        alert("Failed to delete hierarchy. Please try again.");
      }
    }
  };

  const RoleHierarchyCard = ({ master, slave }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Master: {master.displayName}
          </h3>
          <p className="text-sm text-gray-600">Slave: {slave.displayName}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleDeleteHierarchy(master.id, slave.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-scree p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Role Hierarchy Management
          </h1>
          <p className="text-gray-600">
            Manage role master-slave hierarchies for efficient administration
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
                onClick={() => setSelectedTab("hierarchy")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === "hierarchy"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Settings className="inline mr-2" size={16} />
                Hierarchy
              </button>
            </nav>
          </div>
        </div>

        {selectedTab === "roles" && (
          <div>
            <div className="mb-6">
              <button
                onClick={() => setIsCreateMode(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Create New Hierarchy</span>
              </button>
            </div>

            {/* Create Hierarchy Modal */}
            {isCreateMode && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                      Create New Hierarchy
                    </h2>
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
                        Master Role
                      </label>
                      <select
                        value={newHierarchy.master}
                        onChange={(e) =>
                          setNewHierarchy({
                            ...newHierarchy,
                            master: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Master Role</option>
                        {roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.displayName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Slave Role
                      </label>
                      <select
                        value={newHierarchy.slave}
                        onChange={(e) =>
                          setNewHierarchy({
                            ...newHierarchy,
                            slave: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Slave Role</option>
                        {roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.displayName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setIsCreateMode(false)}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateHierarchy}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Create Hierarchy
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Roles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {masterSlaveData.map((entry) => (
                <RoleHierarchyCard
                  key={`${entry.masterId}-${entry.slaveId}`}
                  master={roles.find((role) => role.id === entry.masterId)}
                  slave={roles.find((role) => role.id === entry.slaveId)}
                />
              ))}
            </div>
          </div>
        )}

        {selectedTab === "hierarchy" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Manage Hierarchy</h2>
            <div className="space-y-4">
              {masterSlaveData.length > 0 ? (
                masterSlaveData.map((entry) => (
                  <RoleHierarchyCard
                    key={`${entry.masterId}-${entry.slaveId}`}
                    master={roles.find((role) => role.id === entry.masterId)}
                    slave={roles.find((role) => role.id === entry.slaveId)}
                  />
                ))
              ) : (
                <p>No role hierarchy available</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleHierarchy;
