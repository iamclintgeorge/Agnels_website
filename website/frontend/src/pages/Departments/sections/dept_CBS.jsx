import React, { useEffect, useState } from "react";
import axios from "axios";

const CommitteesBoardOfStudy = ({ departmentName }) => {
  const [message, setMessage] = useState("");
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

  console.log("CommitteesBoardOfStudy", departmentName);

  useEffect(() => {
    fetchText();
  }, [departmentName]);

  const fetchText = async () => {
    try {
      const departmentSlug = departmentId[departmentName];
      const response = await axios.get(
        `http://localhost:3663/api/department/text/${departmentSlug}/committees`
      );
      console.log("CBS Text", response.data);

      // Check if the response contains file data
      if (response.data.success && response.data.data) {
        setDeptText(response.data.data.content);
        setTextContent(response.data.data.content);
      }
    } catch (err) {
      console.error(`Error loading ${departmentName} department file:`, err);
      setMessage(`Error fetching ${departmentName} department file.`);
      setError("Failed to load content.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-playfair font-bold mb-10">
        Committees and Board of Studies
      </h1>
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

export default CommitteesBoardOfStudy;
