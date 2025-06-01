import React, { useState } from "react";
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
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isComputerEngOpen, setIsComputerEngOpen] = useState(false);
  const [isMechanicalEngOpen, setIsMechanicalEngOpen] = useState(false);
  const [isEXTCOpen, setIsEXTCOpen] = useState(false);
  const [isElectricalEngOpen, setIsElectricalEngOpen] = useState(false);
  const [isCSEOpen, setIsCSEOpen] = useState(false);
  const [isBasicSciHumOpen, setIsBasicSciHumOpen] = useState(false);

  const handleHomeClick = () => setIsHomeOpen((prev) => !prev);
  const handleAboutClick = () => setIsAboutOpen((prev) => !prev);
  const handleUserClick = () => setIsUserOpen((prev) => !prev);
  const handleResearchClick = () => setIsResearchOpen((prev) => !prev);
  const handleDepartmentClick = () => setIsDepartmentOpen((prev) => !prev);
  const handleComputerEngClick = () => setIsComputerEngOpen((prev) => !prev);
  const handleMechanicalEngClick = () =>
    setIsMechanicalEngOpen((prev) => !prev);
  const handleEXTCClick = () => setIsEXTCOpen((prev) => !prev);
  const handleElectricalEngClick = () =>
    setIsElectricalEngOpen((prev) => !prev);
  const handleCSEClick = () => setIsCSEOpen((prev) => !prev);
  const handleBasicSciHumClick = () => setIsBasicSciHumOpen((prev) => !prev);

  const handleDepartmentSectionSelect = (deptName, section) => {
    localStorage.setItem("departmentSection", `${deptName}/${section}`);
    navigate(
      `/department/${deptName}/${section.toLowerCase().replace(/ /g, "-")}`
    );
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("department-section-selected", {
          detail: { deptName, section },
        })
      );
    }, 50);
  };

  const handleSectionSelect = (section) => {
    localStorage.setItem("aboutUsSection", section);
    navigate("/about-us");
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("section-selected", {
          detail: { section },
        })
      );
    }, 50);
  };

  const departmentSections = [
    "About",
    "Committees and Board of Studies",
    "Infrastructure",
    "Activities",
    "Student Association",
    "Magazine",
    "Syllabus",
    "Result Analysis",
    "Time Table",
    "Achievements",
    "Academic Calendar",
    "Innovative Teaching and Learning Methods",
    "Alumni Testimonials",
    "Publications",
    "Projects",
  ];

  if (!user) return null;

  return (
    <div className="bg-[#0C2340] mt-16 min-h-screen max-h-auto w-64 text-white pb-10 sticky top-0 z-0">
      <div className="flex flex-col pt-9 pl-8 space-y-9 text-base font-light font-inter">
        <Link to="/">
          <p className="flex justify-between pr-8">Dashboard</p>
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
              {[
                "History",
                "Vision and Mission",
                "Trustees",
                "Managing Director's Desk",
                "Principal's Desk",
                "Governance",
                "Audit Report and Affiliations",
                "Administrations and Committees",
                "Institute Roadmap",
                "Service Regulation",
                "Qualification and Eligibility norms for Recruitment",
                "Best Practices",
                "Mandatory Disclosures",
              ].map((section) => (
                <p
                  key={section}
                  className="cursor-pointer"
                  onClick={() => handleSectionSelect(section)}
                >
                  {section}
                </p>
              ))}
            </div>
          )}
        </div>
        <div>
          <p
            className="cursor-pointer flex justify-between items-center pr-8"
            onClick={handleDepartmentClick}
          >
            Departments{" "}
            <span
              className={`transform transition-transform ${
                isDepartmentOpen ? "rotate-90" : ""
              }`}
            >
              &gt;
            </span>
          </p>
          {isDepartmentOpen && (
            <div className="pt-2 pr-8 pl-4 leading-10">
              <Link to="/department/home">
                <p>Home</p>
              </Link>
              <div>
                <p
                  className="cursor-pointer flex justify-between items-center pr-4"
                  onClick={handleComputerEngClick}
                >
                  Computer Engineering{" "}
                  <span
                    className={`transform transition-transform ${
                      isComputerEngOpen ? "rotate-90" : ""
                    }`}
                  >
                    &gt;
                  </span>
                </p>
                {isComputerEngOpen && (
                  <div className="pt-2 pr-4 pl-8 leading-10">
                    {departmentSections.map((section) => (
                      <p
                        key={section}
                        className="cursor-pointer"
                        onClick={() =>
                          handleDepartmentSectionSelect(
                            "computer-engineering",
                            section
                          )
                        }
                      >
                        {section}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <p
                  className="cursor-pointer flex justify-between items-center pr-4"
                  onClick={handleMechanicalEngClick}
                >
                  Mechanical Engineering{" "}
                  <span
                    className={`transform transition-transform ${
                      isMechanicalEngOpen ? "rotate-90" : ""
                    }`}
                  >
                    &gt;
                  </span>
                </p>
                {isMechanicalEngOpen && (
                  <div className="pt-2 pr-4 pl-8 leading-10">
                    {departmentSections.map((section) => (
                      <p
                        key={section}
                        className="cursor-pointer"
                        onClick={() =>
                          handleDepartmentSectionSelect(
                            "mechanical-engineering",
                            section
                          )
                        }
                      >
                        {section}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <p
                  className="cursor-pointer flex justify-between items-center pr-4"
                  onClick={handleEXTCClick}
                >
                  EXTC{" "}
                  <span
                    className={`transform transition-transform ${
                      isEXTCOpen ? "rotate-90" : ""
                    }`}
                  >
                    &gt;
                  </span>
                </p>
                {isEXTCOpen && (
                  <div className="pt-2 pr-4 pl-8 leading-10">
                    {departmentSections.map((section) => (
                      <p
                        key={section}
                        className="cursor-pointer"
                        onClick={() =>
                          handleDepartmentSectionSelect("extc", section)
                        }
                      >
                        {section}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <p
                  className="cursor-pointer flex justify-between items-center pr-4"
                  onClick={handleElectricalEngClick}
                >
                  Electrical Engineering{" "}
                  <span
                    className={`transform transition-transform ${
                      isElectricalEngOpen ? "rotate-90" : ""
                    }`}
                  >
                    &gt;
                  </span>
                </p>
                {isElectricalEngOpen && (
                  <div className="pt-2 pr-4 pl-8 leading-10">
                    {departmentSections.map((section) => (
                      <p
                        key={section}
                        className="cursor-pointer"
                        onClick={() =>
                          handleDepartmentSectionSelect(
                            "electrical-engineering",
                            section
                          )
                        }
                      >
                        {section}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <p
                  className="cursor-pointer flex justify-between items-center pr-4"
                  onClick={handleCSEClick}
                >
                  Computer Science and Engineering{" "}
                  <span
                    className={`transform transition-transform ${
                      isCSEOpen ? "rotate-90" : ""
                    }`}
                  >
                    &gt;
                  </span>
                </p>
                {isCSEOpen && (
                  <div className="pt-2 pr-4 pl-8 leading-10">
                    {departmentSections.map((section) => (
                      <p
                        key={section}
                        className="cursor-pointer"
                        onClick={() =>
                          handleDepartmentSectionSelect(
                            "computer-science-and-engineering",
                            section
                          )
                        }
                      >
                        {section}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <p
                  className="cursor-pointer flex justify-between items-center pr-4"
                  onClick={handleBasicSciHumClick}
                >
                  Basic Science and Humanities{" "}
                  <span
                    className={`transform transition-transform ${
                      isBasicSciHumOpen ? "rotate-90" : ""
                    }`}
                  >
                    &gt;
                  </span>
                </p>
                {isBasicSciHumOpen && (
                  <div className="pt-2 pr-4 pl-8 leading-10">
                    {departmentSections.map((section) => (
                      <p
                        key={section}
                        className="cursor-pointer"
                        onClick={() =>
                          handleDepartmentSectionSelect(
                            "basic-science-and-humanities",
                            section
                          )
                        }
                      >
                        {section}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
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
                <p>Books and Chapters</p>
              </Link>
              <Link to="/research/patents">
                <p>Patents</p>
              </Link>
              <Link to="/research/awards">
                <p>Awards</p>
              </Link>
              <Link to="/research/conferences">
                <p>Conferences</p>
              </Link>
              <Link to="/research/research-collaborations">
                <p>Research Collaborations</p>
              </Link>
              <Link to="/research/research-centers">
                <p>Research Centers</p>
              </Link>
              <Link to="/research/phd">
                <p>PhD Program</p>
              </Link>
              <Link to="/research/faculty">
                <p>Faculty Publications</p>
              </Link>
              <Link to="/research/student">
                <p>Student Publications</p>
              </Link>
            </div>
          )}
        </div>
        <p className="flex justify-between pr-8">
          Contact Us <span>&gt;</span>
        </p>
      </div>
    </div>
  );
};

export default SideBar;
