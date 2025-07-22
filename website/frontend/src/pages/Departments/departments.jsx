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

const Departments = () => {
  const navigate = useNavigate();

  // Sidebar options
  const sidebar = [
    "Home",
    "Computer Engineering",
    "Mechanical Engineering",
    "Electronics and Telecommunication Engineering",
    "Electrical Engineering",
    "Information Technology",
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

export default Departments;
