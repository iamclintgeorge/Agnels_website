import React, { useEffect, useState } from "react";
import axios from "axios";

const CommitteesBoardOfStudy = ({ departmentName }) => {
  const [committee, setCommittee] = useState({});
  const [message, setMessage] = useState("");

  const departmentId = {
    "Electronics and Telecommunication Engineering": 1,
    "Computer Engineering": 2,
    "Basic Science and Humanities": 3,
    "Electrical Engineering": 4,
    "Mechanical Engineering": 5,
    "Information Technology": 6,
    Home: "general", // For general department home
  };

  console.log("CommitteesBoardOfStudy", departmentName);

  useEffect(() => {
    fetchFile();
  }, [departmentName]);

  const fetchFile = async () => {
    try {
      const departmentSlug = departmentId[departmentName];
      const response = await axios.get(
        `http://localhost:3663/api/department/committees/${departmentSlug}`
      );
      console.log(`Fetched ${departmentName} Department File:`, response.data);

      // Check if the response contains file data
      if (
        response.data.success &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        const fileData = response.data.data[0];
        setCommittee(fileData); // Store the file data
        setMessage(""); // Clear any previous error messages
      } else {
        console.warn("No valid file data in fetched response:", response.data);
        setMessage("No valid file entry found.");
      }
    } catch (err) {
      console.error(`Error loading ${departmentName} department file:`, err);
      setMessage(`Error fetching ${departmentName} department file.`);
    }
  };

  return (
    <div className="cbs-section">
      {message && <p className="error-message">{message}</p>}

      {/* Render file download link */}
      {committee.attachment && (
        <div>
          <h1>{committee.type}</h1>
          <a
            href={`http://localhost:3663/cdn/department/${committee.attachment}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline font-medium"
          >
            {committee.attachment}
          </a>
          <p className="text-sm text-gray-500 mt-1">
            Uploaded:{" "}
            {new Date(committee.created_timestamp).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default CommitteesBoardOfStudy;
