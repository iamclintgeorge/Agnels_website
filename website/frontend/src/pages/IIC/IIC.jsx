import React from "react";
import StaticPages from "../../layouts/staticPages";
import {
    Institutions_Innovation_Council,
    Innovation_and_Startup_Policy,
    Innovation_Ambassador,
    Centre_of_Innovation_and_Entrepreneurship,
  
} from "./IICContent";
// import { useNavigate } from "react-router-dom";

const IIC = () => {
  const sidebar = [
    "Institution's Innovation Council",
    "Innovation and Startup Policy",
    "Innovation Ambassador",
    "Centre of Innovation and Entrepreneurship",
  ];

  // const navigate = useNavigate();

  const content = {
    "Institution's Innovation Council": <Institutions_Innovation_Council />,
    "Innovation and Startup Policy": <Innovation_and_Startup_Policy />,
    "Innovation Ambassador": <Innovation_Ambassador />,
    "Centre of Innovation and Entrepreneurship": <Centre_of_Innovation_and_Entrepreneurship    />,
  };

  return (
    <div>
      <StaticPages
        pagename={"IIC"}
        path={"Academics / IIC"}
        sidebar={sidebar}
        content={content}
      />
    </div>
  );
};

export default IIC;
