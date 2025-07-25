import React, { useEffect, useState } from "react";
// import { fetchDepartmentSectionContent } from "./api";

const FacultySupportingStaff = ({ departmentName }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const getContent = async () => {
      const data = await fetchDepartmentSectionContent(
        departmentName,
        "Faculty and Supporting Staff"
      );
      setContent(data.Content);
    };
    getContent();
  }, [departmentName]);

  return (
    <div className="faculty-supporting-staff-section">
      <h2>Faculty & Supporting Staff</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default FacultySupportingStaff;
