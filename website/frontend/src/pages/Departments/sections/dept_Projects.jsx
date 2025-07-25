import React, { useEffect, useState } from "react";
// import { fetchDepartmentSectionContent } from "./api";

const Projects = ({ departmentName }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const getContent = async () => {
      const data = await fetchDepartmentSectionContent(
        departmentName,
        "Projects"
      );
      setContent(data.Content);
    };
    getContent();
  }, [departmentName]);

  return (
    <div className="projects-section">
      <h2>Projects</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default Projects;
