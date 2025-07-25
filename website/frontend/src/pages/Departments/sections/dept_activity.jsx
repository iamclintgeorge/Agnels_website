import React, { useEffect, useState } from "react";
// import { fetchDepartmentSectionContent } from "./api";

const Activities = ({ departmentName }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const getContent = async () => {
      const data = await fetchDepartmentSectionContent(
        departmentName,
        "Activities"
      );
      setContent(data.Content);
    };
    getContent();
  }, [departmentName]);

  return (
    <div className="activities-section">
      <h2>Department Activities</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default Activities;
