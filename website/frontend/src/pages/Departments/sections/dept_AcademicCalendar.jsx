import React, { useEffect, useState } from "react";
// import { fetchDepartmentSectionContent } from "./api";

const AcademicCalendar = ({ departmentName }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const getContent = async () => {
      const data = await fetchDepartmentSectionContent(
        departmentName,
        "Academic Calendar"
      );
      setContent(data.Content);
    };
    getContent();
  }, [departmentName]);

  return (
    <div className="academic-calendar-section">
      <h2>Academic Calendar</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default AcademicCalendar;
