import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const BshProjects = () => {
  const [activeTab, setActiveTab] = useState("BE");
  const [undergraduateProjects, setUndergraduateProjects] = useState([]);
  const [miniProjects, setMiniProjects] = useState([]);
  const [deptText, setDeptText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [textContent, setTextContent] = useState("");
  const [editingProject, setEditingProject] = useState(null);
  const [projectContent, setProjectContent] = useState("");
  const quillRef = useRef(null);
  const departmentId = 3; // BSH department ID

  const tabs = [
    { id: "BE", label: "BE Projects", type: "BE" },
    { id: "TE", label: "TE Projects", type: "TE" },
    { id: "SE", label: "SE Projects", type: "SE" },
  ];

  useEffect(() => {
    fetchProjects();
    fetchDeptText();
  }, []);

  const fetchProjects = async () => {
    try {
      // Fetch undergraduate projects (BE)
      const undergraduateResponse = await axios.get(
        `http://localhost:3663/api/department/projects/undergraduate/${departmentId}/BE`
      );
      if (undergraduateResponse.data.success) {
        setUndergraduateProjects(undergraduateResponse.data.data);
      }

      // Fetch mini projects (TE/SE)
      const miniResponse = await axios.get(
        `http://localhost:3663/api/department/projects/mini/${departmentId}`
      );
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

  const handleProjectUpdate = async (project) => {
    try {
      const isUndergraduate = project.type === "BE";
      const endpoint = isUndergraduate
        ? `http://localhost:3663/api/department/projects/undergraduate/${project.id}`
        : `http://localhost:3663/api/department/projects/mini/${project.id}`;

      const response = await axios.put(
        endpoint,
        { projects: projectContent },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Project updated successfully!");
        setEditingProject(null);
        setProjectContent("");
        fetchProjects();
      }
    } catch (error) {
      console.error("Project update error:", error);
      toast.error("Error updating project");
    }
  };

  const handleCreateProject = async (type) => {
    try {
      const isUndergraduate = type === "BE";
      const endpoint = isUndergraduate
        ? "http://localhost:3663/api/department/projects/undergraduate/create"
        : "http://localhost:3663/api/department/projects/mini/create";

      const payload = {
        departmentId: departmentId,
        type: type,
        projects: "Add your project details here...",
      };

      if (!isUndergraduate) {
        payload.level = type; // TE or SE
      }

      const response = await axios.post(endpoint, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        toast.success("Project created successfully!");
        fetchProjects();
      }
    } catch (error) {
      console.error("Project creation error:", error);
      toast.error("Error creating project");
    }
  };

  const handleDeleteProject = async (project) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      const isUndergraduate = project.type === "BE";
      const endpoint = isUndergraduate
        ? `http://localhost:3663/api/department/projects/undergraduate/${project.id}`
        : `http://localhost:3663/api/department/projects/mini/${project.id}`;

      const response = await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        toast.success("Project deleted successfully!");
        fetchProjects();
      }
    } catch (error) {
      console.error("Project deletion error:", error);
      toast.error("Error deleting project");
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
        Basic Sciences & Humanities - Projects
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
              placeholder="Add information about department projects. You can include links to uploaded files here..."
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
            dangerouslySetInnerHTML={{
              __html:
                deptText ||
                "No information available. Click Edit to add content.",
            }}
          />
        )}
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Create New Project Button */}
      <div className="mb-6">
        <button
          onClick={() => handleCreateProject(activeTab)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add New {activeTab} Project
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {getCurrentProjects().length > 0 ? (
          getCurrentProjects().map((project) => (
            <div key={project.id} className="border p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {activeTab} Projects
                  </h4>
                  <p className="text-sm text-gray-500">
                    Last updated:{" "}
                    {new Date(project.updated_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingProject(project.id);
                      setProjectContent(project.projects || "");
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {editingProject === project.id ? (
                <div>
                  <ReactQuill
                    value={projectContent}
                    onChange={setProjectContent}
                    modules={modules}
                    formats={formats}
                    className="mb-4"
                    placeholder="Enter project details..."
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleProjectUpdate(project)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingProject(null);
                        setProjectContent("");
                      }}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html:
                      project.projects ||
                      "No project details available. Click Edit to add content.",
                  }}
                />
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No {activeTab} projects available. Click "Add New {activeTab}{" "}
            Project" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default BshProjects;
