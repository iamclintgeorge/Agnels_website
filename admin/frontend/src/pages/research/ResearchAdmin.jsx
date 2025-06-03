// admin/frontend/src/pages/ResearchAdmin.jsx
import React, { useState } from "react";
import ResearchHome from "./components/ResearchHome";
import ResearchPdfManager from "./components/ResearchPdfManager";

const ResearchAdmin = () => {
  const [activeSection, setActiveSection] = useState("home");

  const sections = [
    { name: "Home", key: "home" },
    { name: "Research Projects", key: "research-projects" },
    { name: "Publications", key: "publications" },
    { name: "Books Published", key: "books-published" },
    { name: "Consultancy Projects", key: "consultancy-projects" },
    { name: "Patents", key: "patents" },
    { name: "Code of Conduct", key: "code-of-conduct" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Research and Publication Admin
      </h1>

      {/* Buttons for navigation */}
      <div className="flex flex-wrap gap-4 mb-6">
        {sections.map((section) => (
          <button
            key={section.key}
            onClick={() => setActiveSection(section.key)}
            className={`px-4 py-2 rounded ${
              activeSection === section.key
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {section.name}
          </button>
        ))}
      </div>

      {/* Render the appropriate component based on the active section */}
      {activeSection === "home" && <ResearchHome />}
      {activeSection !== "home" && (
        <ResearchPdfManager
          section={activeSection}
          topic={sections.find((s) => s.key === activeSection).name}
        />
      )}
    </div>
  );
};

export default ResearchAdmin;
