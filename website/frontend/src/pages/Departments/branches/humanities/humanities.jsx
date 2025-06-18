import React from "react";
import { useNavigate } from "react-router-dom";
import StaticPages from "../../../../layouts/staticPages";

import {
  About,
  Head_of_Department,
  Faculty_SupportingStaff,
  Committees_BoardOfStudy,
  Infrastructure,
  Activities,
  Student_Association,
  Magazine,
  Syllabus,
  Result_Analysis,
  Time_Table,
  Achievements,
  Academic_Calendar,
  Innovative_Teaching,
  Alumni_Testimonials,
  Publications,
  Projects,
} from "./humanitiescontent";


const Humanities = () => {
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

  const navigate = useNavigate();

  const content = {
    About: <About />,
    "Head of Department": <Head_of_Department />,
    "Faculty and Supporting Staff": <Faculty_SupportingStaff />,
    "Committees and Board of Studies": <Committees_BoardOfStudy />,
    "Infrastructure": <Infrastructure />,
    "Activities": <Activities />,
    "Student Association": <Student_Association />,
    "Magazine": <Magazine />,
    "Syllabus": <Syllabus/>,
    "Result Analysis": <Result_Analysis />,
    "Time Table": <Time_Table/>,
    "Achievements": <Achievements />,
    "Academic Calendar": <Academic_Calendar />,
    "Innovative Teaching and Learning Methods": <Innovative_Teaching />,
    "Alumni Testimonials": <Alumni_Testimonials />,
    "Publications": <Publications />,
    "Projects": <Projects />,
  };

  return (
    <div>
      <StaticPages
        pagename={"Humanities"}
        path={"Home / Department / Humanities"}
        sidebar={sidebar}
        content={content}
      />
    </div>
  );
};

export default Humanities;