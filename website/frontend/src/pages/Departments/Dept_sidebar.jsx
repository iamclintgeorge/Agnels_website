import React from "react";
import { useNavigate } from "react-router-dom";
import StaticPages from "../../layouts/staticPages";
import {
  Home,
  Comps,
  Mech,
  EXTC,
  Electrical,
  InfoT,
  Humanities,
} from "./departmentContent";
import StudentAssociation from "./sections/debt_st_assoc";
import About from "./sections/dept_about";
import AcademicCalendar from "./sections/dept_AcademicCalendar";
import Achievements from "./sections/dept_Achievements";
import Activities from "./sections/dept_activity";
import AlumniTestimonials from "./sections/dept_Alumni";
import CommitteesBoardOfStudy from "./sections/dept_CBS";
import FacultySupportingStaff from "./sections/dept_faculty";
import HeadOfDepartment from "./sections/dept_Hod";
import Infrastructure from "./sections/dept_Infra";
import InnovativeTeaching from "./sections/dept_innovative";
import Magazine from "./sections/dept_magazine";
import Projects from "./sections/dept_Projects";
import Publications from "./sections/dept_publication";
import ResultAnalysis from "./sections/dept_result";
import Syllabus from "./sections/dept_syllabus";
import TimeTable from "./sections/dept_timetable";

export const Departments = () => {
  const navigate = useNavigate();
  const sidebar = [
    "Home",
    "Computer Engineering",
    "Mechanical Engineering",
    "Electronics and Telecommunication Engineering",
    "Electrical Engineering",
    "Computer Science and Engineering (Prev. IT)",
    "Basic Science and Humanities",
  ];

  // Define content for each department
  const content = {
    Home: <Home />,
    "Computer Engineering": <Comps />,
    "Mechanical Engineering": <Mech />,
    "Electronics and Telecommunication Engineering": <EXTC />,
    "Electrical Engineering": <Electrical />,
    "Information Technology": <InfoT />,
    "Basic Science and Humanities": <Humanities />,
  };

  // Define sidebar paths (optional for future use)
  const sidebarPaths = {
    Home: "/departments",
    "Computer Engineering": "/computer_engineering",
    "Mechanical Engineering": "/mechanical_engineering",
    "Electronics and Telecommunication Engineering": "/extc",
    "Electrical Engineering": "/electrical_engineering",
    "Information Technology": "/it",
    "Basic Science and Humanities": "/humanities",
  };

  // Handle sidebar click and navigate (optional)
  const handleTabClick = (tab) => {
    if (sidebarPaths[tab]) {
      navigate(sidebarPaths[tab]);
    }
  };

  return (
    <StaticPages
      pagename={"Departments"}
      path={"Home / Departments"}
      sidebar={sidebar}
      content={content}
      onTabClick={handleTabClick}
    />
  );
};

export const Dept_section = (departmentName) => {
  const navigate = useNavigate();
  const sidebar = [
    "About",
    "Head of Department",
    "Faculty and Supporting Staff",
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

  const content = {
    About: <About />,
    "Head of Department": <HeadOfDepartment department={departmentName} />,

    "Faculty and Supporting Staff": (
      <FacultySupportingStaff department={departmentName} />
    ),
    "Committees and Board of Studies": (
      <CommitteesBoardOfStudy department={departmentName} />
    ),
    Infrastructure: <Infrastructure department={departmentName} />,
    Activities: <Activities department={departmentName} />,
    "Student Association": <StudentAssociation department={departmentName} />,
    Magazine: <Magazine department={departmentName} />,
    Syllabus: <Syllabus department={departmentName} />,
    "Result Analysis": <ResultAnalysis department={departmentName} />,
    "Time Table": <TimeTable department={departmentName} />,
    Achievements: <Achievements department={departmentName} />,
    "Academic Calendar": <AcademicCalendar department={departmentName} />,
    "Innovative Teaching and Learning Methods": (
      <InnovativeTeaching department={departmentName} />
    ),
    "Alumni Testimonials": <AlumniTestimonials department={departmentName} />,
    Publications: <Publications department={departmentName} />,
    Projects: <Projects department={departmentName} />,
  };

  return (
    <div>
      <StaticPages
        pagename={departmentName}
        path={`Home / Departments / ${departmentName}`}
        sidebar={sidebar}
        content={content}
      />
    </div>
  );
};
