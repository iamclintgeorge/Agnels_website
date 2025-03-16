import React from "react";
import StaticPages from "../../layouts/staticPages";
import {
  Strategies,
  Functions,
  Benefits,
  Coordinator,
  Our_Team,
  IQAC_Initiatives,
} from "./IQACContent";
// import { useNavigate } from "react-router-dom";

const IQAC = () => {
  const sidebar = [
    "Strategies",
    "Functions",
    "Benefits",
    "Coordinator",
    "Our Team",
    "Initiatives",
  ];

  // const navigate = useNavigate();

  const content = {
    "Strategies": <Strategies />,
    "Functions": <Functions />,
    "Benefits": <Benefits    />,
    "Coordinator": <Coordinator />,
    "Our Team": <Our_Team />,
    "Initiatives": <IQAC_Initiatives />,
  };

  return (
    <div>
      <StaticPages
        pagename={"IQAC"}
        path={"Academics / IQAC"}
        sidebar={sidebar}
        content={content}
      />
    </div>
  );
};

export default IQAC;
