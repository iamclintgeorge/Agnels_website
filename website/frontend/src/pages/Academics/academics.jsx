import React from "react";
import { useNavigate } from "react-router-dom";
import StaticPages from "../../layouts/staticPages";
import {
  Homee,
  AcademicHandbook,
  AcademicHandbookDetails,
  AcademicCalender,
  // APMS,
  // LMS,
  StakeholderFeedback,
  // Examination,
} from "./academicContent";
import Examinations from "./Examinations";

const Academics = () => {
  const navigate = useNavigate();

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
    "Academic Handbook": <AcademicHandbook />,
    "Academic Handbook for Honours and Minors": <AcademicHandbookDetails />,
    "Academic Calendar": <AcademicCalender />,
    "Stakeholder Feedback on Syllabus": <StakeholderFeedback />,
  };

  const handleTabClick = (tab) => {
    if (tab === "Examinations") {
      navigate("/examinations-page"); // Navigate to examinations page
    } else if (tab === "APMS") {
      window.open("https://apms.fcrit.ac.in/apms/index.php", "_blank");
    } else if (tab === "LMS") {
      window.open("http://lms.fcrit.ac.in/moodle/", "_blank");
    } else if (tab === "Fee Approval Proposal for Academic Year 2025-26") {
      window.open(
        "https://fcrit.ac.in/static_pdfs/FeeApproval2025-26.pdf",
        "_blank"
      );
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
