import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { deptId, deptname } from "../../../util/dept_mapping.js";

const DeptProjects = () => {
  const [undergraduateProjects, setUndergraduateProjects] = useState([]);
  const [deptText, setDeptText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [textContent, setTextContent] = useState("");
  const [editingProject, setEditingProject] = useState(null);
  const [editProjectContent, setEditProjectContent] = useState("");
  const quillRef = useRef(null);
  const { departmentName } = useParams();
  const departmentId = deptId[departmentName];
  const deptName = deptname[departmentName];

  useEffect(() => {
    fetchProjects();
    fetchDeptText();
  }, []);

  const fetchProjects = async () => {
    try {
      const undergraduateResponse = await axios.get(
        `http://localhost:3663/api/department/projects/undergraduate/${departmentId}`
      );

      setUndergraduateProjects(undergraduateResponse.data.data);
      console.log(undergraduateResponse.data);
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

  const handleUpdateProject = async (id) => {
    if (!editProjectContent.trim()) {
      toast.error("Please enter project details");
      return;
    }

    try {
      let response;
      response = await axios.put(
        `http://localhost:3663/api/department/projects/undergraduate/${id}`,
        { projects: editProjectContent },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

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
        {deptName} - Projects
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

      {/* Projects Section */}
      <div className="space-y-4">
        {undergraduateProjects.length > 0 ? (
          undergraduateProjects.map((project) => (
            <div
              key={project.id}
              className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {project.type} Project
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
                      onClick={() => handleUpdateProject(project.id)}
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
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No projects available.
          </div>
        )}
      </div>
    </div>
  );
};

export default DeptProjects;
