import React, { useEffect, useState } from "react";
// import { fetchDepartmentSectionContent } from "./api";

const Infrastructure = ({ departmentName }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const getContent = async () => {
      const data = await fetchDepartmentSectionContent(
        departmentName,
        "Infrastructure"
      );
      setContent(data.Content);
    };
    getContent();
  }, [departmentName]);

  return (
    <div className="infrastructure-section">
      <h2>Infrastructure</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default Infrastructure;
