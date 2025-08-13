import React, { useState, useEffect } from "react";
import { Trash2, Save, X } from "lucide-react";
import axios from "axios";

const ManageFacultyStaff = () => {
  const [departments, setDepartments] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeptId, setSelectedDeptId] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [editData, setEditData] = useState({ department_id: "", sr_no: "" });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [deptRes, facRes] = await Promise.all([
          axios.get("http://localhost:3663/api/faculties/departments"),
          axios.get("http://localhost:3663/api/faculties?limit=1000"),
        ]);
        setDepartments(deptRes.data);
        setFaculties(facRes.data);
        if (deptRes.data.length) setSelectedDeptId(deptRes.data[0].id);
      } catch (e) {
        console.error(e);
        alert("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredFaculties = faculties.filter(
    (f) => f.department_id === selectedDeptId
  );

  const openEditModal = (faculty) => {
    setSelectedFaculty(faculty);
    setEditData({
      department_id: faculty.department_id,
      sr_no: faculty.sr_no,
    });
  };

  const closeModal = () => {
    setSelectedFaculty(null);
    setEditData({ department_id: "", sr_no: "" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this faculty?")) return;
    try {
      await axios.put(`http://localhost:3663/api/faculties/delete/${id}`);
      setFaculties((prev) => prev.filter((f) => f.id !== id));
      closeModal();
    } catch (e) {
      console.error(e);
      alert("Delete failed.");
    }
  };

  const handleSave = async () => {
    if (!editData.department_id || !editData.sr_no) {
      alert("Fill all fields");
      return;
    }
    try {
      await axios.put(
        `http://localhost:3663/api/faculties/${selectedFaculty.id}`,
        {
          department_id: editData.department_id,
          sr_no: editData.sr_no,
        }
      );
      setFaculties((prev) =>
        prev.map((f) =>
          f.id === selectedFaculty.id ? { ...f, ...editData } : f
        )
      );
      closeModal();
    } catch (e) {
      console.error(e);
      alert("Update failed.");
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-inter font-bold text-gray-900 mb-4">
          Manage Faculty & Staff
        </h1>

        {/* Department Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDeptId(dept.id)}
              className={`px-4 py-2 whitespace-nowrap ${
                dept.id === selectedDeptId
                  ? "bg-[#0C2340] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center font-inter text-gray-500">
            Loading data...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFaculties.map((faculty) => (
              <div
                key={faculty.id}
                onClick={() => openEditModal(faculty)}
                className="cursor-pointer p-4 border-2 border-gray-300 hover:shadow-lg transition-shadow"
              >
                <img
                  src={faculty.image || "/img/no_user.jpg"}
                  alt={faculty.name}
                  className="w-full h-48 object-contain rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {faculty.name}
                </h3>
                <p className="text-gray-600">User Id: {faculty.id}</p>
              </div>
            ))}
            {filteredFaculties.length === 0 && (
              <p className="text-gray-500">No faculty in this department.</p>
            )}
          </div>
        )}

        {/* Edit Modal */}
        {selectedFaculty && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Edit: {selectedFaculty.name}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department ID
                  </label>
                  <input
                    type="number"
                    value={editData.department_id}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        department_id: +e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Seniority Rank
                  </label>
                  <input
                    type="number"
                    value={editData.sr_no}
                    onChange={(e) =>
                      setEditData({ ...editData, sr_no: +e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => handleDelete(selectedFaculty.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                >
                  <Trash2 size={16} />
                  <span className="ml-2">Delete</span>
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <Save size={16} />
                  <span className="ml-2">Save</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageFacultyStaff;
