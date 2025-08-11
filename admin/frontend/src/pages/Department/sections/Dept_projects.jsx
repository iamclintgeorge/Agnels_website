import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { deptId, deptname } from "../../../util/dept_mapping.js";

const DeptProjects = () => {
  const [undergraduateProjects, setUndergraduateProjects] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [textContent, setTextContent] = useState(""); // For editing department text
  const [editingProject, setEditingProject] = useState(null);
  const [editProjectContent, setEditProjectContent] = useState("");
  const quillRef = useRef(null);
  const { departmentName } = useParams();
  const departmentId = deptId[departmentName];
  const deptName = deptname[departmentName];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // Fetch Projects
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
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          {deptName} - Projects
        </h2>

        {/* Projects Section */}
        <div className="space-y-6">
          {undergraduateProjects.length > 0 ? (
            undergraduateProjects.map((project) => (
              <div
                key={project.id}
                className="border border-gray-200 p-6 rounded-lg hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                    {project.type} Project
                  </span>
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

                {editingProject === project.id ? (
                  <div>
                    <ReactQuill
                      value={editProjectContent}
                      onChange={setEditProjectContent}
                      modules={modules}
                      formats={formats}
                      className="mb-6"
                    />
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleUpdateProject(project.id)}
                        className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingProject(null);
                          setEditProjectContent("");
                        }}
                        className="bg-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: project.projects }}
                    className="prose max-w-none mt-4 text-gray-700"
                  />
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500 text-xl">
              No projects available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeptProjects;
