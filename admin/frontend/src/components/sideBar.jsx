import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <div className="bg-[#0C2340] mt-16 min-h-screen max-h-auto w-64 text-white pb-10 sticky top-0 z-0">
        <div className="font-inter text-base font-light pl-8 pt-9 flex flex-col space-y-9">
          <p>Dashboard</p>
          <p>Home Page</p>
          <p>Logs</p>
          <p>Departments Page</p>
          <p>Admission Page</p>
          <p>Academics Page</p>
          <p>Students Corner</p>
          <Link to="/signup">Create User</Link>
        </div>
      </div>
    </>
  );
};

export default SideBar;
