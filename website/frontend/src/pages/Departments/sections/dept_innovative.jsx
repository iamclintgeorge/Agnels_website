import React, { useEffect, useState } from "react";
// import { fetchDepartmentSectionContent } from "./api";

const InnovativeTeaching = ({ departmentName }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const getContent = async () => {
      const data = await fetchDepartmentSectionContent(
        departmentName,
        "Innovative Teaching"
      );
      setContent(data.Content);
    };
    getContent();
  }, [departmentName]);

  return (
    <div className="innovative-teaching-section">
      <h2>Innovative Teaching</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default InnovativeTeaching;
