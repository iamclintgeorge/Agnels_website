import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  Building,
  ChartNoAxesColumnIcon,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { deptId, deptname } from "../../../util/dept_mapping.js";

const API_BASE = "http://localhost:3663";

const DeptInfrastructure = () => {
  const [infrastructures, setInfrastructures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description1: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { departmentName } = useParams();
  const departmentId = deptId[departmentName];
  const deptName = deptname[departmentName];

  useEffect(() => {
    fetchInfrastructures();
  }, []);

  const fetchInfrastructures = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/api/department/infrastructure/${departmentId}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log("Fetched infrastructure data:", data);
      const infraList = Array.isArray(data?.data) ? data.data : [];
      setInfrastructures(infraList);
    } catch (err) {
      console.error("Error fetching infrastructures", err);
      toast.error("Failed to load infrastructures");
      setInfrastructures([]); // Set it to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description1, image } = formData;

    if (!name || !description1 || (!editingId && !image)) {
      toast.error("Please fill all required fields");
      return;
    }

    setUploading(true);
    try {
      let response;

      if (editingId) {
        response = await fetch(
          `${API_BASE}/api/infrastructure/admin/update/${editingId}`,
          {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description1 }),
          }
        );
      } else {
        const fd = new FormData();
        fd.append("name", name);
        fd.append("description1", description1);
        fd.append("department_id", DEPARTMENT_ID);
        fd.append("image", image);
        response = await fetch(`${API_BASE}/api/infrastructure/admin/create`, {
          method: "POST",
          credentials: "include",
          body: fd,
        });
      }

      if (!response.ok) throw new Error();
      toast.success(editingId ? "Updated successfully" : "Added successfully");
      resetForm();
      fetchInfrastructures();
    } catch {
      toast.error("Failed to save infrastructure");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await fetch(`${API_BASE}/api/infrastructure/admin/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      toast.success("Deleted successfully");
      fetchInfrastructures();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const startEdit = (infra) => {
    setFormData({
      name: infra.name,
      description1: infra.description1,
      image: null,
    });
    setEditingId(infra.id);
  };

  const resetForm = () => {
    setFormData({ name: "", description1: "", image: null });
    setEditingId(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Building /> {deptName} Infrastructure
          </h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded shadow space-y-4"
        >
          <h2 className="text-lg font-semibold">
            {editingId ? "Edit" : "Add"} Infrastructure
          </h2>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            required
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full border p-2 rounded"
          />
          <textarea
            placeholder="Description"
            value={formData.description1}
            required
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description1: e.target.value }))
            }
            rows={3}
            className="w-full border p-2 rounded"
          />
          {!editingId && (
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, image: e.target.files[0] }))
              }
              className="w-full border p-2 rounded"
            />
          )}
          <div className="flex justify-end gap-2">
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-1"
            >
              <Save size={16} />
              {uploading ? "Saving..." : editingId ? "Update" : "Add"}
            </button>
          </div>
        </form>

        {/* Grid */}
        {loading ? (
          <p>Loading...</p>
        ) : infrastructures.length === 0 ? (
          <p className="text-gray-600">No infrastructure found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {infrastructures.map((infra) => (
              <div key={infra.id} className="bg-white p-4 rounded shadow">
                <img
                  src={infra.image || "/api/placeholder/400/300"}
                  alt={infra.name}
                  className="h-40 w-full object-cover rounded mb-2"
                />
                <h3 className="font-semibold">{infra.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {infra.description1}
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => startEdit(infra)}
                    className="text-blue-600"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(infra.id)}
                    className="text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeptInfrastructure;
