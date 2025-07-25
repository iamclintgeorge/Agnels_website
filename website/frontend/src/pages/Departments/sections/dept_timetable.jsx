import React, { useEffect, useState } from "react";
// import { fetchDepartmentSectionContent } from "./api";

const TimeTable = ({ departmentName }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const getContent = async () => {
      const data = await fetchDepartmentSectionContent(
        departmentName,
        "Time Table"
      );
      setContent(data.Content);
    };
    getContent();
  }, [departmentName]);

  return (
    <div className="time-table-section">
      <h2>Time Table</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default TimeTable;
