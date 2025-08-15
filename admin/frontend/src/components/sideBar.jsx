import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/useAuthCheck";
import {
  departmentSections,
  academicSections,
  aboutSections,
  departments,
  PERMISSIONS_CONFIG,
} from "../util/sideBar_utils";
import axios from "axios";

export const SectionContext = React.createContext({
  setSelectedSection: () => {},
});

const DynamicSideBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [permissionsData, setPermissionsData] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);

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
    iqac: false,
  });

  useEffect(() => {
    fetchPermissions();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserPermissions(user.role);
      console.log("user.role", user.role);
    }
  }, [user, permissionsData]);

  const fetchPermissions = async () => {
    try {
      const permissionRes = await axios.get(
        "http://localhost:3663/api/fetchroles"
      );
      setPermissionsData(permissionRes.data);
      console.log("Permissions", permissionRes.data);
    } catch (error) {
      console.log("Error Fetching Permissions", error);
    }
  };

  const fetchUserPermissions = async (userRole) => {
    const roleData = permissionsData.find((role) => role.name === userRole);
    console.log("roleData", roleData);
    setUserPermissions(roleData ? roleData.permissions : []); // Set permissions based on role
  };

  const hasPermission = (permission) => {
    if (!userPermissions.length) return false;
    if (userPermissions.includes("all")) return true;
    return userPermissions.includes(permission);
  };

  const includePermission = (suffix) => {
    if (!userPermissions.length) return false;
    if (userPermissions.includes("all")) return true;
    const normalizedSuffix = suffix.toLowerCase(); // Normalize case
    return userPermissions.some((permission) =>
      permission
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, "")
        .endsWith(normalizedSuffix)
    );
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
    // localStorage.setItem("departmentSection", `${deptName}/${section}`);
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
    const section_url = academicSections[0][section]; // Access the first object
    navigate(`/academics/${section_url}`);
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("academic-section-selected", {
          detail: { section },
        })
      );
    }, 50);
  };

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
                  <p>Notice Board</p>
                </Link>
                <Link to="/home/NewsManager">
                  <p>News</p>
                </Link>
                <Link to="/home/CircularManager">
                  <p>Circulars</p>
                </Link>
                <Link to="/home/AchievementManager">
                  <p>Achievements (News)</p>
                </Link>
                <Link to="/home/AdmissionManager">
                  <p>Admissions (News)</p>
                </Link>
                <Link to="/home/modal">
                  <p>Set Modal</p>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* About Us Section */}
        {/* {hasPermission("about_us") && ( */}
        {/* <div>
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
          </div> */}
        {/* )} */}

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
        {includePermission("hod") && (
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
                {hasPermission("comp_hod") && (
                  <Link to="/hod-desk/computer" className="block">
                    <p>Computer Engineering</p>
                  </Link>
                )}
                {hasPermission("mech_hod") && (
                  <Link to="/hod-desk/mechanical" className="block">
                    <p>Mechanical Engineering</p>
                  </Link>
                )}
                {hasPermission("extc_hod") && (
                  <Link to="/hod-desk/extc" className="block">
                    <p>EXTC</p>
                  </Link>
                )}
                {hasPermission("elect_hod") && (
                  <Link to="/hod-desk/electrical" className="block">
                    <p>Electrical Engineering</p>
                  </Link>
                )}
                {hasPermission("cse_hod") && (
                  <Link to="/hod-desk/it" className="block">
                    <p>Computer Science and Engineering (Prev. IT)</p>
                  </Link>
                )}
                {hasPermission("bsh_hod") && (
                  <Link to="/hod-desk/bsh" className="block">
                    <p>Basic Science and Humanities</p>
                  </Link>
                )}
              </div>
            )}
          </div>
        )}

        {/* Principal's Desk */}
        {hasPermission("principalDesk") && (
          <Link to="/principaldesk" className="flex justify-between pr-8">
            Principal's Desk <span>&gt;</span>
          </Link>
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
              <div className="pt-2 pr-8 pl-4 leading-7 space-y-4">
                {Object.keys(academicSections[0]).map((key) => (
                  <p
                    key={key}
                    className="cursor-pointer"
                    onClick={() => handleAcademicSectionSelect(key)}
                  >
                    {key}
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
        {/* {hasPermission("students_corner") && (
          <Link to="/studentscorner" className="flex justify-between pr-8">
            Students Corner <span>&gt;</span>
          </Link>
        )} */}

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

        {/* Important Links */}
        {hasPermission("important_links") && (
          <Link to="/important-links" className="flex justify-between pr-8">
            Important Links <span>&gt;</span>
          </Link>
        )}

        {/* IQAC */}
        {hasPermission("iqac") && (
          <Link to="/iqac" className="flex justify-between pr-8">
            IQAC <span>&gt;</span>
          </Link>
        )}

        {/* Content Approval Section */}
        {hasPermission("content_approval") && (
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

        {/* Upload Static Files */}
        {hasPermission("upload_files") && (
          <Link to="/upload_files" className="flex justify-between pr-8">
            Upload Files <span>&gt;</span>
          </Link>
        )}

        {/* Edit User Profiles */}
        {hasPermission("manage_staff") && (
          <Link to="/ManageFacultyStaff" className="flex justify-between pr-8">
            Manage Faculty Staffs <span>&gt;</span>
          </Link>
        )}

        {/* Activity Logs */}
        {hasPermission("logs") && (
          <Link to="/activity-logs" className="flex justify-between pr-8">
            Activity Logs <span>&gt;</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default DynamicSideBar;
