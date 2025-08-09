import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { deptId, deptname } from "../../../util/dept_mapping.js";

const DeptAchievements = () => {
  const [pdfs, setPdfs] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(""); // For Year field
  const [type, setType] = useState(""); // For Type dropdown
  const [uploading, setUploading] = useState(false);
  const { departmentName } = useParams();
  const departmentId = deptId[departmentName];
  const deptName = deptname[departmentName];

  // Fetch data when the component mounts
  useEffect(() => {
    fetchPdfs();
  }, []);

  // Function to fetch PDFs
  const fetchPdfs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3663/api/department/achievements/${departmentId}`
      );
      console.log(response.data);
      setPdfs(response.data.data); // Setting the fetched data
    } catch (err) {
      console.error("Error loading PDFs:", err);
      toast.error("Error fetching PDFs");
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title || !year || !type) {
      toast.error("Please provide a PDF, title, year, and type");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("year", year); // Sending year to backend
    formData.append("type", type);
    formData.append("departmentId", departmentId); // Sending type to backend

    setUploading(true);
    try {
      await axios.post(
        "http://localhost:3663/api/department/achievements/create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("PDF uploaded successfully");
      setFile(null);
      setTitle("");
      setYear("");
      setType("");
      fetchPdfs(); // Refresh the list after upload
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Error uploading PDF");
    } finally {
      setUploading(false);
    }
  };

  // Handle delete PDF
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this PDF?")) return;

    try {
      await axios.delete(
        `http://localhost:3663/api/department/achievements/${id}`
      );
      toast.success("PDF deleted successfully");
      fetchPdfs(); // Refresh list after delete
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Error deleting PDF");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{deptName} - Achievements</h2>
      <form onSubmit={handleUpload} className="mb-8">
        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">PDF Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter PDF title"
          />
        </div>

        {/* Year Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Year</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter Year (e.g., 2023-24)"
          />
        </div>

        {/* Type Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Type</option>
            <option value="under-graduate">Under-graduate</option>
            <option value="post-graduate">Post-graduate</option>
            <option value="phd">PhD</option>
          </select>
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Upload PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {uploading ? "Uploading..." : "Upload PDF"}
        </button>
      </form>

      {/* Displaying PDF data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pdfs.length > 0 ? (
          pdfs.map((pdf) => (
            <div
              key={pdf.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <a
                  href={pdf.attachment} // Using the full attachment URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {`Achievements for ${pdf.year}`} {/* Displaying Year */}
                </a>
                <p className="text-sm text-gray-500">Type: {pdf.type}</p>
                <p className="text-sm text-gray-500">
                  Uploaded:{" "}
                  {new Date(pdf.created_timestamp).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(pdf.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No PDFs available.</p>
        )}
      </div>
    </div>
  );
};

export default DeptAchievements;
