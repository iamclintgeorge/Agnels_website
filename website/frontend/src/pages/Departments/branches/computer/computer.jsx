import React from "react";
import { Dept_section } from "../../Dept_sidebar";

const Computer = () => {
  const departmentName = "Computer Engineering";
  return (
    <div>
      <Dept_section departmentName={departmentName} />
    </div>
  );
};

export default Computer;
