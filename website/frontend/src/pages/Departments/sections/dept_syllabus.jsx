import React, { useEffect, useState } from "react";
// import { fetchDepartmentSectionContent } from "./api";

const Syllabus = ({ departmentName }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const getContent = async () => {
      const data = await fetchDepartmentSectionContent(
        departmentName,
        "Syllabus"
      );
      setContent(data.Content);
    };
    getContent();
  }, [departmentName]);

  return (
    <div className="syllabus-section">
      <h2>Syllabus</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default Syllabus;
