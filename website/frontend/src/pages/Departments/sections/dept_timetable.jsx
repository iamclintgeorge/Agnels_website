import React, { useEffect, useState } from "react";
import axios from "axios";

const TimeTable = ({ departmentName }) => {
  const [deptText, setDeptText] = useState("");
  const [textContent, setTextContent] = useState("");
  const [error, setError] = useState("");

  const departmentId = {
    "Electronics and Telecommunication Engineering": 1,
    "Computer Engineering": 2,
    "Basic Science and Humanities": 3,
    "Electrical Engineering": 4,
    "Mechanical Engineering": 5,
    "Computer Science and Engineering (Prev. IT)": 6,
  };

  useEffect(() => {
    fetchDeptText();
  }, [departmentName]);

  const fetchDeptText = async () => {
    try {
      const departmentSlug = departmentId[departmentName];
      const response = await axios.get(
        `http://localhost:3663/api/department/text/${departmentSlug}/timetable`
      );
      console.log(response.data);
      if (response.data.success && response.data.data) {
        setDeptText(response.data.data.content);
        setTextContent(response.data.data.content);
      }
    } catch (err) {
      console.error("Error loading department text:", err);
      setError("Failed to load content.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-playfair font-bold mb-10">Time Table</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div
          className="ql-editor text-justify font-librefranklin"
          style={{ padding: 0 }}
          dangerouslySetInnerHTML={{ __html: textContent }}
        />
      )}
    </div>
  );
};

export default TimeTable;
