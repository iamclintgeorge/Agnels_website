import React from "react";
import { Dept_section } from "../../Dept_sidebar";

const Mechanical = () => {
  const departmentName = "Mechanical Engineering";
  return (
    <div>
      <Dept_section departmentName={departmentName} />
    </div>
  );
};

export default Mechanical;
