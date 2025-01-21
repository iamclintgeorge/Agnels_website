import React from "react";
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
// import { useNavigate } from "react-router-dom";

const Departments = () => {
  const sidebar = [
    "Home",
    "Computer Engineering",
    "Mechanical Engineering",
    "Electronics and Telecommunication Engineering",
    "Electrical Engineering",
    "Information Technology",
    "Basic Science and Humanities",
  ];

  // const navigate = useNavigate();

  const content = {
    Home: <Home />,
    "Computer Engineering": <Comps />,
    "Mechanical Engineering": <Mech />,
    "Electronics and Telecommunication Engineering": <EXTC />,
    "Electrical Engineering": <Electrical />,
    "Information Technology": <InfoT />,
    "Basic Science and Humanities": <Humanities />,
  };

  return (
    <div>
      <StaticPages
        pagename={"Departments"}
        path={"Home / Departments"}
        sidebar={sidebar}
        content={content}
      />
    </div>
  );
};

export default Departments;
