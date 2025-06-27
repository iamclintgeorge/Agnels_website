// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../services/useAuthCheck";

// export const SectionContext = React.createContext({
//   setSelectedSection: () => {},
// });

// const SideBar = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [isHomeOpen, setIsHomeOpen] = useState(false);
//   const [isAboutOpen, setIsAboutOpen] = useState(false);
//   const [isAcademicOpen, setIsAcademicOpen] = useState(false);
//   const [isUserOpen, setIsUserOpen] = useState(false);
//   const [isResearchOpen, setIsResearchOpen] = useState(false);
//   const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
//   const [isComputerEngOpen, setIsComputerEngOpen] = useState(false);
//   const [isMechanicalEngOpen, setIsMechanicalEngOpen] = useState(false);
//   const [isEXTCOpen, setIsEXTCOpen] = useState(false);
//   const [isElectricalEngOpen, setIsElectricalEngOpen] = useState(false);
//   const [isCSEOpen, setIsCSEOpen] = useState(false);
//   const [isBasicSciHumOpen, setIsBasicSciHumOpen] = useState(false);
//   const [isHumanROpen, setIsHumanROpen] = useState(false);

//   const handleHomeClick = () => setIsHomeOpen((prev) => !prev);
//   const handleAboutClick = () => setIsAboutOpen((prev) => !prev);
//   const handleAcademicClick = () => setIsAcademicOpen((prev) => !prev);
//   const handleUserClick = () => setIsUserOpen((prev) => !prev);
//   const handleResearchClick = () => setIsResearchOpen((prev) => !prev);
//   const handleDepartmentClick = () => setIsDepartmentOpen((prev) => !prev);
//   const handleComputerEngClick = () => setIsComputerEngOpen((prev) => !prev);
//   const handleMechanicalEngClick = () =>
//     setIsMechanicalEngOpen((prev) => !prev);
//   const handleEXTCClick = () => setIsEXTCOpen((prev) => !prev);
//   const handleElectricalEngClick = () =>
//     setIsElectricalEngOpen((prev) => !prev);
//   const handleCSEClick = () => setIsCSEOpen((prev) => !prev);
//   const handleBasicSciHumClick = () => setIsBasicSciHumOpen((prev) => !prev);
//   const handleHumanRClick = () => setIsHumanROpen((prev) => !prev);

//   const handleDepartmentSectionSelect = (deptName, section) => {
//     localStorage.setItem("departmentSection", `${deptName}/${section}`);
//     navigate(
//       `/department/${deptName}/${section.toLowerCase().replace(/ /g, "-")}`
//     );
//     setTimeout(() => {
//       window.dispatchEvent(
//         new CustomEvent("department-section-selected", {
//           detail: { deptName, section },
//         })
//       );
//     }, 50);
//   };

//   const handleSectionSelect = (section) => {
//     localStorage.setItem("aboutUsSection", section);
//     navigate("/about-us");
//     setTimeout(() => {
//       window.dispatchEvent(
//         new CustomEvent("section-selected", {
//           detail: { section },
//         })
//       );
//     }, 50);
//   };

//   // New function for academic section selection
//   const handleAcademicSectionSelect = (section) => {
//     localStorage.setItem("academicSection", section);
//     navigate("/academics");
//     setTimeout(() => {
//       window.dispatchEvent(
//         new CustomEvent("academic-section-selected", {
//           detail: { section },
//         })
//       );
//     }, 50);
//   };

//   const departmentSections = [
//     "About",
//     "Committees and Board of Studies",
//     "Activities",
//     "Infrastructure",
//     "Student Association",
//     "Magazine",
//     "Syllabus",
//     "Result Analysis",
//     "Time Table",
//     "Achievements",
//     "Academic Calendar",
//     "Innovative Teaching and Learning Methods",
//     "Alumni Testimonials",
//     "Publications",
//     "Projects",
//   ];

//   // Academic sections array
//   const academicSections = [
//     "Home",
//     "Academic Handbook",
//     "Academic Handbook Honours/Minors",
//     "Academic Calendar",
//     "Examinations",
//     "APMS",
//     "LMS",
//     "Stakeholder Feedback",
//   ];

//   if (!user) return null;

//   return (
//     <div className="bg-[#0C2340] mt-16 min-h-screen max-h-auto w-64 text-white pb-10 sticky top-0 z-0">
//       <div className="flex flex-col pt-9 pl-8 space-y-9 text-base font-light font-inter">
//         <Link to="/">
//           <p className="flex justify-between pr-8">Dashboard</p>
//         </Link>

//         {/* Home Page Section */}
//         <div>
//           <p
//             className="cursor-pointer flex justify-between items-center pr-8"
//             onClick={handleHomeClick}
//           >
//             Home Page{" "}
//             <span
//               className={`transform transition-transform ${
//                 isHomeOpen ? "rotate-90" : ""
//               }`}
//             >
//               &gt;
//             </span>
//           </p>
//           {isHomeOpen && (
//             <div className="pt-2 pr-8 pl-4 leading-10">
//               <Link to="/home/carousel">
//                 <p>Image Carousel</p>
//               </Link>
//               <Link to="/home/introtext">
//                 <p>Introduction Section</p>
//               </Link>
//               <Link to="/home/whatsNew">
//                 <p>Announcements</p>
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* About Us Section */}
//         <div>
//           <p
//             className="cursor-pointer flex justify-between items-center pr-8"
//             onClick={handleAboutClick}
//           >
//             About Us{" "}
//             <span
//               className={`transform transition-transform ${
//                 isAboutOpen ? "rotate-90" : ""
//               }`}
//             >
//               &gt;
//             </span>
//           </p>
//           {isAboutOpen && (
//             <div className="pt-2 pr-8 pl-4 leading-10">
//               {[
//                 "History",
//                 "Vision and Mission",
//                 "Trustees",
//                 "Managing Director's Desk",
//                 "Principal's Desk",
//                 "Governance",
//                 "Audit Report and Affiliations",
//                 "Administrations and Committees",
//                 "Institute Roadmap",
//                 "Service Regulation",
//                 "Qualification and Eligibility norms for Recruitment",
//                 "Best Practices",
//                 "Mandatory Disclosures",
//               ].map((section) => (
//                 <p
//                   key={section}
//                   className="cursor-pointer"
//                   onClick={() => handleSectionSelect(section)}
//                 >
//                   {section}
//                 </p>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Departments Section */}
//         <div>
//           <p
//             className="cursor-pointer flex justify-between items-center pr-8"
//             onClick={handleDepartmentClick}
//           >
//             Departments{" "}
//             <span
//               className={`transform transition-transform ${
//                 isDepartmentOpen ? "rotate-90" : ""
//               }`}
//             >
//               &gt;
//             </span>
//           </p>
//           {isDepartmentOpen && (
//             <div className="pt-2 pr-8 pl-4 leading-7 space-y-4">
//               <Link to="/department/home">
//                 <p>Home</p>
//               </Link>
//               <div>
//                 <p
//                   className="cursor-pointer flex justify-between items-center pr-4"
//                   onClick={handleComputerEngClick}
//                 >
//                   Computer Engineering{" "}
//                   <span
//                     className={`transform transition-transform ${
//                       isComputerEngOpen ? "rotate-90" : ""
//                     }`}
//                   >
//                     &gt;
//                   </span>
//                 </p>
//                 {isComputerEngOpen && (
//                   <div className="pt-2 pr-4 pl-8 leading-7 space-y-4">
//                     {departmentSections.map((section) => (
//                       <p
//                         key={section}
//                         className="cursor-pointer"
//                         onClick={() =>
//                           handleDepartmentSectionSelect(
//                             "computer-engineering",
//                             section
//                           )
//                         }
//                       >
//                         {section}
//                       </p>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <p
//                   className="cursor-pointer flex justify-between items-center pr-4 leading-7"
//                   onClick={handleMechanicalEngClick}
//                 >
//                   Mechanical Engineering{" "}
//                   <span
//                     className={`transform transition-transform ${
//                       isMechanicalEngOpen ? "rotate-90" : ""
//                     }`}
//                   >
//                     &gt;
//                   </span>
//                 </p>
//                 {isMechanicalEngOpen && (
//                   <div className="pt-2 pr-4 pl-8 leading-7 space-y-4">
//                     {departmentSections.map((section) => (
//                       <p
//                         key={section}
//                         className="cursor-pointer"
//                         onClick={() =>
//                           handleDepartmentSectionSelect(
//                             "mechanical-engineering",
//                             section
//                           )
//                         }
//                       >
//                         {section}
//                       </p>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <p
//                   className="cursor-pointer flex justify-between items-center pr-4"
//                   onClick={handleEXTCClick}
//                 >
//                   EXTC{" "}
//                   <span
//                     className={`transform transition-transform ${
//                       isEXTCOpen ? "rotate-90" : ""
//                     }`}
//                   >
//                     &gt;
//                   </span>
//                 </p>
//                 {isEXTCOpen && (
//                   <div className="pt-2 pr-4 pl-8 leading-7 space-y-4">
//                     {departmentSections.map((section) => (
//                       <p
//                         key={section}
//                         className="cursor-pointer"
//                         onClick={() =>
//                           handleDepartmentSectionSelect("extc", section)
//                         }
//                       >
//                         {section}
//                       </p>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <p
//                   className="cursor-pointer flex justify-between items-center pr-4"
//                   onClick={handleElectricalEngClick}
//                 >
//                   Electrical Engineering{" "}
//                   <span
//                     className={`transform transition-transform ${
//                       isElectricalEngOpen ? "rotate-90" : ""
//                     }`}
//                   >
//                     &gt;
//                   </span>
//                 </p>
//                 {isElectricalEngOpen && (
//                   <div className="pt-2 pr-4 pl-8 leading-7 space-y-4">
//                     {departmentSections.map((section) => (
//                       <p
//                         key={section}
//                         className="cursor-pointer"
//                         onClick={() =>
//                           handleDepartmentSectionSelect(
//                             "electrical-engineering",
//                             section
//                           )
//                         }
//                       >
//                         {section}
//                       </p>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <p
//                   className="cursor-pointer flex justify-between items-center pr-4"
//                   onClick={handleCSEClick}
//                 >
//                   Computer Science and Engineering{" "}
//                   <span
//                     className={`transform transition-transform ${
//                       isCSEOpen ? "rotate-90" : ""
//                     }`}
//                   >
//                     &gt;
//                   </span>
//                 </p>
//                 {isCSEOpen && (
//                   <div className="pt-2 pr-4 pl-8 leading-7 space-y-4">
//                     {departmentSections.map((section) => (
//                       <p
//                         key={section}
//                         className="cursor-pointer"
//                         onClick={() =>
//                           handleDepartmentSectionSelect(
//                             "computer-science-and-engineering",
//                             section
//                           )
//                         }
//                       >
//                         {section}
//                       </p>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <p
//                   className="cursor-pointer flex justify-between items-center pr-4"
//                   onClick={handleBasicSciHumClick}
//                 >
//                   Basic Science and Humanities{" "}
//                   <span
//                     className={`transform transition-transform ${
//                       isBasicSciHumOpen ? "rotate-90" : ""
//                     }`}
//                   >
//                     &gt;
//                   </span>
//                 </p>
//                 {isBasicSciHumOpen && (
//                   <div className="pt-2 pr-4 pl-8 leading-7 space-y-4">
//                     {departmentSections.map((section) => (
//                       <p
//                         key={section}
//                         className="cursor-pointer"
//                         onClick={() =>
//                           handleDepartmentSectionSelect(
//                             "basic-science-and-humanities",
//                             section
//                           )
//                         }
//                       >
//                         {section}
//                       </p>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         <p className="flex justify-between pr-8">
//           Admission <span>&gt;</span>
//         </p>

//         <div>
//           <p
//             className="cursor-pointer flex justify-between items-center pr-8"
//             onClick={handleAcademicClick}
//           >
//             Academics{" "}
//             <span
//               className={`transform transition-transform ${
//                 isAcademicOpen ? "rotate-90" : ""
//               }`}
//             >
//               &gt;
//             </span>
//           </p>
//           {isAcademicOpen && (
//             <div className="pt-2 pr-8 pl-4 leading-10">
//               {academicSections.map((section) => (
//                 <p
//                   key={section}
//                   className="cursor-pointer"
//                   onClick={() => handleAcademicSectionSelect(section)}
//                 >
//                   {section}
//                 </p>
//               ))}
//             </div>
//           )}
//         </div>

//         <Link to="/training-placement" className="flex justify-between pr-8">
//           Training and Placement <span>&gt;</span>
//         </Link>

//         <Link to="/studentscorner" className="flex justify-between pr-8">
//           Students Corner <span>&gt;</span>
//         </Link>

//         <div>
//           <p
//             className="cursor-pointer flex justify-between items-center pr-8"
//             onClick={handleResearchClick}
//           >
//             Research and Publication{" "}
//             <span
//               className={`transform transition-transform ${
//                 isResearchOpen ? "rotate-90" : ""
//               }`}
//             >
//               &gt;
//             </span>
//           </p>
//           {isResearchOpen && (
//             <div className="pt-2 pr-5 pl-4 leading-10">
//               <Link to="/research/home">
//                 <p>Home</p>
//               </Link>
//               <Link to="/research/projects">
//                 <p>Research Projects</p>
//               </Link>
//               <Link to="/research/publications">
//                 <p>Publications</p>
//               </Link>
//               <Link to="/research/books">
//                 <p>Books Published</p>
//               </Link>
//               <Link to="/research/consultancy">
//                 <p>Consultancy Projects</p>
//               </Link>
//               <Link to="/research/patents">
//                 <p>Patents</p>
//               </Link>
//               <Link to="/research/code-of-conduct">
//                 <p>Code of Conduct</p>
//               </Link>
//             </div>
//           )}
//         </div>

//         <div>
//           <p
//             className="cursor-pointer flex justify-between items-center pr-8"
//             onClick={handleHumanRClick}
//           >
//             Human Resource{" "}
//             <span
//               className={`transform transition-transform ${
//                 isHumanROpen ? "rotate-90" : ""
//               }`}
//             >
//               &gt;
//             </span>
//           </p>
//           {isHumanROpen && (
//             <div className="pt-2 pr-5 pl-4 leading-10">
//               <Link to="/teachingstaff">
//                 <p>Teaching Staff</p>
//               </Link>
//               <Link to="/nonteachingstaff">
//                 <p>Non Teaching Staff</p>
//               </Link>
//             </div>
//           )}
//         </div>
//         <p className="flex justify-between pr-8">
//           Alumni Page <span>&gt;</span>
//         </p>
//         <p className="flex justify-between pr-8">
//           Downloads Page <span>&gt;</span>
//         </p>

//         {(user.role === "teach_staff" || user.role === "superAdmin") && (
//           <Link to="/student" className="flex justify-between pr-8">
//             Students Corner <span>&gt;</span>
//           </Link>
//         )}

//         {(user.role === "hod" || user.role === "superAdmin") && (
//           <p
//             className="cursor-pointer mb-0 pb-0 flex justify-between items-center pr-8"
//             onClick={handleUserClick}
//           >
//             Manage Users{" "}
//             <span
//               className={`transform transition-transform ${
//                 isUserOpen ? "rotate-90" : ""
//               }`}
//             >
//               &gt;
//             </span>
//           </p>
//         )}
//         {isUserOpen && (
//           <div className="pr-8 pl-4 space-y-4 leading-6">
//             <p className="-mt-5">
//               <Link to="/signup">Create User</Link>
//             </p>
//             <p className="-mt-5">
//               <Link to="/rolePermissionManager">
//                 Manage User Role Permission
//               </Link>
//             </p>
//             <p>Delete User</p>
//           </div>
//         )}
//         {(user.role === "admin" || user.role === "superAdmin") && (
//           <Link to="/admin/nirf" className="flex justify-between pr-8">
//             NIRF<span></span>
//           </Link>
//         )}
//         {(user.role === "admin" || user.role === "superAdmin") && (
//           <Link to="/admin/nba-naac" className="flex justify-between pr-8">
//             NBA/NAAC<span></span>
//           </Link>
//         )}
//         <p className="flex justify-between pr-8">
//           Logs <span>&gt;</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SideBar;

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
    roles: ["superAdmin", "compHod", "mechHod", "extcHod", "electricalHod", "itHod", "bshHod"],
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
      mechHod: ["dashboard", "home_page", "departments.mechanical-engineering", "hod-desk"],
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
    "About",
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
              <div className="pt-2 pr-8 pl-4 leading-10">
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
              <div className="pt-2 pr-8 pl-4 leading-10">
                {(user.role === "compHod" || user.role === "superAdmin") && (
                  <Link to="/hod-desk/computer">
                    <p>Computer Engineering</p>
                  </Link>
                )}
                {(user.role === "mechHod" || user.role === "superAdmin") && (
                  <Link to="/hod-desk/mechanical">
                    <p>Mechanical Engineering</p>
                  </Link>
                )}
                {(user.role === "extcHod" || user.role === "superAdmin") && (
                  <Link to="/hod-desk/extc">
                    <p>EXTC</p>
                  </Link>
                )}
                {(user.role === "electricalHod" || user.role === "superAdmin") && (
                  <Link to="/hod-desk/electrical">
                    <p>Electrical Engineering</p>
                  </Link>
                )}
                {(user.role === "itHod" || user.role === "superAdmin") && (
                  <Link to="/hod-desk/it">
                    <p>Information Technology</p>
                  </Link>
                )}
                {(user.role === "bshHod" || user.role === "superAdmin") && (
                  <Link to="/hod-desk/bsh">
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
            Students Corner <span>&gt;</span>
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
                <p>Delete User</p>
                {user.role === "superAdmin" && (
                  <p>
                    <Link to="/rolePermissionManager">Role Management</Link>
                  </p>
                )}
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
        <Link to="/edit-profiles" className="flex justify-between pr-8">
          Edit User Profiles <span>&gt;</span>
        </Link>

        {/* Activity Logs */}
        {(user.role === "superAdmin" || 
          user.role === "principal" || 
          user.role?.endsWith("Hod") || 
          user.role === "teach_staff") && (
          <Link to="/activity-logs" className="flex justify-between pr-8">
            Activity Logs <span>&gt;</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default DynamicSideBar;
