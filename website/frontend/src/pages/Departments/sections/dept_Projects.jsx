import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-quill/dist/quill.snow.css";

const Projects = ({ departmentName }) => {
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");

  const departmentId = {
    "Electronics and Telecommunication Engineering": 1,
    "Computer Engineering": 2,
    "Basic Science and Humanities": 3,
    "Electrical Engineering": 4,
    "Mechanical Engineering": 5,
    "Computer Science and Engineering (Prev. IT)": 6,
    Home: "general",
  };

  useEffect(() => {
    fetchProjects();
  }, [departmentName]);

  const fetchProjects = async () => {
    try {
      const departmentSlug = departmentId[departmentName];
      if (!departmentSlug) {
        setMessage("Invalid department name.");
        return;
      }
      const response = await axios.get(
        `http://localhost:3663/api/department/projects/undergraduate/${departmentSlug}`
      );
      console.log(`Fetched ${departmentName} Projects Data:`, response.data);

      if (
        response.data.success &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        const fetchedData = response.data.data[0];
        setProjects(fetchedData.projects); // Directly set the HTML content
        setMessage("");
      } else {
        console.warn(
          "No valid project data in fetched response:",
          response.data
        );
        setMessage("No project data found.");
      }
    } catch (error) {
      console.error(`Error fetching ${departmentName} projects:`, error);
      setMessage(`Error fetching ${departmentName} projects.`);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto overflow-hidden p-6">
        <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-10">
          Projects
        </h2>
        {message && <p className="text-gray-500 text-sm mb-4">{message}</p>}
        {projects.length > 0 ? (
          <div
            className="space-y-6 ql-editor"
            dangerouslySetInnerHTML={{ __html: projects }} // Inject raw HTML
          />
        ) : (
          !message && (
            <p className="text-gray-500 text-sm">No project data available</p>
          )
        )}
      </div>
    </div>
  );
};

export default Projects;
