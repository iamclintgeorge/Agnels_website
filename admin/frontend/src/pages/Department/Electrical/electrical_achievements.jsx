import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const ElectricalAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [deptText, setDeptText] = useState("");
  const [file, setFile] = useState(null);
  const [type, setType] = useState("Student");
  const [year, setYear] = useState("");
  const [uploading, setUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [textContent, setTextContent] = useState("");
  const quillRef = useRef(null);
  const departmentId = 4; // Electrical Engineering department ID

  useEffect(() => {
    fetchAchievements();
    fetchDeptText();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3663/api/dept/achievements/${departmentId}`
      );
      if (response.data.success) {
        setAchievements(response.data.data);
      }
    } catch (err) {
      console.error("Error loading achievements:", err);
      toast.error("Error fetching achievements");
    }
  };

  const fetchDeptText = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3663/api/dept/text/${departmentId}/achievements`
      );
      if (response.data.success && response.data.data) {
        setDeptText(response.data.data.content);
        setTextContent(response.data.data.content);
      }
    } catch (err) {
      console.error("Error loading department text:", err);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !type || !year) {
      toast.error("Please select a file, type, and year");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("departmentId", departmentId);
    formData.append("type", type);
    formData.append("year", year);

    setUploading(true);
    try {
      const response = await axios.post(
        "http://localhost:3663/api/dept/achievements/create",
        formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        }
      );
      if (response.data.success) {
        toast.success("Achievement uploaded successfully");
        setFile(null);
        setType("Student");
        setYear("");
        fetchAchievements();
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err.response?.data?.message || "Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this achievement?")) return;

    try {
      const response = await axios.delete(
        `http://localhost:3663/api/dept/achievements/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (response.data.success) {
        toast.success("Achievement deleted successfully");
        fetchAchievements();
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err.response?.data?.message || "Error deleting achievement");
    }
  };

  const handleTextUpdate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3663/api/dept/text/create",
        {
          departmentId: departmentId,
          section: "achievements",
          content: textContent
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (response.data.success) {
        toast.success("Text content updated successfully!");
        setEditMode(false);
        setDeptText(textContent);
        fetchDeptText();
      }
    } catch (error) {
      console.error("Text update error:", error);
      toast.error("Error updating text content");
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ font: [] }],
      [{ align: [] }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header", "bold", "italic", "underline", "list", "bullet",
    "indent", "size", "font", "align", "link",
  ];

  return (
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Electrical Engineering - Achievements
      </h2>

      {/* Text Content Section */}
      <div className="mb-8 p-4 border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Information</h3>
          <button
            onClick={() => {
              setEditMode(!editMode);
              if (!editMode) setTextContent(deptText);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>

        {editMode ? (
          <div>
            <ReactQuill
              ref={quillRef}
              value={textContent}
              onChange={setTextContent}
              modules={modules}
              formats={formats}
              className="mb-4"
              placeholder="Add information about achievements. You can include links to uploaded files here..."
            />
            <button
              onClick={handleTextUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save Text
            </button>
          </div>
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: deptText || "No information available. Click Edit to add content." }}
            className="prose max-w-none"
          />
        )}
      </div>

      {/* Upload Form */}
      <div className="mb-8 p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Upload New Achievement</h3>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Student">Student</option>
              <option value="Faculty">Faculty</option>
              <option value="Department">Department</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Year</label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter year (e.g., 2024, 2023-24)"
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
            {uploading ? "Uploading..." : "Upload Achievement"}
          </button>
        </form>
      </div>

      {/* Achievements List */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Department Achievements</h3>
        
        {/* Filter by Type */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Filter by Type:</label>
          <select
            onChange={(e) => {
              const filterType = e.target.value;
              if (filterType) {
                setAchievements(prev => prev.filter(ach => ach.type === filterType));
              } else {
                fetchAchievements(); // Reload all
              }
            }}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="Student">Student</option>
            <option value="Faculty">Faculty</option>
            <option value="Department">Department</option>
          </select>
          <button
            onClick={fetchAchievements}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Reset Filter
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.length > 0 ? (
            achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col space-y-1">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {achievement.type}
                    </span>
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {achievement.year}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(achievement.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    ×
                  </button>
                </div>
                <div>
                  <a
                    href={`http://localhost:3663/uploads/department/${achievement.attachment}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline font-medium"
                  >
                    {achievement.attachment}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">
                    Uploaded: {new Date(achievement.created_timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No achievements available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElectricalAchievements;