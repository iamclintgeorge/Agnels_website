import React, { useState, useEffect } from "react";
import axios from "axios";
import StaticPages from "../../layouts/staticPages.jsx";

function Circulars() {
  const [circulars, setCirculars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch circulars on component mount
  useEffect(() => {
    const fetchCirculars = async () => {
      try {
        const response = await axios.get("http://localhost:3663/api/home/circulars");
        setCirculars(response.data?.result || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching circulars:", err);
        setError("Failed to load circulars");
        setLoading(false);
      }
    };

    fetchCirculars();
  }, []);

  // Content to display in the StaticPages layout
  const content = {
    // Since we have no sidebar, we'll put the table directly here
    // But StaticPages expects content[activeTab], so we need a workaround
  };

  // Create the table content
  const CircularsTable = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-10">
          <div className="text-[#0C2340] text-lg">Loading circulars...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center py-10">
          <div className="text-red-600 text-lg">{error}</div>
        </div>
      );
    }

    if (circulars.length === 0) {
      return (
        <div className="flex justify-center items-center py-10">
          <div className="text-[#0C2340] text-lg">No circulars available</div>
        </div>
      );
    }

    return (
      <div className="w-full">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#0C2340] mb-2">
            Latest Circulars
          </h2>
          <div className="w-20 h-1 bg-[#AE9142]"></div>
        </div>
        
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-[#0C2340] text-white">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-sm">
                  Sr. No.
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-sm">
                  Subject
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-sm">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-sm">
                  Attachment URL
                </th>
              </tr>
            </thead>
            <tbody>
              {circulars.map((circular, index) => (
                <tr 
                  key={circular.id} 
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-[#AE9142]/10 transition-colors duration-200`}
                >
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center font-medium">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-[#0C2340] font-medium">
                    {circular.subject}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                    {circular.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm">
                    {circular.attachment ? (
                      <a 
                        href={circular.attachment} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#AE9142] hover:text-[#0C2340] underline break-all transition-colors duration-200"
                      >
                        View Attachment
                      </a>
                    ) : (
                      <span className="text-gray-400 italic">No attachment</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-gray-600 text-center">
          Total: {circulars.length} circular{circulars.length !== 1 ? 's' : ''}
        </div>
      </div>
    );
  };

  return (
    <StaticPages
      pagename="Circulars"
      path="Home / Circulars"
      sidebar={[]}
      content={{}}
      // Since we have no sidebar, we'll override the content area
      customContent={<CircularsTable />}
    />
  );
}

export default Circulars;
