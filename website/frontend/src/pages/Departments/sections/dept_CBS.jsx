import React, { useEffect, useState } from "react";
// import { fetchDepartmentSectionContent } from "./api";

const CommitteesBoardOfStudy = ({ departmentName }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const getContent = async () => {
      const data = await fetchDepartmentSectionContent(
        departmentName,
        "Committees and Board of Studies"
      );
      setContent(data.Content);
    };
    getContent();
  }, [departmentName]);

  return (
    <div className="committees-board-of-study-section">
      <h2>Committees & Board of Studies</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default CommitteesBoardOfStudy;
