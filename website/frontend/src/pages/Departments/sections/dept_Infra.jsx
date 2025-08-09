import React, { useState, useEffect } from "react";
import axios from "axios";

const Infrastructure = ({ departmentName }) => {
  const [infrastructure, setInfrastructure] = useState([]);
  console.log(departmentName);
  const dept_url = {
    "Computer Engineering": 2,
    "Mechanical Engineering": 5,
    "Electronics and Telecommunication Engineering": 1,
    "Electrical Engineering": 4,
    "Computer Science and Engineering (Prev. IT)": 6,
    "Basic Science and Humanities": 3,
  };

  const departmentId = dept_url[departmentName];

  useEffect(() => {
    const fetchInfrastructure = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3663/api/department/infrastructure/${departmentId}`
        );
        console.log("Fetched infrastructure data:", response.data);
        setInfrastructure(response.data.data || []);
      } catch (error) {
        console.error("Fetch infrastructure error:", error);
      }
    };
    if (departmentId) {
      fetchInfrastructure();
    }
  }, [departmentId]);

  return (
    <div className="min-h-screen bg-gray-100 py-0 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto shadow-sm overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-semibold font-playfair text-gray-900 mb-6">
            Infrastructure
          </h2>
          {infrastructure.length > 0 ? (
            <table className="w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    Description
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    Image
                  </th>
                </tr>
              </thead>
              <tbody>
                {infrastructure.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {item.description1}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {item.image ? (
                        <a
                          href={item.image}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        </a>
                      ) : (
                        <span className="text-gray-500">No image</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-sm">
              No infrastructure data available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Infrastructure;
