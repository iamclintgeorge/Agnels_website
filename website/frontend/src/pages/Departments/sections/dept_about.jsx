import React, { useEffect, useState } from "react";
import axios from "axios"; // Don't forget to import axios if not already done

const About = ({ departmentName }) => {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  console.log("About", departmentName);
  const dept_url = {
    "Computer Engineering": 2,
    "Mechanical Engineering": 5,
    "Electronics and Telecommunication Engineering": 1,
    "Electrical Engineering": 4,
    "Information Technology": 6,
    "Basic Science and Humanities": 3,
  };

  useEffect(() => {
    fetchText();
  }, [departmentName]);

  const fetchText = async () => {
    try {
      const departmentSlug = dept_url[departmentName];
      const response = await axios.get(
        `http://localhost:3663/api/department/home/${departmentSlug}`
      );
      console.log(`Fetched ${departmentName} Department Text:`, response.data);

      if (response.data.length > 0 && response.data[0].id) {
        setContent(response.data[0].paragraph1); // Set the content if fetched successfully
        setMessage(""); // Clear any previous error messages
      } else {
        console.warn("No valid id or content in fetched data:", response.data);
        setMessage("No valid text entry found.");
      }
    } catch (err) {
      console.error(`Error loading ${departmentName} department text:`, err);
      setMessage(`Error fetching ${departmentName} department text.`);
    }
  };

  return (
    <div className="about-section">
      {message && <p className="error-message">{message}</p>}
      {/* Show error message if any */}
      <div
        className="department-content"
        dangerouslySetInnerHTML={{ __html: content }} // Display the fetched content
      />
    </div>
  );
};

export default About;
