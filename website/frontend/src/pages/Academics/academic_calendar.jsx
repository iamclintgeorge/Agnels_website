import React, { useState, useEffect } from "react";
import axios from "axios";

export const AcademicCalender = () => {
  const [calendars, setCalendars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const res = await fetch("http://localhost:3663/api/academic/calendar");
        const data = await res.json();
        const calendarArray = data.result || [];

        const filtered = calendarArray
          .filter((item) => item.deleted === 0 || item.deleted === "0")
          .sort((a, b) => new Date(b.issue_date) - new Date(a.issue_date));

        setCalendars(filtered);
      } catch (err) {
        setError("Failed to fetch calendars.");
      } finally {
        setLoading(false);
      }
    };

    fetchCalendars();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getPdfUrl = (path) =>
    path?.startsWith("http") ? path : `http://localhost:3663${path}`;

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-600 py-10">{error}</p>;
  if (calendars.length === 0)
    return <p className="text-center py-10">No calendars available.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-playfair font-semibold  mb-10">
        Academic Calendar
      </h1>

      <table className="w-full table-auto border border-gray-200">
        <thead className="bg-[#0c2340] text-white">
          <tr>
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Year</th>
            <th className="py-2 px-4">Issue Date</th>
            <th className="py-2 px-4">PDF</th>
          </tr>
        </thead>
        <tbody>
          {calendars.map((item, idx) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4 text-center">{idx + 1}</td>
              <td className="py-2 px-4">{item.year || "N/A"}</td>
              <td className="py-2 px-4">{formatDate(item.issue_date)}</td>
              <td className="py-2 px-4 text-center">
                <a
                  href={getPdfUrl(item.pdf_url || item.link || item.file_path)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black underline"
                >
                  View PDF
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-center mt-6 text-gray-600">
        Total: {calendars.length} calendar{calendars.length !== 1 && "s"}
      </p>
    </div>
  );
};
