import React from "react";
import StaticPages from "../../layouts/staticPages";
// import { useNavigate } from "react-router-dom";
import { AdmissionPro, PostG, UnderG, PhD, Fees } from "./admissionContent";

const Admissions = () => {
  const sidebar = [
    "Admission Process",
    "Under Graduate",
    "Post Graduate",
    "PhD",
    "Fee Payment",
  ];

  // const navigate = useNavigate();

  const content = {
    "Admission Process": <AdmissionPro />,
    "Under Graduate": <UnderG />,
    "Post Graduate": <PostG />,
    PhD: <PhD />,
    "Fee Payment": <Fees />,
    // "Computer Science and Engineering (Prev. IT)": <InfoT />,
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
