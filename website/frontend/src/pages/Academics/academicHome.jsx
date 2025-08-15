import React, { useState, useEffect } from "react";
import axios from "axios";

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