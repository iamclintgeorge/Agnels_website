import React, { useEffect, useState } from "react";
import axios from "axios";

const Activities = ({ departmentName }) => {
  const [content, setContent] = useState({}); // Renamed from 'committee' to 'content'
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

  console.log("Activities", departmentName);

  useEffect(() => {
    fetchContent();
  }, [departmentName]);

  const fetchContent = async () => {
    try {
      const departmentSlug = departmentId[departmentName];
      const response = await axios.get(
        `http://localhost:3663/api/dept/activities/${departmentSlug}`
      );
      console.log(
        `Fetched ${departmentName} Department Content:`,
        response.data
      );

      // Check if the response contains content data
      if (
        response.data.success &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        const fetchedData = response.data.data[0];
        setContent(fetchedData); // Store the fetched data
        setMessage(""); // Clear any previous error messages
      } else {
        console.warn(
          "No valid content data in fetched response:",
          response.data
        );
        setMessage("No valid content entry found.");
      }
    } catch (err) {
      console.error(`Error loading ${departmentName} department content:`, err);
      setMessage(`Error fetching ${departmentName} department content.`);
    }
  };

  return (
    <div className="activities-section">
      {message && <p className="error-message">{message}</p>}

      {/* Render file download link */}
      {content.attachment && (
        <div>
          <h1>{content.heading}</h1> {/* If there's a heading */}
          <a
            href={`http://localhost:3663/uploads/department/${content.attachment}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline font-medium"
          >
            {content.attachment} {/* Link text */}
          </a>
          <p className="text-sm text-gray-500 mt-1">
            Uploaded: {new Date(content.created_timestamp).toLocaleDateString()}{" "}
            {/* Display uploaded date */}
          </p>
        </div>
      )}
    </div>
  );
};

export default Activities;
