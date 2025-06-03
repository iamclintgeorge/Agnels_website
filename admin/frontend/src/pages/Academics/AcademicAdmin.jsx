import React, { useState, useEffect } from "react";
import AcademicHome from "./AcademicHome";
import AcademicHandbook from "./AcademicHandbook";
import AcademicHandbookHonours from "./AcademicHandbookHonours";
import AcademicCalendar from "./AcademicCalendar";
import Examinations from "./AcademinExaminations";
import APMS from "./AcademicLinks"
import LMS from "./AcademicLinks";
import StakeholderFeedback from "./StakeHolderFeedback";

const AcademicAdmin = () => {
  const [selectedSection, setSelectedSection] = useState("Home");

  useEffect(() => {
    // Check for stored section or URL parameter
    const storedSection = localStorage.getItem("academicSection");
    if (storedSection) {
      setSelectedSection(storedSection);
      localStorage.removeItem("academicSection"); // Clean up after use
    }

    // Listen for custom events from sidebar
    const handleSectionChange = (event) => {
      setSelectedSection(event.detail.section);
    };

    window.addEventListener("academic-section-selected", handleSectionChange);

    return () => {
      window.removeEventListener("academic-section-selected", handleSectionChange);
    };
  }, []);

  const renderSection = () => {
    switch (selectedSection) {
      case "Home":
        return <AcademicHome />;
      case "Academic Handbook":
        return <AcademicHandbook />;
      case "Academic Handbook Honours/Minors":
        return <AcademicHandbookHonours />;
      case "Academic Calendar":
        return <AcademicCalendar />;
      case "Examinations":
        return <Examinations />;
      case "APMS":
        return <APMS />;
      case "LMS":
        return <LMS />;
      case "Stakeholder Feedback":
        return <StakeholderFeedback />;
      default:
        return <AcademicHome />;
    }
  };

  const sectionTabs = [
    "Home",
    "Academic Handbook",
    "Academic Handbook for Honours and Minors",
    "Academic Calendar",
    "Examinations",
    "APMS",
    "LMS",
    "Stakeholder Feedback on Syllabus"
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Academics Management</h1>
          <p className="text-gray-600 mt-1">
            Manage academic content, handbooks, calendars, and examinations
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b overflow-x-auto">
        <div className="px-6">
          <nav className="flex space-x-8">
            {sectionTabs.map((section) => (
              <button
                key={section}
                onClick={() => setSelectedSection(section)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                  selectedSection === section
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {section}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {renderSection()}
      </div>
    </div>
  );
};

export default AcademicAdmin;