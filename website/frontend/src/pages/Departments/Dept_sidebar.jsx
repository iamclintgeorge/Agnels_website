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
    "Computer Science and Engineering (Prev. IT)": "/it",
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

export const Dept_section = ({ departmentName }) => {
  console.log("Dept_section", departmentName);
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
    About: <About departmentName={departmentName} />,
    "Head of Department": <HeadOfDepartment departmentName={departmentName} />,

    "Faculty and Supporting Staff": (
      <FacultySupportingStaff departmentName={departmentName} />
    ),
    "Committees and Board of Studies": (
      <CommitteesBoardOfStudy departmentName={departmentName} />
    ),
    Infrastructure: <Infrastructure departmentName={departmentName} />,
    Activities: <Activities departmentName={departmentName} />,
    "Student Association": (
      <StudentAssociation departmentName={departmentName} />
    ),
    Magazine: <Magazine departmentName={departmentName} />,
    Syllabus: <Syllabus departmentName={departmentName} />,
    "Result Analysis": <ResultAnalysis departmentName={departmentName} />,
    "Time Table": <TimeTable departmentName={departmentName} />,
    Achievements: <Achievements departmentName={departmentName} />,
    "Academic Calendar": <AcademicCalendar departmentName={departmentName} />,
    "Innovative Teaching and Learning Methods": (
      <InnovativeTeaching departmentName={departmentName} />
    ),
    "Alumni Testimonials": (
      <AlumniTestimonials departmentName={departmentName} />
    ),
    Publications: <Publications departmentName={departmentName} />,
    Projects: <Projects departmentName={departmentName} />,
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
