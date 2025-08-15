import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StaticPages from "../../layouts/staticPages";
import { Homee, AcademicCalender } from "./academicContent";
import Examinations from "./Examinations";
import axios from "axios";

const Academics = () => {
  const navigate = useNavigate();
  const [linkData, setLinkData] = useState([]);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await fetch("http://localhost:3663/api/academic/links");
      const data = await response.json();
      console.log("Fetched link data:", data);
      setLinkData(data.result); // Store the array of links
    } catch (error) {
      console.log("Error fetching academic links:", error);
    }
  };

  const sidebar = [
    "Home",
    "Academic Handbook",
    "Academic Handbook for Honours and Minors",
    "Academic Calendar",
    "Examinations",
    "Fee Approval Proposal for Academic Year 2025-26",
    "APMS",
    "LMS",
    "Stakeholder Feedback on Syllabus",
  ];

  const content = {
    Home: <Homee />,
    "Academic Calendar": <AcademicCalender />,
  };

  const handleTabClick = (tab) => {
    if (tab === "Examinations") {
      navigate("/examinations-page");
    } else if (tab === "Academic Handbook") {
      const match = linkData.find((item) => item.title === "Academic Handbook");
      if (match) window.open(match.url, "_blank");
    } else if (tab === "Academic Handbook for Honours and Minors") {
      const match = linkData.find(
        (item) =>
          item.title.includes("Honours") || item.title.includes("Minors")
      );
      if (match) window.open(match.url, "_blank");
    } else if (tab === "APMS") {
      const match = linkData.find((item) => item.title === "APMS Portal");
      if (match) window.open(match.url, "_blank");
    } else if (tab === "LMS") {
      const match = linkData.find(
        (item) => item.title === "Learning Management System"
      );
      if (match) window.open(match.url, "_blank");
    } else if (tab === "Fee Approval Proposal for Academic Year 2025-26") {
      const match = linkData.find((item) =>
        item.title.includes("Fee Approval")
      );
      if (match) window.open(match.url, "_blank");
    } else if (tab === "Stakeholder Feedback on Syllabus") {
      const match = linkData.find((item) =>
        item.title.includes("Stakeholder Feedback")
      );
      if (match) window.open(match.url, "_blank");
    } else {
      console.warn("No handler for tab:", tab);
    }
  };

  return (
    <div>
      <StaticPages
        pagename={"Academics"}
        path={"Home / Academics"}
        sidebar={sidebar}
        content={content}
        onTabClick={handleTabClick}
      />
    </div>
  );
};

export default Academics;
