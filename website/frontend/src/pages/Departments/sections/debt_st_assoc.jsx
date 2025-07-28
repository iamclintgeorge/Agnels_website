import React, { useEffect, useState } from "react";
// import { fetchDepartmentSectionContent } from "./api";

const StudentAssociation = ({ departmentName }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const getContent = async () => {
      const data = await fetchDepartmentSectionContent(
        departmentName,
        "Student Association"
      );
      setContent(data.Content);
    };
    getContent();
  }, [departmentName]);

  return (
    <div className="student-association-section">
      <h2>Student Association</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default StudentAssociation;
