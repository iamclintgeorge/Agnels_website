import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/useAuthCheck";

export const SectionContext = React.createContext({
  setSelectedSection: () => {},
});

const SideBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAcademicOpen, setIsAcademicOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isResearchOpen, setIsResearchOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isComputerEngOpen, setIsComputerEngOpen] = useState(false);
  const [isMechanicalEngOpen, setIsMechanicalEngOpen] = useState(false);
  const [isEXTCOpen, setIsEXTCOpen] = useState(false);
  const [isElectricalEngOpen, setIsElectricalEngOpen] = useState(false);
  const [isCSEOpen, setIsCSEOpen] = useState(false);
  const [isBasicSciHumOpen, setIsBasicSciHumOpen] = useState(false);
  const [isHumanROpen, setIsHumanROpen] = useState(false);

  const handleHomeClick = () => setIsHomeOpen((prev) => !prev);
  const handleAboutClick = () => setIsAboutOpen((prev) => !prev);
  const handleAcademicClick = () => setIsAcademicOpen((prev) => !prev);
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
  const handleHumanRClick = () => setIsHumanROpen((prev) => !prev);

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

  // New function for academic section selection
  const handleAcademicSectionSelect = (section) => {
    localStorage.setItem("academicSection", section);
    navigate("/academics");
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("academic-section-selected", {
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

  // Academic sections array
  const academicSections = [
    "Home",
    "Academic Handbook",
    "Academic Handbook Honours/Minors",
    "Academic Calendar",
    "Examinations",
    "APMS",
    "LMS",
    "Stakeholder Feedback",
  ];

  if (!user) return null;

  return (
    <div className="bg-[#0C2340] mt-16 min-h-screen max-h-auto w-64 text-white pb-10 sticky top-0 z-0">
      <div className="flex flex-col pt-9 pl-8 space-y-9 text-base font-light font-inter">
        <Link to="/">
          <p className="flex justify-between pr-8">Dashboard</p>
        </Link>

        {/* Home Page Section */}
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

        {/* About Us Section */}
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

        {/* Departments Section */}
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
            <div className="pt-2 pr-8 pl-4 leading-7 space-y-4">
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
                  <div className="pt-2 pr-4 pl-8 leading-7 space-y-4">
                    <Link to="/department/computer/home">
                      <p className="cursor-pointer">Home</p>
                    </Link>
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
                  className="cursor-pointer flex justify-between items-center pr-4 leading-7"
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
                  <div className="pt-2 pr-4 pl-8 leading-7 space-y-4">
                    <Link to="/department/mechanical/home">
                      <p className="cursor-pointer">Home</p>
                    </Link>
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
                  <div className="pt-2 pr-4 pl-8 leading-7 space-y-4">
                    <Link to="/department/extc/home">
                      <p className="cursor-pointer">Home</p>
                    </Link>
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
                  <div className="pt-2 pr-4 pl-8 leading-7 space-y-4">
                    <Link to="/department/electrical/home">
                      <p className="cursor-pointer">Home</p>
                    </Link>
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
                  <div className="pt-2 pr-4 pl-8 leading-7 space-y-4">
                    <Link to="/department/cse/home">
                      <p className="cursor-pointer">Home</p>
                    </Link>
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
                  <div className="pt-2 pr-4 pl-8 leading-7 space-y-4">
                    <Link to="/department/bsh/home">
                      <p className="cursor-pointer">Home</p>
                    </Link>
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

        <div>
          <p
            className="cursor-pointer flex justify-between items-center pr-8"
            onClick={handleAcademicClick}
          >
            Academics{" "}
            <span
              className={`transform transition-transform ${
                isAcademicOpen ? "rotate-90" : ""
              }`}
            >
              &gt;
            </span>
          </p>
          {isAcademicOpen && (
            <div className="pt-2 pr-8 pl-4 leading-10">
              {academicSections.map((section) => (
                <p
                  key={section}
                  className="cursor-pointer"
                  onClick={() => handleAcademicSectionSelect(section)}
                >
                  {section}
                </p>
              ))}
            </div>
          )}
        </div>

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

        <div>
          <p
            className="cursor-pointer flex justify-between items-center pr-8"
            onClick={handleHumanRClick}
          >
            Human Resource{" "}
            <span
              className={`transform transition-transform ${
                isHumanROpen ? "rotate-90" : ""
              }`}
            >
              &gt;
            </span>
          </p>
          {isHumanROpen && (
            <div className="pt-2 pr-5 pl-4 leading-10">
              <Link to="/teachingstaff">
                <p>Teaching Staff</p>
              </Link>
              <Link to="/nonteachingstaff">
                <p>Non Teaching Staff</p>
              </Link>
            </div>
          )}
        </div>
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
        {(user.role === "admin" || user.role === "superAdmin") && (
          <Link to="/admin/nirf" className="flex justify-between pr-8">
            NIRF Admin <span></span>
          </Link>
        )}
        {(user.role === "admin" || user.role === "superAdmin") && (
          <Link to="/admin/nba-naac" className="flex justify-between pr-8">
            NBA/NAAC Admin <span></span>
          </Link>
        )}
        <p className="flex justify-between pr-8">
          Logs <span>&gt;</span>
        </p>
      </div>
    </div>
  );
};

export default SideBar;
