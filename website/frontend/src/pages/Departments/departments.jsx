// import React from "react";
// import StaticPages from "../../layouts/staticPages";

// import {
//   Home,
//   Comps,
//   Mech,
//   EXTC,
//   Electrical,
//   InfoT,
//   Humanities,
// } from "./departmentContent";
// import { useNavigate } from "react-router-dom";

// const Departments = () => {
//   const sidebar = [
//     "Home",
//     "Computer Engineering",
//     "Mechanical Engineering",
//     "Electronics and Telecommunication Engineering",
//     "Electrical Engineering",
//     "Information Technology",
//     "Basic Science and Humanities",
//   ];

//   const navigate = useNavigate();

//   const content = {
//     Home: <Home />,
//     "Computer Engineering": <Comps />,
//     "Mechanical Engineering": <Mech />,
//     "Electronics and Telecommunication Engineering": <EXTC />,
//     "Electrical Engineering": <Electrical />,
//     "Information Technology": <InfoT />,
//     "Basic Science and Humanities": <Humanities />,
//   };

//   return (
//     <div>
//       <StaticPages
//         pagename={"Departments"}
//         path={"Home / Departments"}
//         sidebar={sidebar}
//         content={content}
//       />
//     </div>
//   );
// };

// export default Departments;

import React from "react";
import { useNavigate } from "react-router-dom";
import StaticPages from "../../layouts/staticPages";
import { Home } from "./departmentContent"; // Import Home component

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

  // Define sidebar paths
  const sidebarPaths = {
    Home: "/departments",
    "Computer Engineering": "/computer_engineering",
    "Mechanical Engineering": "/mechanical_engineering",
    "Electronics and Telecommunication Engineering": "/extc",
    "Electrical Engineering": "/electrical_engineering",
    "Information Technology": "/it",
    "Basic Science and Humanities": "/humanities",
  };

  // Handle sidebar click and navigate
  const handleTabClick = (tab) => {
    navigate(sidebarPaths[tab]);
  };

  return (
    <StaticPages
      pagename={"Departments"}
      path={"Home / Departments"}
      sidebar={sidebar}
      content={{ Home: <Home /> }}
      onTabClick={handleTabClick}
    />
  );
};

export default Departments;
