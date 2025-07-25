import React, { useEffect, useState } from "react";
// import { fetchDepartmentSectionContent } from "./api";

const Achievements = ({ departmentName }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const getContent = async () => {
      const data = await fetchDepartmentSectionContent(
        departmentName,
        "Achievements"
      );
      setContent(data.Content);
    };
    getContent();
  }, [departmentName]);

  return (
    <div className="achievements-section">
      <h2>Achievements</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default Achievements;
