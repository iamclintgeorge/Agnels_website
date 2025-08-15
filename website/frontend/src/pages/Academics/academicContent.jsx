import React, { useState, useEffect } from "react";

import {
  FaChalkboardTeacher,
  FaUsers,
  FaEye,
  FaClipboardCheck,
  FaCheckCircle,
  FaUniversity,
  FaGraduationCap,
  FaBook,
  FaCertificate,
  FaAward,
  FaChartLine,
  FaCog,
  FaSpinner,
  FaFilePdf,
  FaBookOpen,
  FaExclamationTriangle,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaDesktop,
  FaTags,
  FaUser,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSave,
  FaTimes,
  FaBell,
} from "react-icons/fa";
import axios from "axios";

export const Homee = () => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await axios.get("http://localhost:3663/api/academic/home");
      console.log("Fetched content:", res.data);
      setContent(res.data.result[0].Content);
    } catch (err) {
      console.error("Error fetching department home content:", err);
      setError("Failed to load content.");
    }
  };

  return (
    <div className="p-4">
      {/* <h1 className="text-3xl text-center font-playfair font-bold mb-10">
        Department Home
      </h1> */}
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div
          className="ql-editor text-justify font-librefranklin"
          style={{ padding: 0 }} // Optional: removes default padding from .ql-editor
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
};

export const AcademicCalender = () => {
  const [calendars, setCalendars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:3663/api/academic/calendar"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        // 🔍 DEBUG: Log the actual API response structure
        console.log("🔍 Calendar API Response:", responseData);
        console.log("🔍 Response type:", typeof responseData);
        console.log("🔍 Is array?", Array.isArray(responseData));
        console.log("🔍 Response keys:", Object.keys(responseData || {}));

        // Handle different response formats
        let data;
        if (Array.isArray(responseData)) {
          console.log("✅ Using direct array format");
          data = responseData;
        } else if (
          responseData &&
          responseData.result &&
          Array.isArray(responseData.result)
        ) {
          console.log("✅ Using responseData.result format");
          data = responseData.result;
        } else if (
          responseData &&
          responseData.data &&
          Array.isArray(responseData.data)
        ) {
          console.log("✅ Using responseData.data format");
          data = responseData.data;
        } else if (
          responseData &&
          responseData.calendars &&
          Array.isArray(responseData.calendars)
        ) {
          console.log("✅ Using responseData.calendars format");
          data = responseData.calendars;
        } else {
          console.log("❌ None of the expected formats matched");
          console.log(
            "❌ Available keys:",
            responseData
              ? Object.keys(responseData)
              : "responseData is null/undefined"
          );
          throw new Error(
            `API response format not recognized. Response keys: ${
              responseData ? Object.keys(responseData).join(", ") : "none"
            }`
          );
        }

        console.log("📅 Processed calendar data:", data);

        // Filter out deleted entries and sort by date (newest first)
        const activeCalendars = data
          .filter((item) => item.deleted === 0 || item.deleted === "0")
          .sort((a, b) => {
            // Sort by created_at or updated_at, newest first
            const dateA = new Date(
              a.updated_at || a.created_at || a.issue_date
            );
            const dateB = new Date(
              b.updated_at || b.created_at || b.issue_date
            );
            return dateB - dateA;
          });

        setCalendars(activeCalendars);
      } catch (err) {
        console.error("❌ Error fetching calendars:", err);
        console.error("❌ Error message:", err.message);

        // More specific error messages
        if (err.message.includes("Failed to fetch")) {
          setError(
            "Cannot connect to server. Is your API running on port 3663?"
          );
        } else {
          setError(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCalendars();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-10">
        <FaSpinner className="text-4xl text-blue-600 animate-spin mb-4" />
        <p className="text-lg text-gray-600">Loading academic calendars...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-10">
        <FaExclamationTriangle className="text-4xl text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-lg text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!calendars || calendars.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-10">
        <FaExclamationTriangle className="text-4xl text-yellow-500 mb-4" />
        <h1 className="text-2xl font-bold text-yellow-600 mb-4">
          No Calendars Available
        </h1>
        <p className="text-lg text-gray-600">
          No academic calendars are currently available.
        </p>
      </div>
    );
  }

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateString; // Return original if parsing fails
    }
  };

  // Helper function to create full PDF URL
  const getPdfUrl = (pdfPath) => {
    if (!pdfPath) return "#";
    return pdfPath.startsWith("http")
      ? pdfPath
      : `http://localhost:3663${pdfPath}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-blue-900 mb-6 text-center flex items-center justify-center">
          <FaCalendarAlt className="mr-3 text-blue-700" />
          Academic Calendar
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg shadow-md">
            <thead className="bg-blue-700 text-white text-left">
              <tr>
                <th className="py-3 px-5">Sr No.</th>
                <th className="py-3 px-5">Year</th>
                <th className="py-3 px-5">Issue Date</th>
                <th className="py-3 px-5 text-center">View / Download</th>
              </tr>
            </thead>
            <tbody>
              {calendars.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-100 transition-all"
                >
                  <td className="py-3 px-5">{index + 1}</td>
                  <td className="py-3 px-5">
                    {item.year || item.title || item.academic_year || "N/A"}
                  </td>
                  <td className="py-3 px-5">
                    {formatDate(
                      item.issue_date || item.date || item.created_at
                    )}
                  </td>
                  <td className="py-3 px-5 text-center">
                    <a
                      href={getPdfUrl(
                        item.pdf_url || item.link || item.file_path
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all inline-flex items-center justify-center"
                    >
                      <FaExternalLinkAlt className="mr-2" /> View PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="mt-6 text-center text-gray-600">
          <p>
            Total Academic Calendars: <strong>{calendars.length}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
