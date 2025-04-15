import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/useAuthCheck";

// Create a custom context for section selection
export const SectionContext = React.createContext({
  setSelectedSection: () => {},
});

const SideBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isResearchOpen, setIsResearchOpen] = useState(false);

  const handleHomeClick = () => {
    setIsHomeOpen((prevstate) => !prevstate);
  };

  const handleAboutClick = () => {
    setIsAboutOpen((prevstate) => !prevstate);
  };

  const handleUserClick = () => {
    setIsUserOpen((prevstate) => !prevstate);
  };

  const handleResearchClick = () => {
    setIsResearchOpen((prevstate) => !prevstate);
  };

  // Function to handle section selection directly
  const handleSectionSelect = (section) => {
    // Store the section in localStorage for backup
    localStorage.setItem("aboutUsSection", section);

    // Navigate to about-us page and then dispatch a custom event
    navigate("/about-us");

    // Dispatch a custom event that AboutUsAdmin can listen for
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("section-selected", {
          detail: { section },
        })
      );
    }, 50);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="bg-[#0C2340] mt-16 min-h-screen max-h-auto w-64 text-white pb-10 sticky top-0 z-0">
      <div className="flex flex-col pt-9 pl-8 space-y-9 text-base font-light font-inter">
        <Link to="/">
          <p className="flex justify-between pr-8">
            Dashboard <span>&gt;</span>
          </p>
        </Link>
        <div>
          <p
            className="cursor-pointer flex justify-between items-center pr-8"
            onClick={handleHomeClick}
          >
            Home Page{" "}
            <span
              className={`transform transition-transform ${
                isHomeOpen ? "rotate-90" : ""
              }`}
            >
              &gt;
            </span>
          </p>
          {isHomeOpen && (
            <div className="pt-2 pr-8 pl-4 leading-10">
              <Link to="/home/carousel">
                <p>Image Carousel</p>
              </Link>
              <Link to="/home/introtext">
                <p>Introduction Section</p>
              </Link>
              <Link to="/home/whatsNew">
                <p>Announcements</p>
              </Link>
            </div>
          )}
        </div>
        <div>
          <p
            className="cursor-pointer flex justify-between items-center pr-8"
            onClick={handleAboutClick}
          >
            About Us{" "}
            <span
              className={`transform transition-transform ${
                isAboutOpen ? "rotate-90" : ""
              }`}
            >
              &gt;
            </span>
          </p>
          {isAboutOpen && (
            <div className="pt-2 pr-8 pl-4 leading-10">
              <p
                className="cursor-pointer"
                onClick={() => handleSectionSelect("History")}
              >
                History
              </p>
              <p
                className="cursor-pointer"
                onClick={() => handleSectionSelect("Vision and Mission")}
              >
                Vision and Mission
              </p>
              <p
                className="cursor-pointer"
                onClick={() => handleSectionSelect("Trustees")}
              >
                Trustees
              </p>
              <p
                className="cursor-pointer"
                onClick={() => handleSectionSelect("Managing Director's Desk")}
              >
                Managing Director's Desk
              </p>
              <p
                className="cursor-pointer"
                onClick={() => handleSectionSelect("Principal's Desk")}
              >
                Principal's Desk
              </p>
              <p
                className="cursor-pointer"
                onClick={() => handleSectionSelect("Governance")}
              >
                Governance
              </p>
              <p
                className="cursor-pointer"
                onClick={() =>
                  handleSectionSelect("Audit Report and Affiliations")
                }
              >
                Audit Report and Affiliations
              </p>
              <p
                className="cursor-pointer"
                onClick={() =>
                  handleSectionSelect("Administrations and Committees")
                }
              >
                Administrations and Committees
              </p>
              <p
                className="cursor-pointer"
                onClick={() => handleSectionSelect("Institute Roadmap")}
              >
                Institute Roadmap
              </p>
              <p
                className="cursor-pointer"
                onClick={() => handleSectionSelect("Service Regulation")}
              >
                Service Regulation
              </p>
              <p
                className="cursor-pointer"
                onClick={() =>
                  handleSectionSelect(
                    "Qualification and Eligibility norms for Recruitment"
                  )
                }
              >
                Qualification and Eligibility norms for Recruitment
              </p>
              <p
                className="cursor-pointer"
                onClick={() => handleSectionSelect("Best Practices")}
              >
                Best Practices
              </p>
              <p
                className="cursor-pointer"
                onClick={() => handleSectionSelect("Mandatory Disclosures")}
              >
                Mandatory Disclosures
              </p>
            </div>
          )}
        </div>
        <p className="flex justify-between pr-8">
          Departments <span>&gt;</span>
        </p>
        <p className="flex justify-between pr-8">
          Admission <span>&gt;</span>
        </p>
        <p className="flex justify-between pr-8">
          Academics <span>&gt;</span>
        </p>
        <Link to="/training-placement" className="flex justify-between pr-8">
          Training and Placement <span>&gt;</span>
        </Link>
        <div>
          <p
            className="cursor-pointer flex justify-between items-center pr-8"
            onClick={handleResearchClick}
          >
            Research and Publication{" "}
            <span
              className={`transform transition-transform ${
                isResearchOpen ? "rotate-90" : ""
              }`}
            >
              &gt;
            </span>
          </p>
          {isResearchOpen && (
            <div className="pt-2 pr-5 pl-4 leading-10">
              <Link to="/research/home">
                <p>Home</p>
              </Link>
              <Link to="/research/projects">
                <p>Research Projects</p>
              </Link>
              <Link to="/research/publications">
                <p>Publications</p>
              </Link>
              <Link to="/research/books">
                <p>Books Published</p>
              </Link>
              <Link to="/research/consultancy">
                <p>Consultancy Projects</p>
              </Link>
              <Link to="/research/patents">
                <p>Patents</p>
              </Link>
              <Link to="/research/code-of-conduct">
                <p>Code of Conduct</p>
              </Link>
            </div>
          )}
        </div>
        <p className="flex justify-between pr-8">
          Human Resource <span>&gt;</span>
        </p>
        <p className="flex justify-between pr-8">
          Alumni Page <span>&gt;</span>
        </p>
        <p className="flex justify-between pr-8">
          Downloads Page <span>&gt;</span>
        </p>
        {(user.role === "teach_staff" || user.role === "superAdmin") && (
          <Link to="/student" className="flex justify-between pr-8">
            Students Corner <span>&gt;</span>
          </Link>
        )}
        {(user.role === "hod" || user.role === "superAdmin") && (
          <p
            className="cursor-pointer mb-0 pb-0 flex justify-between items-center pr-8"
            onClick={handleUserClick}
          >
            Manage Users{" "}
            <span
              className={`transform transition-transform ${
                isUserOpen ? "rotate-90" : ""
              }`}
            >
              &gt;
            </span>
          </p>
        )}
        {isUserOpen && (
          <div className="pr-8 pl-4 space-y-4 leading-6">
            <p className="-mt-5">
              <Link to="/signup">Create User</Link>
            </p>
            <p>Delete User</p>
          </div>
        )}
        <p className="flex justify-between pr-8">
          Logs <span>&gt;</span>
        </p>
      </div>
    </div>
  );
};

export default SideBar;
