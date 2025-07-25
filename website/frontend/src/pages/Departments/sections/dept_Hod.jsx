import React, { useEffect, useState } from "react";
// import { fetchDepartmentSectionContent } from "./api";

const HeadOfDepartment = ({ departmentName }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const getContent = async () => {
      const data = await fetchDepartmentSectionContent(
        departmentName,
        "Head of Department"
      );
      setContent(data.Content);
    };
    getContent();
  }, [departmentName]);

  return (
    <div className="hod-section">
      <h2>Head of Department</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default HeadOfDepartment;
