import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { deptId, deptname } from "../../../util/dept_mapping.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const DeptSyllabus = () => {
  const [editMode, setEditMode] = useState(false);
  const [deptText, setDeptText] = useState("");
  const [textContent, setTextContent] = useState("");
  const quillRef = useRef(null);
  const [pdfs, setPdfs] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [uploading, setUploading] = useState(false);
  const { departmentName } = useParams();
  const departmentId = deptId[departmentName];
  const deptName = deptname[departmentName];

  useEffect(() => {
    fetchPdfs();
    fetchDeptText();
  }, []);

  const fetchPdfs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3663/api/department/syllabus/${departmentId}`
      );
      setPdfs(response.data.data);
    } catch (err) {
      console.error("Error loading PDFs:", err);
      toast.error("Error fetching PDFs");
    }
  };

  const fetchDeptText = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3663/api/department/text/${departmentId}/syllabus`
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
    if (!file || !title || !type || !year) {
      toast.error("Please provide a PDF, title, type, and year");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("type", type);
    formData.append("year", year);
    formData.append("departmentId", departmentId);

    setUploading(true);
    try {
      await axios.post(
        "http://localhost:3663/api/department/syllabus/create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("PDF uploaded successfully");
      setFile(null);
      setTitle("");
      setType("");
      setYear("");
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
      await axios.delete(`http://localhost:3663/api/department/syllabus/${id}`);
      toast.success("PDF deleted successfully");
      fetchPdfs();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Error deleting PDF");
    }
  };

  const handleTextUpdate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3663/api/department/text/create",
        {
          departmentId: departmentId,
          section: "syllabus",
          content: textContent,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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

  const handleCopyLink = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error("Error copying link:", err);
      toast.error("Failed to copy link");
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
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "indent",
    "size",
    "font",
    "align",
    "link",
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {deptName || "Department"} - Syllabus
          </h2>

          {/* Text Content Section */}
          <div className="mb-8 border border-gray-200 rounded-lg p-6 bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Information</h3>
              <button
                onClick={() => {
                  setEditMode(!editMode);
                  if (!editMode) setTextContent(deptText);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
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
                  className="mb-4 bg-white"
                  placeholder="Add information about department syllabus..."
                />
                <button
                  onClick={handleTextUpdate}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
                >
                  Save Text
                </button>
              </div>
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    deptText ||
                    "No information available. Click Edit to add content.",
                }}
                className="prose prose-sm max-w-none text-gray-700"
              />
            )}
          </div>

          {/* File Upload Form */}
          <form onSubmit={handleUpload} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PDF Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter PDF title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="under-graduate">Under-graduate</option>
                  <option value="post-graduate">Post-graduate</option>
                  <option value="phd">PhD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Year</option>
                  {[1, 2, 3, 4].map((yr) => (
                    <option key={yr} value={yr}>{`Year ${yr}`}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload PDF
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300 transition-colors duration-200"
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
                  className="border p-4 rounded-lg bg-white flex justify-between items-center shadow-sm hover:bg-gray-50 transition-all"
                >
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Type: {pdf.type}</p>
                    <p className="text-sm text-gray-600">Year: {pdf.year}</p>
                    <p className="text-sm text-gray-600">
                      Link: {pdf.attachment}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleCopyLink(pdf.attachment)}
                      className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-gray-600"
                    >
                      Copy Link
                    </button>
                    <button
                      onClick={() => handleDelete(pdf.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No PDFs available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeptSyllabus;
