import React, { useState, useEffect } from "react";
import axios from "axios";
import { deptId } from "../../../utils/dept_mapping";

const StudentAssociation = ({ departmentName }) => {
  const [associations, setAssociations] = useState([]);
  const [activeTab, setActiveTab] = useState(null); // Track the active tab

  const departmentId = deptId[departmentName];
  console.log(departmentName, departmentId);

  useEffect(() => {
    const fetchAssociations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3663/api/department/associations/${departmentId}`
        );
        console.log("Fetched associations data:", response.data);
        setAssociations(response.data.data || []);
      } catch (error) {
        console.error("Fetch associations error:", error);
      }
    };
    if (departmentId) {
      fetchAssociations();
    }
  }, [departmentId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto shadow-sm overflow-hidden">
        <div>
          <h2 className="text-3xl font-semibold font-playfair text-gray-900 mb-10">
            Student Association
          </h2>

          {/* Accordion Component */}
          <div className="accordion w-full">
            {associations.length > 0 ? (
              associations.map((item, index) => (
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
                        <div>
                          <iframe
                            src={item.attachment}
                            width="100%"
                            height="600px"
                            title={`Association Report - ${item.year}`}
                          ></iframe>
                        </div>
                      ) : (
                        <span className="text-gray-500">
                          No report available
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No student association data available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAssociation;
