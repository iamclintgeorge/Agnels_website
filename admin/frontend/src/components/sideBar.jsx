import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../services/useAuthCheck";

const SideBar = () => {
  const { user } = useAuth();
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleHomeClick = () => {
    setIsHomeOpen((prevstate) => !prevstate);
  };

  const handleAboutClick = () => {
    setIsAboutOpen((prevstate) => !prevstate);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="bg-[#0C2340] mt-16 min-h-screen max-h-auto w-64 text-white pb-10 sticky top-0 z-0">
      <div className="flex flex-col pt-9 pl-8 space-y-9 text-base font-light font-inter">
        <Link to="/">
          <p>Dashboard</p>
        </Link>
        <div>
          <p className="cursor-pointer" onClick={handleHomeClick}>
            Home Page
          </p>
          {isHomeOpen && (
            <div className="pt-2 pr-5 pl-4 leading-10">
              <Link to="/home/carousel">
                <p>Image Carousel</p>
              </Link>
              <p>Introduction Section</p>

              <Link to="/whatsNew">
                <p>Announcements</p>
              </Link>
            </div>
          )}
        </div>
        <div>
          <p className="cursor-pointer" onClick={handleAboutClick}>
            About Us
          </p>
          {isAboutOpen && (
            <div className="pt-2 pr-5 pl-4 space-y-4 leading-6">
              <p>History</p>
              <p>Vision and Mission</p>
              <p>Trustees</p>
              <p>Managing Director’s Desk</p>
              <p>Principal’s Desk</p>
              <p>Governance</p>
              <p>Audit Report and Affiliations</p>
              <p>Administrations and Committees</p>
              <p>Institute Roadmap</p>
              <p>Service Regulation</p>
              <p>Qualification and Eligibility norms for Recruitment</p>
              <p>Best Practices</p>
              <p>Mandatory Disclosures</p>
            </div>
          )}
        </div>
        <p>Departments</p>
        <p>Admission</p>
        <p>Academics</p>
        
          <Link to="/training-placement">
            Training and Placement
          </Link>
        

        <p>Research and Publication</p>
        <p>Human Resource</p>
        <p>Alumni Page</p>
        <p>Downloads Page</p>
        {(user.role === "teach_staff" || user.role === "superAdmin") && (
          <Link to="/student">Students Corner</Link>
        )}
        {(user.role === "hod" || user.role === "superAdmin") && (
          <Link to="/signup">Create User</Link>
        )}
        <p>Logs</p>
      </div>
    </div>
  );
};

export default SideBar;
