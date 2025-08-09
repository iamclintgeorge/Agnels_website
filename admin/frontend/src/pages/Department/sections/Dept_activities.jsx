import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deptId, deptname } from "../../../util/dept_mapping.js";

const DeptActivities = () => {
  const [activities, setActivities] = useState([]);
  const [file, setFile] = useState(null);
  const [heading, setHeading] = useState("");
  const [uploading, setUploading] = useState(false);
  const { departmentName } = useParams();
  const departmentId = deptId[departmentName];
  const deptName = deptname[departmentName];

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3663/api/department/activities/${departmentId}`
      );
      if (response.data.success) {
        setActivities(response.data.data);
      }
    } catch (err) {
      console.error("Error loading activities:", err);
      toast.error("Error fetching activities");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !heading) {
      toast.error("Please select a file and provide a heading");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("heading", heading);
    formData.append("departmentId", departmentId);

    setUploading(true);
    try {
      const response = await axios.post(
        "http://localhost:3663/api/department/activities/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Activity uploaded successfully");
        setFile(null);
        setHeading("");
        fetchActivities();
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err.response?.data?.message || "Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this activity?"))
      return;

    try {
      const response = await axios.delete(
        `http://localhost:3663/api/department/activities/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Activity deleted successfully");
        fetchActivities();
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err.response?.data?.message || "Error deleting activity");
    }
  };

  return (
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {deptName} - Activities
      </h2>

      {/* Upload Form */}
      <div className="mb-8 p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Upload New Activity
        </h3>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Activity Heading</label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter activity heading/title"
            />
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
            {uploading ? "Uploading..." : "Upload Activity"}
          </button>
        </form>
      </div>

      {/* Activities List */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Activities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div
                key={activity.id}
                className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-800 line-clamp-2">
                    {activity.heading}
                  </h4>
                  <button
                    onClick={() => handleDelete(activity.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                    title="Delete"
                  >
                    ×
                  </button>
                </div>
                <div>
                  <a
                    href={`http://localhost:3663/cdn/department/${activity.attachment}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline font-medium"
                  >
                    View Document
                  </a>
                  <p className="text-sm text-gray-500 mt-1">
                    File: {activity.attachment}
                  </p>
                  <p className="text-sm text-gray-500">
                    Uploaded:{" "}
                    {new Date(activity.created_timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No activities available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeptActivities;
