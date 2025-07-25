import React from "react";
import { Dept_section } from "../../Dept_sidebar";

const Electrical = () => {
  const departmentName = "Electrical Engineering";
  return (
    <div>
      <Dept_section departmentName={departmentName} />
    </div>
  );
};

export default Electrical;
