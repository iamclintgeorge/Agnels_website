import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const ElectricalProjects = () => {
  const [undergraduateProjects, setUndergraduateProjects] = useState([]);
  const [miniProjects, setMiniProjects] = useState([]);
  const [deptText, setDeptText] = useState("");
  const [activeTab, setActiveTab] = useState("BE");
  const [projects, setProjects] = useState("");
  const [level, setLevel] = useState("BE");
  const [uploading, setUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [textContent, setTextContent] = useState("");
  const [editingProject, setEditingProject] = useState(null);
  const [editProjectContent, setEditProjectContent] = useState("");
  const quillRef = useRef(null);
  const departmentId = 4; // Electrical Engineering department ID

  useEffect(() => {
    fetchProjects();
    fetchDeptText();
  }, []);

  const fetchProjects = async () => {
    try {
      const [undergraduateResponse, miniResponse] = await Promise.all([
        axios.get(
          `http://localhost:3663/api/department/projects/undergraduate/${departmentId}`
        ),
        axios.get(
          `http://localhost:3663/api/department/projects/mini/${departmentId}`
        ),
      ]);

      if (undergraduateResponse.data.success) {
        setUndergraduateProjects(undergraduateResponse.data.data);
      }
      if (miniResponse.data.success) {
        setMiniProjects(miniResponse.data.data);
      }
    } catch (err) {
      console.error("Error loading projects:", err);
      toast.error("Error fetching projects");
    }
  };

  const fetchDeptText = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3663/api/department/text/${departmentId}/projects`
      );
      if (response.data.success && response.data.data) {
        setDeptText(response.data.data.content);
        setTextContent(response.data.data.content);
      }
    } catch (err) {
      console.error("Error loading department text:", err);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!projects.trim()) {
      toast.error("Please enter project details");
      return;
    }

    setUploading(true);
    try {
      let response;
      if (level === "BE") {
        response = await axios.post(
          "http://localhost:3663/api/department/projects/undergraduate/create",
          {
            departmentId: departmentId,
            projects: projects,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:3663/api/department/projects/mini/create",
          {
            departmentId: departmentId,
            level: level,
            projects: projects,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      if (response.data.success) {
        toast.success(`${level} project created successfully`);
        setProjects("");
        fetchProjects();
      }
    } catch (err) {
      console.error("Create error:", err);
      toast.error(err.response?.data?.message || "Error creating project");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateProject = async (id, isUndergraduate = false) => {
    if (!editProjectContent.trim()) {
      toast.error("Please enter project details");
      return;
    }

    try {
      let response;
      if (isUndergraduate) {
        response = await axios.put(
          `http://localhost:3663/api/department/projects/undergraduate/${id}`,
          { projects: editProjectContent },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        response = await axios.put(
          `http://localhost:3663/api/department/projects/mini/${id}`,
          { projects: editProjectContent },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      if (response.data.success) {
        toast.success("Project updated successfully");
        setEditingProject(null);
        setEditProjectContent("");
        fetchProjects();
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.response?.data?.message || "Error updating project");
    }
  };

  const handleDeleteProject = async (id, isUndergraduate = false) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      let response;
      if (isUndergraduate) {
        response = await axios.delete(
          `http://localhost:3663/api/department/projects/undergraduate/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        response = await axios.delete(
          `http://localhost:3663/api/department/projects/mini/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      if (response.data.success) {
        toast.success("Project deleted successfully");
        fetchProjects();
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err.response?.data?.message || "Error deleting project");
    }
  };

  const handleTextUpdate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3663/api/department/text/create",
        {
          departmentId: departmentId,
          section: "projects",
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

  const getCurrentProjects = () => {
    if (activeTab === "BE") {
      return undergraduateProjects;
    } else {
      return miniProjects.filter((project) => project.level === activeTab);
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
        Electrical Engineering - Projects
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
              placeholder="Add information about projects. You can include guidelines, requirements, etc..."
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

      {/* Add New Project Form */}
      <div className="mb-8 p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Add New Project
        </h3>
        <form onSubmit={handleCreateProject} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="BE">BE (Final Year)</option>
              <option value="TE">TE (Third Year)</option>
              <option value="SE">SE (Second Year)</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Project Details</label>
            <ReactQuill
              value={projects}
              onChange={setProjects}
              modules={modules}
              formats={formats}
              className="mb-4"
              placeholder="Enter project details, guidelines, list of projects, etc..."
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {uploading ? "Creating..." : `Add ${level} Project`}
          </button>
        </form>
      </div>

      {/* Projects Tabs */}
      <div>
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {["BE", "TE", "SE"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab} Projects
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          {getCurrentProjects().length > 0 ? (
            getCurrentProjects().map((project) => (
              <div
                key={project.id}
                className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {activeTab} Project
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingProject(project.id);
                        setEditProjectContent(project.projects);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteProject(project.id, activeTab === "BE")
                      }
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      ×
                    </button>
                  </div>
                </div>

                {editingProject === project.id ? (
                  <div>
                    <ReactQuill
                      value={editProjectContent}
                      onChange={setEditProjectContent}
                      modules={modules}
                      formats={formats}
                      className="mb-4"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleUpdateProject(project.id, activeTab === "BE")
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingProject(null);
                          setEditProjectContent("");
                        }}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: project.projects }}
                    className="prose max-w-none"
                  />
                )}

                <p className="text-sm text-gray-500 mt-2">
                  Created:{" "}
                  {new Date(project.created_timestamp).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No {activeTab} projects available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElectricalProjects;
