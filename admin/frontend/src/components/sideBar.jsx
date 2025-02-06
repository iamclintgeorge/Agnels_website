import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../services/useAuthCheck";

const SideBar = () => {
  const { user } = useAuth();
  console.log("user value in sideBar.jsx: ", user);
  console.log("User role in SideBar.jsx: ", user?.role);

  // Check if user is null or undefined before trying to access user.role
  if (!user) {
    return null; // Or return some loading state if you prefer
  }

  return (
    <div className="bg-[#0C2340] mt-16 min-h-screen max-h-auto w-64 text-white pb-10 sticky top-0 z-0">
      <div className="font-inter text-base font-light pl-8 pt-9 flex flex-col space-y-9">
        <p>Dashboard</p>
        <p>Home Page</p>
        <p>Logs</p>
        <p>Departments Page</p>
        <p>Admission Page</p>
        <p>Academics Page</p>
        {user.role === "teach_staff" && (
          <Link to="/student">Students Corner</Link>
        )}
        {user.role === "hod" && <Link to="/signup">Create User</Link>}
      </div>
    </div>
  );
};

export default SideBar;
