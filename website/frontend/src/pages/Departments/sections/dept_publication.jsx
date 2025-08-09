import React, { useState, useEffect } from "react";
import axios from "axios";
import { deptId } from "../../../utils/dept_mapping";

const Publications = ({ departmentName }) => {
  const [publications, setPublications] = useState([]);
  const [activeTab, setActiveTab] = useState(null); // Track the active tab
  const departmentId = deptId[departmentName];

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3663/api/department/publications/${departmentId}`
        );
        console.log("Fetched publications data:", response.data);
        setPublications(response.data.data || []);
      } catch (error) {
        console.error("Fetch publications error:", error);
      }
    };
    if (departmentId) {
      fetchPublications();
    }
  }, [departmentId]);

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto shadow-sm overflow-hidden">
        <div>
          <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-10">
            Publications
          </h2>

          {/* Accordion Component */}
          <div className="accordion w-full">
            {publications.length > 0 ? (
              publications.map((item, index) => (
                <div key={item.id} className="accordion-item border-b">
                  {/* Accordion Tab */}
                  <button
                    onClick={() =>
                      setActiveTab(activeTab === index ? null : index)
                    } // Toggle between active/inactive tabs
                    className={`accordion-header w-full text-left px-6 py-3 text-base font-librefranklin font-medium ${
                      activeTab === index
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {item.year}
                  </button>

                  {/* Accordion Content (Only show if active) */}
                  {activeTab === index && (
                    <div className="accordion-body px-6 py-3">
                      {item.attachment ? (
                        <iframe
                          src={`${item.attachment}`}
                          width="100%"
                          height="600px"
                          title={`Activity PDF - ${item.heading}`}
                        ></iframe>
                      ) : (
                        <span className="text-gray-500">
                          No publication available
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No publications data available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publications;
