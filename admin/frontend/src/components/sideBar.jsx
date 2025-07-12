import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/useAuthCheck";

export const SectionContext = React.createContext({
  setSelectedSection: () => {},
});

// Permission configuration - this should ideally come from your backend
const PERMISSIONS_CONFIG = {
  dashboard: { component: "dashboard", roles: ["all"] },
  home_page: {
    component: "home_page",
    roles: [
      "superAdmin",
      "compHod",
      "mechHod",
      "extcHod",
      "electricalHod",
      "itHod",
      "bshHod",
      "teach_staff",
      "principal",
    ],
  },
  about_us: {
    component: "about_us",
    roles: ["superAdmin", "principal", "admin"],
  },
  "departments.computer-engineering": {
    component: "departments",
    roles: ["superAdmin", "compHod"],
  },
  "departments.mechanical-engineering": {
    component: "departments",
    roles: ["superAdmin", "mechHod"],
  },
  "departments.extc": {
    component: "departments",
    roles: ["superAdmin", "extcHod"],
  },
  "departments.electrical-engineering": {
    component: "departments",
    roles: ["superAdmin", "electricalHod"],
  },
  "departments.computer-science-and-engineering": {
    component: "departments",
    roles: ["superAdmin", "itHod"],
  },
  "departments.basic-science-and-humanities": {
    component: "departments",
    roles: ["superAdmin", "bshHod"],
  },
  "hod-desk": {
    component: "hod-desk",
    roles: [
      "superAdmin",
      "compHod",
      "mechHod",
      "extcHod",
      "electricalHod",
      "itHod",
      "bshHod",
    ],
  },
  admission: {
    component: "admission",
    roles: ["superAdmin", "principal", "admin"],
  },
  academics: {
    component: "academics",
    roles: ["superAdmin", "principal", "admin"],
  },
  training_placement: {
    component: "training_placement",
    roles: ["superAdmin", "principal", "admin"],
  },
  students_corner: {
    component: "students_corner",
    roles: ["superAdmin", "teach_staff", "principal"],
  },
  research: {
    component: "research",
    roles: ["superAdmin", "principal", "teach_staff"],
  },
  human_resource: {
    component: "human_resource",
    roles: ["superAdmin", "principal", "admin"],
  },
  alumni: {
    component: "alumni",
    roles: ["superAdmin", "principal", "admin"],
  },
  downloads: {
    component: "downloads",
    roles: ["superAdmin", "principal", "admin"],
  },
  manage_users: {
    component: "manage_users",
    roles: ["superAdmin", "hod"],
  },
  nirf: {
    component: "nirf",
    roles: ["superAdmin", "admin"],
  },
  nba_naac: {
    component: "nba_naac",
    roles: ["superAdmin", "admin"],
  },
  logs: {
    component: "logs",
    roles: ["superAdmin"],
  },
};

const DynamicSideBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // State for managing open/closed sections
  const [openSections, setOpenSections] = useState({
    home: false,
    about: false,
    academic: false,
    user: false,
    research: false,
    department: false,
    departments: {
      "computer-engineering": false,
      "mechanical-engineering": false,
      extc: false,
      "electrical-engineering": false,
      "computer-science-and-engineering": false,
      "basic-science-and-humanities": false,
    },
    humanResource: false,
    hodDesk: false,
  });

  // User permissions - this should come from your backend/context
  const [userPermissions, setUserPermissions] = useState([]);

  useEffect(() => {
    // Fetch user permissions from backend
    // For now, using mock data based on role
    if (user) {
      fetchUserPermissions(user.role);
    }
  }, [user]);

  const fetchUserPermissions = async (userRole) => {
    // This should be an API call to get user permissions
    // For demo purposes, using mock data
    const mockPermissions = {
      superAdmin: ["all"],
      compHod: [
        "dashboard",
        "home_page",
        "departments.computer-engineering",
        "manage_users",
        "hod-desk",
      ],
      mechHod: [
        "dashboard",
        "home_page",
        "departments.mechanical-engineering",
        "hod-desk",
      ],
      extcHod: ["dashboard", "home_page", "departments.extc", "hod-desk"],
      electricalHod: [
        "dashboard",
        "home_page",
        "departments.electrical-engineering",
        "hod-desk",
      ],
      itHod: [
        "dashboard",
        "home_page",
        "departments.computer-science-and-engineering",
        "hod-desk",
      ],
      bshHod: [
        "dashboard",
        "home_page",
        "departments.basic-science-and-humanities",
        "hod-desk",
      ],
      teach_staff: ["dashboard", "home_page", "students_corner", "research"],
      non_teach_staff: ["dashboard", "home_page"],
      principal: [
        "dashboard",
        "home_page",
        "about_us",
        "academics",
        "research",
        "human_resource",
      ],
      admin: [
        "dashboard",
        "nirf",
        "nba_naac",
        "about_us",
        "academics",
        "admission",
      ],
    };

    setUserPermissions(mockPermissions[userRole] || []);
  };

  const hasPermission = (permission) => {
    if (!userPermissions.length) return false;
    if (userPermissions.includes("all")) return true;
    return userPermissions.includes(permission);
  };

  const hasDepartmentAccess = () => {
    return Object.keys(PERMISSIONS_CONFIG).some(
      (perm) => perm.startsWith("departments.") && hasPermission(perm)
    );
  };

  const toggleSection = (section, department = null) => {
    if (department) {
      setOpenSections((prev) => ({
        ...prev,
        departments: {
          ...prev.departments,
          [department]: !prev.departments[department],
        },
      }));
    } else {
      setOpenSections((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    }
  };

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
    "Committees and Board of Studies",
    "Activities",
    "Infrastructure",
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

  const aboutSections = [
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
  ];

  const departments = [
    {
      id: "computer-engineering",
      name: "Computer Engineering",
      permission: "departments.computer-engineering",
    },
    {
      id: "mechanical-engineering",
      name: "Mechanical Engineering",
      permission: "departments.mechanical-engineering",
    },
    { id: "extc", name: "EXTC", permission: "departments.extc" },
    {
      id: "electrical-engineering",
      name: "Electrical Engineering",
      permission: "departments.electrical-engineering",
    },
    {
      id: "computer-science-and-engineering",
      name: "Computer Science and Engineering",
      permission: "departments.computer-science-and-engineering",
    },
    {
      id: "basic-science-and-humanities",
      name: "Basic Science and Humanities",
      permission: "departments.basic-science-and-humanities",
    },
  ];

  if (!user) return null;

  return (
    <div className="bg-[#0C2340] mt-16 min-h-screen max-h-auto w-64 text-white pb-10 sticky top-0 z-0">
      <div className="flex flex-col pt-9 pl-8 space-y-9 text-base font-light font-inter">
        {/* Dashboard - Always visible */}
        <Link to="/">
          <p className="flex justify-between pr-8">Dashboard</p>
        </Link>

        {/* Home Page Section */}
        {hasPermission("home_page") && (
          <div>
            <p
              className="cursor-pointer flex justify-between items-center pr-8"
              onClick={() => toggleSection("home")}
            >
              Home Page{" "}
              <span
                className={`transform transition-transform ${
                  openSections.home ? "rotate-90" : ""
                }`}
              >
                &gt;
              </span>
            </p>
            {openSections.home && (
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
        )}

        {/* About Us Section */}
        {hasPermission("about_us") && (
          <div>
            <p
              className="cursor-pointer flex justify-between items-center pr-8"
              onClick={() => toggleSection("about")}
            >
              About Us{" "}
              <span
                className={`transform transition-transform ${
                  openSections.about ? "rotate-90" : ""
                }`}
              >
                &gt;
              </span>
            </p>
            {openSections.about && (
              <div className="pt-3 pr-8 pl-4 leading-7 space-y-5">
                {aboutSections.map((section) => (
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
        )}

        {/* Departments Section */}
        {hasDepartmentAccess() && (
          <div>
            <p
              className="cursor-pointer flex justify-between items-center pr-8"
              onClick={() => toggleSection("department")}
            >
              Departments{" "}
              <span
                className={`transform transition-transform ${
                  openSections.department ? "rotate-90" : ""
                }`}
              >
                &gt;
              </span>
            </p>
            {openSections.department && (
              <div className="pt-2 pr-8 pl-4 leading-7 space-y-4">
                <Link to="/department/home">
                  <p>Home</p>
                </Link>
                {departments.map(
                  (dept) =>
                    hasPermission(dept.permission) && (
                      <div key={dept.id}>
                        <p
                          className="cursor-pointer flex justify-between items-center pr-4"
                          onClick={() => toggleSection("departments", dept.id)}
                        >
                          {dept.name}{" "}
                          <span
                            className={`transform transition-transform ${
                              openSections.departments[dept.id]
                                ? "rotate-90"
                                : ""
                            }`}
                          >
                            &gt;
                          </span>
                        </p>
                        {openSections.departments[dept.id] && (
                          <div className="pt-2 pr-4 pl-8 leading-7 space-y-4">
                            <Link to={`/department/${dept.id}/home`}>
                              <p className="cursor-pointer">Home</p>
                            </Link>
                            {departmentSections.map((section) => (
                              <p
                                key={section}
                                className="cursor-pointer"
                                onClick={() =>
                                  handleDepartmentSectionSelect(
                                    dept.id,
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
                    )
                )}
              </div>
            )}
          </div>
        )}

        {/* HOD Desk Section */}
        {hasPermission("hod-desk") && (
          <div>
            <p
              className="cursor-pointer flex justify-between items-center pr-8"
              onClick={() => toggleSection("hodDesk")}
            >
              HOD Desk{" "}
              <span
                className={`transform transition-transform ${
                  openSections.hodDesk ? "rotate-90" : ""
                }`}
              >
                &gt;
              </span>
            </p>
            {openSections.hodDesk && (
              <div className="pt-4 pr-8 pl-4 leading-7 space-y-4">
                {(user.role === "compHod" || user.role === "superAdmin") && (
                  <Link to="/hod-desk/computer" className="block">
                    <p>Computer Engineering</p>
                  </Link>
                )}
                {(user.role === "mechHod" || user.role === "superAdmin") && (
                  <Link to="/hod-desk/mechanical" className="block">
                    <p>Mechanical Engineering</p>
                  </Link>
                )}
                {(user.role === "extcHod" || user.role === "superAdmin") && (
                  <Link to="/hod-desk/extc" className="block">
                    <p>EXTC</p>
                  </Link>
                )}
                {(user.role === "electricalHod" ||
                  user.role === "superAdmin") && (
                  <Link to="/hod-desk/electrical" className="block">
                    <p>Electrical Engineering</p>
                  </Link>
                )}
                {(user.role === "itHod" || user.role === "superAdmin") && (
                  <Link to="/hod-desk/it" className="block">
                    <p>Information Technology</p>
                  </Link>
                )}
                {(user.role === "bshHod" || user.role === "superAdmin") && (
                  <Link to="/hod-desk/bsh" className="block">
                    <p>Basic Science and Humanities</p>
                  </Link>
                )}
              </div>
            )}
          </div>
        )}

        {/* Admission */}
        {hasPermission("admission") && (
          <Link to="/admission" className="flex justify-between pr-8">
            Admission <span>&gt;</span>
          </Link>
        )}

        {/* Academics Section */}
        {hasPermission("academics") && (
          <div>
            <p
              className="cursor-pointer flex justify-between items-center pr-8"
              onClick={() => toggleSection("academic")}
            >
              Academics{" "}
              <span
                className={`transform transition-transform ${
                  openSections.academic ? "rotate-90" : ""
                }`}
              >
                &gt;
              </span>
            </p>
            {openSections.academic && (
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
        )}

        {/* Training and Placement */}
        {hasPermission("training_placement") && (
          <Link to="/training-placement" className="flex justify-between pr-8">
            Training and Placement <span>&gt;</span>
          </Link>
        )}

        {/* Students Corner */}
        {hasPermission("students_corner") && (
          <Link to="/studentscorner" className="flex justify-between pr-8">
            Students Corner <span>&gt;</span>
          </Link>
        )}

        {/* Research and Publication */}
        {hasPermission("research") && (
          <div>
            <p
              className="cursor-pointer flex justify-between items-center pr-8"
              onClick={() => toggleSection("research")}
            >
              Research and Publication{" "}
              <span
                className={`transform transition-transform ${
                  openSections.research ? "rotate-90" : ""
                }`}
              >
                &gt;
              </span>
            </p>
            {openSections.research && (
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
        )}

        {/* Human Resource */}
        {hasPermission("human_resource") && (
          <div>
            <p
              className="cursor-pointer flex justify-between items-center pr-8"
              onClick={() => toggleSection("humanResource")}
            >
              Human Resource{" "}
              <span
                className={`transform transition-transform ${
                  openSections.humanResource ? "rotate-90" : ""
                }`}
              >
                &gt;
              </span>
            </p>
            {openSections.humanResource && (
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
        )}

        {/* Alumni Page */}
        {hasPermission("alumni") && (
          <Link to="/alumni" className="flex justify-between pr-8">
            Alumni Page <span>&gt;</span>
          </Link>
        )}

        {/* Downloads Page */}
        {hasPermission("downloads") && (
          <Link to="/downloads" className="flex justify-between pr-8">
            Downloads Page <span>&gt;</span>
          </Link>
        )}

        {/* Additional Students Corner for Teaching Staff */}
        {(user.role === "teach_staff" || user.role === "superAdmin") && (
          <Link to="/student" className="flex justify-between pr-8">
            Dummy Route for Authorization <span>&gt;</span>
          </Link>
        )}

        {/* Content Approval Section */}
        {(user.role === "superAdmin" ||
          user.role === "principal" ||
          user.role?.endsWith("Hod") ||
          user.role === "teach_staff") && (
          <Link to="/content-approval" className="flex justify-between pr-8">
            Content Approval <span>&gt;</span>
          </Link>
        )}

        {/* Manage Users */}
        {hasPermission("manage_users") && (
          <div>
            <p
              className="cursor-pointer mb-0 pb-0 flex justify-between items-center pr-8"
              onClick={() => toggleSection("user")}
            >
              Manage Users{" "}
              <span
                className={`transform transition-transform ${
                  openSections.user ? "rotate-90" : ""
                }`}
              >
                &gt;
              </span>
            </p>
            {openSections.user && (
              <div className="pr-8 pl-4 space-y-4 leading-6">
                <p className="mt-5">
                  <Link to="/signup">Create User</Link>
                </p>
                <p>
                  <Link to="/rolePermissionManager">
                    Role Permission Manager
                  </Link>
                </p>
                <p>
                  <Link to="/roleHierarchy">Role Hierarchy Manager</Link>
                </p>
              </div>
            )}
          </div>
        )}

        {hasPermission("iic") && (
          <div>
            <p
              className="cursor-pointer mb-0 pb-0 flex justify-between items-center pr-8"
              onClick={() => toggleSection("iic")}
            >
              IIC{" "}
              <span
                className={`transform transition-transform ${
                  openSections.iic ? "rotate-90" : ""
                }`}
              >
                &gt;
              </span>
            </p>
            {openSections.iic && (
              <div className="pr-8 pl-4 space-y-4 leading-6">
                <p className="mt-5">
                  <Link to="/iic-innovation-council">
                    Institution's Innovation Council
                  </Link>
                </p>
                <p className="mt-5">
                  <Link to="/iic-innovation-policy">
                    Innovation and Startup Policy
                  </Link>
                </p>
                <p className="mt-5">
                  <Link to="/iic-innovation-ambassador">
                    Innovation Ambassador
                  </Link>
                </p>
                <p className="mt-5">
                  <Link to="/iic-innovation-centre">
                    Centre of Innovation and Entrepreneurship
                  </Link>
                </p>
              </div>
            )}
          </div>
        )}

        {/* NIRF */}
        {hasPermission("nirf") && (
          <Link to="/admin/nirf" className="flex justify-between pr-8">
            NIRF
          </Link>
        )}

        {/* NBA/NAAC */}
        {hasPermission("nba_naac") && (
          <Link to="/admin/nba-naac" className="flex justify-between pr-8">
            NBA/NAAC
          </Link>
        )}

        {/* Edit User Profiles */}
        <Link to="/" className="flex justify-between pr-8">
          Manage Faculty Staffs <span>&gt;</span>
        </Link>

        {/* Activity Logs */}
        <p>
          <Link to="/activity-logs" className="flex justify-between pr-8">
            Activity Logs <span>&gt;</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default DynamicSideBar;
