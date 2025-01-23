import React from "react";
import StaticPages from "../../layouts/staticPages";
// import { useNavigate } from "react-router-dom";
import { AdmissionPro } from "./admissionContent";

const Admissions = () => {
  const sidebar = [
    "Admission Process",
    "Computer Engineering",
    "Mechanical Engineering",
    "Electronics and Telecommunication Engineering",
    "Electrical Engineering",
    "Information Technology",
    "Basic Science and Humanities",
  ];

  // const navigate = useNavigate();

  const content = {
    "Admission Process": <AdmissionPro />,
    // "Computer Engineering": <Comps />,
    // "Mechanical Engineering": <Mech />,
    // "Electronics and Telecommunication Engineering": <EXTC />,
    // "Electrical Engineering": <Electrical />,
    // "Information Technology": <InfoT />,
    // "Basic Science and Humanities": <Humanities />,
  };

  return (
    <div>
      <StaticPages
        pagename={"Admissions"}
        path={"Home / Admissions"}
        sidebar={sidebar}
        content={content}
      />
    </div>
  );
};

export default Admissions;
