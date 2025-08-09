import React, { useEffect, useState } from "react";
import axios from "axios";

const Activities = ({ departmentName }) => {
  const [content, setContent] = useState([]);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState(null); // Track the currently active tab

  const departmentId = {
    "Electronics and Telecommunication Engineering": 1,
    "Computer Engineering": 2,
    "Basic Science and Humanities": 3,
    "Electrical Engineering": 4,
    "Mechanical Engineering": 5,
    "Computer Science and Engineering (Prev. IT)": 6,
    Home: "general",
  };

  useEffect(() => {
    fetchContent();
  }, [departmentName]);

  const fetchContent = async () => {
    try {
      const departmentSlug = departmentId[departmentName];
      const response = await axios.get(
        `http://localhost:3663/api/department/activities/${departmentSlug}`
      );
      if (
        response.data.success &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        setContent(response.data.data); // Store all fetched data
        setMessage(""); // Clear any previous error messages
      } else {
        setMessage("No valid content entry found.");
      }
    } catch (err) {
      setMessage(`Error fetching ${departmentName} department content.`);
    }
  };

  return (
    <div className="activities-section">
      {message && <p className="error-message">{message}</p>}

      <h1 className="text-3xl font-semibold font-playfair mb-10">Activities</h1>

      {/* Accordion Section */}
      <div className="accordion w-full">
        {content.length > 0 ? (
          content.map((item, index) => (
            <div key={index} className="accordion-item border-b">
              {/* Accordion Tab */}
              <button
                onClick={() => setActiveTab(activeTab === index ? null : index)} // Toggle between active/inactive tabs
                className={`accordion-header w-full text-left px-6 py-3 text-base font-librefranklin${
                  activeTab === index
                    ? "bg-[#0c2340] text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {item.heading}
              </button>

              {/* Accordion Content (Only show if active) */}
              {activeTab === index && (
                <div className="accordion-body px-6 py-3">
                  {item.attachment && (
                    <div>
                      <iframe
                        src={`${item.attachment}`}
                        width="100%"
                        height="600px"
                        title={`Activity PDF - ${item.heading}`}
                      ></iframe>
                    </div>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    Uploaded:{" "}
                    {new Date(item.created_timestamp).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No activities available for this department.</p>
        )}
      </div>
    </div>
  );
};

export default Activities;
