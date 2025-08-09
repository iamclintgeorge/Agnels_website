import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { deptId, deptname } from "../../../util/dept_mapping.js";

const DeptAcademicCalendar = () => {
  const [calendars, setCalendars] = useState([]);
  const [file, setFile] = useState(null);
  const [type, setType] = useState("Under-graduate");
  const [uploading, setUploading] = useState(false);
  const { departmentName } = useParams();
  const departmentId = deptId[departmentName];
  const deptName = deptname[departmentName];

  useEffect(() => {
    fetchCalendars();
  }, []);

  const fetchCalendars = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3663/api/department/calendars/${departmentId}`
      );
      console.log(response.data);
      if (response.data.success) {
        setCalendars(response.data.data);
      }
    } catch (err) {
      console.error("Error loading academic calendars:", err);
      toast.error("Error fetching academic calendars");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !type) {
      toast.error("Please select a file and type");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    formData.append("departmentId", departmentId);

    setUploading(true);
    try {
      const response = await axios.post(
        "http://localhost:3663/api/department/calendars/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Academic calendar uploaded successfully");
        setFile(null);
        setType("Under-graduate");
        fetchCalendars();
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err.response?.data?.message || "Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this academic calendar?")
    )
      return;

    try {
      const response = await axios.delete(
        `http://localhost:3663/api/department/calendars/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Academic calendar deleted successfully");
        fetchCalendars();
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(
        err.response?.data?.message || "Error deleting academic calendar"
      );
    }
  };

  return (
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {deptName} - Academic Calendar
      </h2>

      {/* Upload Form */}
      <div className="mb-8 p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Upload New Academic Calendar
        </h3>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Under-graduate">Under-graduate</option>
              <option value="Post-graduate">Post-graduate</option>
              <option value="PhD">PhD</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Upload File</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {uploading ? "Uploading..." : "Upload Academic Calendar"}
          </button>
        </form>
      </div>

      {/* Academic Calendars List */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Academic Calendars
        </h3>
        {/* Filter by Type */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Filter by Type:</label>
          <select
            value=""
            onChange={(e) => {
              const filterType = e.target.value;
              if (filterType) {
                setCalendars((prev) =>
                  prev.filter((cal) => cal.type === filterType)
                );
              } else {
                fetchCalendars(); // Reload all
              }
            }}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="Under-graduate">Under-graduate</option>
            <option value="Post-graduate">Post-graduate</option>
            <option value="PhD">PhD</option>
          </select>
          <button
            onClick={fetchCalendars}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Reset Filter
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {calendars.length > 0 ? (
            calendars.map((calendar) => (
              <div
                key={calendar.id}
                className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {calendar.type}
                  </span>
                  <button
                    onClick={() => handleDelete(calendar.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    ×
                  </button>
                </div>
                <div>
                  <a
                    href={`${calendar.attachment}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline font-medium"
                  >
                    {calendar.attachment}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">
                    Uploaded:{" "}
                    {new Date(calendar.created_timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No academic calendars available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeptAcademicCalendar;
