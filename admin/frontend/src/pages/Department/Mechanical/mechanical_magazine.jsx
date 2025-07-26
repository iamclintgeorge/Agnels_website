import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const MechanicalMagazine = () => {
  const [magazines, setMagazines] = useState([]);
  const [deptText, setDeptText] = useState("");
  const [file, setFile] = useState(null);
  const [year, setYear] = useState("");
  const [uploading, setUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [textContent, setTextContent] = useState("");
  const quillRef = useRef(null);
  const departmentId = 5; // Mechanical Engineering department ID

  useEffect(() => {
    fetchMagazines();
    fetchDeptText();
  }, []);

  const fetchMagazines = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3663/api/department/magazines/${departmentId}`
      );
      if (response.data.success) {
        setMagazines(response.data.data);
      }
    } catch (err) {
      console.error("Error loading magazines:", err);
      toast.error("Error fetching magazines");
    }
  };

  const fetchDeptText = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3663/api/department/text/${departmentId}/magazine`
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
    if (!file || !year) {
      toast.error("Please select a file and provide a year");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("departmentId", departmentId);
    formData.append("year", year);

    setUploading(true);
    try {
      const response = await axios.post(
        "http://localhost:3663/api/department/magazines/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Magazine uploaded successfully");
        setFile(null);
        setYear("");
        fetchMagazines();
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err.response?.data?.message || "Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this magazine?"))
      return;

    try {
      const response = await axios.delete(
        `http://localhost:3663/api/department/magazines/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Magazine deleted successfully");
        fetchMagazines();
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err.response?.data?.message || "Error deleting magazine");
    }
  };

  const handleTextUpdate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3663/api/department/text/create",
        {
          departmentId: departmentId,
          section: "magazine",
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
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Mechanical Engineering - Magazine
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
              placeholder="Add information about department magazines. You can include links to uploaded files here..."
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
            dangerouslySetInnerHTML={{
              __html:
                deptText ||
                "No information available. Click Edit to add content.",
            }}
            className="prose max-w-none"
          />
        )}
      </div>

      {/* Upload Form */}
      <div className="mb-8 p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Upload New Magazine
        </h3>
        <form onSubmit={handleUpload} className="space-y-4">
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
            {uploading ? "Uploading..." : "Upload Magazine"}
          </button>
        </form>
      </div>

      {/* Magazines List */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Department Magazines
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {magazines.length > 0 ? (
            magazines.map((magazine) => (
              <div
                key={magazine.id}
                className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {magazine.year}
                  </span>
                  <button
                    onClick={() => handleDelete(magazine.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    ×
                  </button>
                </div>
                <div>
                  <a
                    href={`http://localhost:3663/uploads/department/${magazine.attachment}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline font-medium"
                  >
                    {magazine.attachment}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">
                    Uploaded:{" "}
                    {new Date(magazine.created_timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No magazines available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MechanicalMagazine;
