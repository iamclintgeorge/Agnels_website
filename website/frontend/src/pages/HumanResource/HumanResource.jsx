
import React from "react";
import StaticPages from "../../layouts/staticPages";
import {
  Teaching_Staff,
  Non_Teaching_Staff,
} from "./HumanResourceContent";
// import { useNavigate } from "react-router-dom";

const HumanResource = () => {
  const sidebar = [
    "Teaching Staff",
    "Non-Teaching Staff",
  ];

  // const navigate = useNavigate();

  const content = {
    "Teaching Staff": <Teaching_Staff />,
    "Non-Teaching Staff": <Non_Teaching_Staff />,
  };

  return (
    <div>
      <StaticPages
        pagename={"Human Resource"}
        path={"Academics / Human Resource"}
        sidebar={sidebar}
        content={content}
      />
    </div>
  );
};

export default HumanResource;
