import React, { useState, useEffect } from "react";
import axios from "axios";
import { deptId } from "../../../utils/dept_mapping";

const InnovativeTeaching = ({ departmentName }) => {
  const [innovativeTeaching, setInnovativeTeaching] = useState([]);
  const departmentId = deptId[departmentName];

  useEffect(() => {
    const fetchInnovativeTeaching = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3663/api/department/innovative/${departmentId}`
        );
        console.log("Fetched innovative teaching data:", response.data);
        setInnovativeTeaching(response.data.data || []);
      } catch (error) {
        console.error("Fetch innovative teaching error:", error);
      }
    };
    if (departmentId) {
      fetchInnovativeTeaching();
    }
  }, [departmentId]);

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-autoshadow-sm overflow-hidden">
        <div>
          <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-10">
            Innovative Teaching
          </h2>
          {innovativeTeaching.length > 0 ? (
            <div className="space-y-6">
              {innovativeTeaching.map((item) => (
                <div key={item.id}>
                  {item.methods ? (
                    <div
                      className="text-sm text-gray-700 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: item.methods }}
                    />
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No methods available
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              No innovative teaching data available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InnovativeTeaching;
