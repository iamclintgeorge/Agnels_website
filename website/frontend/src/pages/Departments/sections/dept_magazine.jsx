import React, { useEffect, useState } from "react";
// import { fetchDepartmentSectionContent } from "./api";

const Magazine = ({ departmentName }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const getContent = async () => {
      const data = await fetchDepartmentSectionContent(
        departmentName,
        "Magazine"
      );
      setContent(data.Content);
    };
    getContent();
  }, [departmentName]);

  return (
    <div className="magazine-section">
      <h2>Magazines</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default Magazine;
