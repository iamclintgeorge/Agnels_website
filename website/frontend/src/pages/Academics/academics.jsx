import React from "react";
import { useNavigate } from "react-router-dom";
import StaticPages from "../../layouts/staticPages";
import { Homee, AcademicHandbook, AcademicHandbookDetails, AcademicCalender, APMS, LMS, StakeholderFeedback,Examination } from "./academicContent";
 // ✅ Import the Examinations component
const Academics = () => {
  const navigate = useNavigate(); // ✅ Navigation Hook

  const sidebar = [
    "Home",
    "Academic Handbook",
    "Academic Handbook for Honours and Minors",
    "Academic Calendar",
    "Examinations",
    "APMS",
    "LMS",
    "Stakeholder Feedback on Syllabus",
  ];

  const content = {
    "Home": <Homee />,
    "Academic Handbook": <AcademicHandbook />,
    "Academic Handbook for Honours and Minors": <AcademicHandbookDetails />,
    "Academic Calendar": <AcademicCalender />,
    "Examinations": <Examination />, // ✅ Correctly references the Examinations component
    "APMS": <APMS />,
    "LMS": <LMS />,
    "Stakeholder Feedback on Syllabus": <StakeholderFeedback />,
  };

  const handleSidebarClick = (item) => {
    if (item === "Examinations") {
      navigate("/examinations-page"); // ✅ Correctly redirects to a new page
    }
  };

  return (
    <div>
      <StaticPages
        pagename={"Academics"}
        path={"Home / Academics"}
        sidebar={sidebar}
        content={content}
        onSidebarClick={handleSidebarClick} // ✅ Pass function to handle sidebar clicks
      />
    </div>
  );
};

export default Academics;
