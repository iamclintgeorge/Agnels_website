import React from "react";
import StaticPages from "../../layouts/staticPages";
import {
  Admission_Process,
  UnderGraduate,
  PostGraduate,
  PHD,
  FeePayment,
  
} from "./AdmissionContent";
// import { useNavigate } from "react-router-dom";

const Admission = () => {
  const sidebar = [
    "AdmissionProcess",
    "Under Graduate",
    "Post Graduate",
    "PHD",
    "Fee Payment"
    
  ];

  // const navigate = useNavigate();

  const content = {
    AdmissionProcess: <Admission_Process />,
    "Under Graduate": <UnderGraduate />,
    "Post Graduate": <PostGraduate />,
    "PHD": <PHD />,
    "Fee Payment": <FeePayment />,
    
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

export default Admission;
