import React, { useEffect, useState } from "react";

const ImportantLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://localhost:3663/api/important-links");
        const result = await response.json();
        if (result.success) {
          setLinks(result.data || []);
        } else {
          setError("Failed to fetch important links");
        }
      } catch (err) {
        console.error("Error fetching important links:", err);
        setError("Error loading important links");
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-600">
        Loading important links...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h1 className="text-2xl font-bold text-gray-800">Important Links</h1>
          </div>

          {links.length === 0 ? (
            <div className="p-6 text-center text-gray-600">No links available.</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {links.map((item, idx) => {
                  const href = (item.link || "").trim();
                  return (
                    <tr key={item.id || idx}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 align-middle">{idx + 1}</td>
                      <td className="px-6 py-4 align-middle">
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline break-words"
                        >
                          {item.title}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportantLinks;

