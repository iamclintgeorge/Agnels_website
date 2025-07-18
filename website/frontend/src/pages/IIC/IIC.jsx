import React from "react";
import StaticPages from "../../layouts/staticPages";
import {
  Institutions_Innovation_Council,
  Innovation_and_Startup_Policy,
  Innovation_Ambassador,
  Centre_of_Innovation_and_Entrepreneurship,
} from "./IICContent";

const IIC = () => {
  const sidebar = ["Institutions Innovation Council",
  "Innovation and Startup Policy",
  "Innovation Ambassador",
  "Centre of Innovation and Entrepreneurship"];

  const content = {
    "Institutions Innovation Council":<Institutions_Innovation_Council />,
    "Innovation and Startup Policy":<Innovation_and_Startup_Policy />,
    "Innovation Ambassador":<  Innovation_Ambassador />,
    "Centre of Innovation and Entrepreneurship":<Centre_of_Innovation_and_Entrepreneurship />,
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
