import React from "react";
import StaticPages from "../../layouts/staticPages";
import {
  Admission_Process,
  UnderGraduate,
  PostGraduate,
  PHD,
  FeePayment,
} from "./AdmissionContent";
import AdmissionForm from "./AdmissionForm";

const Admission = () => {
  const sidebar = [
    "AdmissionProcess",
    "Under Graduate",
    "Post Graduate",
    "PHD",
    "Fee Payment",
    "Apply Now",
  ];

  const content = {
    AdmissionProcess: <Admission_Process />,
    "Under Graduate": <UnderGraduate />,
    "Post Graduate": <PostGraduate />,
    "PHD": <PHD />,
    "Fee Payment": <FeePayment />,
    "Apply Now": <AdmissionForm />,
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
