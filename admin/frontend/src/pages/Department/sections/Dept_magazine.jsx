import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { deptId, deptname } from "../../../util/dept_mapping.js";

const DeptMagazine = () => {
  const [pdfs, setPdfs] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(""); // Add state for year
  const [uploading, setUploading] = useState(false);
  const { departmentName } = useParams();
  const departmentId = deptId[departmentName];
  const deptName = deptname[departmentName];

  useEffect(() => {
    fetchPdfs();
  }, []);

  const fetchPdfs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3663/api/department/magazines/${departmentId}`
      );
      console.log("Fetched Magazines:", response.data);
      if (response.data.success) {
        setPdfs(response.data.data); // Correctly access the 'data' array
      } else {
        toast.error("No PDFs found");
      }
    } catch (err) {
      console.error("Error loading PDFs:", err);
      toast.error("Error fetching PDFs");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title || !year) {
      // Make sure year is also provided
      toast.error("Please select a PDF file, provide a title, and a year");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("year", year); // Pass the year to the backend
    formData.append("departmentId", departmentId);

    setUploading(true);
    try {
      await axios.post(
        "http://localhost:3663/api/department/magazines/create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("PDF uploaded successfully");
      setFile(null);
      setTitle("");
      setYear(""); // Reset the year field after upload
      fetchPdfs();
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Error uploading PDF");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this PDF?")) return;

    try {
      await axios.delete(
        `http://localhost:3663/api/department/magazines/${id}`
      );
      toast.success("PDF deleted successfully");
      fetchPdfs();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Error deleting PDF");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{deptName} - Magazine</h2>
      <form onSubmit={handleUpload} className="mb-8">
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
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Year</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)} // Handle year change
            className="w-full p-2 border rounded"
            placeholder="Enter year (e.g., 2023-24)"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Upload PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {uploading ? "Uploading..." : "Upload PDF"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pdfs.length > 0 ? (
          pdfs.map((pdf) => (
            <div
              key={pdf.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <a
                  href={pdf.attachment} // Directly using the attachment URL from backend response
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {`Magazine from ${pdf.year}`} {/* Displaying the year */}
                </a>
                <p className="text-sm text-gray-500">
                  Uploaded: {new Date(pdf.created_at).toLocaleDateString()}
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

export default DeptMagazine;
