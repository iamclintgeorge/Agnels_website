import React, { useEffect, useState } from "react";
import axios from "axios"; // Don't forget to import axios if not already done

const About = ({ departmentName }) => {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  console.log("About", departmentName);
  const dept_url = {
    "Computer Engineering": "computer",
    "Mechanical Engineering": "mechanical",
    "Electronics and Telecommunication Engineering": "extc",
    "Electrical Engineering": "electrical",
    "Information Technology": "cse",
    "Basic Science and Humanities": "bsh",
  };

  useEffect(() => {
    fetchText();
  }, [departmentName]);

  const fetchText = async () => {
    try {
      const departmentSlug = dept_url[departmentName];
      const response = await axios.get(
        `http://localhost:3663/api/department/${departmentSlug}/home`
      );
      console.log(`Fetched ${departmentName} Department Text:`, response.data);

      if (response.data.length > 0 && response.data[0].id) {
        setContent(response.data[0].Content); // Set the content if fetched successfully
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
