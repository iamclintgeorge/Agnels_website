import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const CseCommittees = () => {
  const [committees, setCommittees] = useState([]);
  const [deptText, setDeptText] = useState("");
  const [file, setFile] = useState(null);
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [uploading, setUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [textContent, setTextContent] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const quillRef = useRef(null);
  const departmentId = 6; // CSE department ID

  const typeOptions = [
    "Board of Studies",
    "Department Committee",
    "Academic Committee", 
    "Research Committee",
    "Industry Advisory Committee",
    "Student Committee"
  ];

  useEffect(() => {
    fetchCommittees();
    fetchDeptText();
  }, []);

  const fetchCommittees = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3663/api/dept/committees/${departmentId}`
      );
      if (response.data.success) {
        setCommittees(response.data.data);
      }
    } catch (err) {
      console.error("Error loading committees:", err);
      toast.error("Error fetching committees");
    }
  };

  const fetchDeptText = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3663/api/dept/text/${departmentId}/committees`
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
      toast.error("Please select a file, choose type, and provide year");
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
        "http://localhost:3663/api/dept/committees/create",
        formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        }
      );
      if (response.data.success) {
        toast.success("Committee uploaded successfully");
        setFile(null);
        setType("");
        setYear("");
        fetchCommittees();
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err.response?.data?.message || "Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this committee?")) return;

    try {
      const response = await axios.delete(
        `http://localhost:3663/api/dept/committees/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (response.data.success) {
        toast.success("Committee deleted successfully");
        fetchCommittees();
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err.response?.data?.message || "Error deleting committee");
    }
  };

  const handleTextUpdate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3663/api/dept/text/create",
        {
          departmentId: departmentId,
          section: "committees",
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

  const filteredCommittees = committees.filter(committee => {
    const matchesType = !filterType || committee.type === filterType;
    const matchesYear = !filterYear || committee.year.toString() === filterYear;
    return matchesType && matchesYear;
  });

  const uniqueYears = [...new Set(committees.map(comm => comm.year))].sort((a, b) => b - a);

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
        Computer Science Engineering - Committees & Boards
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
              placeholder="Add information about department committees. You can include links to uploaded files here..."
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
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: deptText || "No information available. Click Edit to add content." }}
          />
        )}
      </div>

      {/* Upload Form */}
      <div className="mb-8 p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Upload New Committee</h3>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Type *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Type</option>
                {typeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Year *</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Enter year"
                min="2000"
                max={new Date().getFullYear() + 1}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Upload File *</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG (Max 10MB)
          </p>
          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {uploading ? "Uploading..." : "Upload Committee"}
          </button>
        </form>
      </div>

      {/* Filter and List Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Committees & Boards</h3>
        
        {/* Filters */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Filter by Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              {typeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Filter by Year</label>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Years</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Committees List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCommittees.length > 0 ? (
            filteredCommittees.map((committee) => (
              <div
                key={committee.id}
                className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-3">
                  <h4 className="font-semibold text-gray-800">{committee.type}</h4>
                  <p className="text-sm text-gray-600">Year: {committee.year}</p>
                </div>
                <div className="mb-3">
                  <a
                    href={`http://localhost:3663${committee.file_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline block truncate"
                  >
                    View Document
                  </a>
                  <p className="text-sm text-gray-500">
                    Uploaded: {new Date(committee.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(committee.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No committees available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CseCommittees;