import React, { useState } from "react";
import logo from "../assets/imgs/fcritlogo.png";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isBottomMenuOpen, setIsBottomMenuOpen] = useState(false); // For mobile menu
  const [isAcademicsSubMenuOpen, setAcademicsSubMenuOpen] = useState(false); // For Academics submenu
  const [isStudentCornerSubMenuOpen, setStudentCornerSubMenuOpen] =
    useState(false); // For Student Corner submenu

  const navigate = useNavigate();

  return (
    <header className="bg-[#0c2340] text-white p-0 m-0  relative h-52 w-full z-20">
      {/* Yellow Border */}
      <div className="flex top-0 left-0 w-full bg-[#AE9142] h-[34px] flex items-center justify-center text-black text-sm font-medium">
        An Autonomous Institute & Permanently Affiliated to University of Mumbai
      </div>


      {/* Logo and Navigation */}
      <div className="flex items-center justify-between p-0 px-10 relative">
        {/* Logo */}
        <img
          src={logo}
          alt="FCRIT Logo"
          className="absolute w-20 h-36 pt-16 left-14"
        />

        {/* Text Content */}
<div className="pl-20 pt-0">

  {/* Agnel Charities */}
  <div className="relative top-8 left-10">
    <p className="font-inter text-[10px] font-light leading-8 tracking-[1.0px]">
      Agnel Charities
    </p>
  </div>

  {/* Main Title */}
  <div className="relative top-5 left-10">
    <p className="font-playfair text-[20px] font-medium leading-8">
      FR. CONCEICAO RODRIGUES
    </p>
  </div>

  {/* Subtitle */}
  <div className="relative top-5 left-10">
    <p className="font-playfair font-thin text-[14px] tracking-[3.7px]">
      INSTITUTE OF TECHNOLOGY
    </p>
  </div>

  {/* VASHI Section with Borders */}
  <div className="flex items-center justify-center mt-1 relative top-5 left-10">
    <span className="border-t border-white w-24"></span>
    <p className="text-[9px] tracking-[3.7px] mx-4 leading-5">VASHI</p>
    <span className="border-t border-white w-24"></span>
  </div>

</div>


        {/* Hamburger Icon */}
        <div className="md:hidden absolute top-7 right-4 flex items-center">
          <button onClick={() => setIsBottomMenuOpen(!isBottomMenuOpen)}>
            <FaBars className="text-white text-2xl" />
          </button>
        </div>

        {/* Top Navigation for Desktop (Downloads, Feedback, etc.) */}
        <nav className="mt-[-40px] hidden md:flex">
          <ul className="list-none flex gap-3 text-sm p-0 m-0 font-inter font-light">
            <li className="hover:underline">
              <Link to="/downloads" className="text-white hover:text-blue-700">
                Downloads
              </Link>
            </li>
            <li className="hidden md:inline">|</li>
            <li className="hover:underline">
              <a
                href="https://fcrit.ac.in/static_pdfs/feedback/SSS_23_24.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-700"
              >
                Feedback
              </a>
            </li>

            <li className="hidden md:inline">|</li>
            <li className="hover:underline">
              <Link
                to="/Important-Links"
                className="text-white hover:text-blue-700"
              >
                Important Links
              </Link>
            </li>
            <li className="hidden md:inline">|</li>
            <li className="hover:underline">
              <Link to="/circulars" className="text-white hover:text-blue-700">
                Circulars
              </Link>
            </li>
            <li className="hidden md:inline">|</li>

            <li className="hover:underline">
              <a
                href="https://www.eduqfix.com/PayDirect/#/student/pay/XxoRsO6mfiXGAnQY1R64lGgQcWtw4tYKPWYLPO8nzoGBvtL6DIe+F9YjQMK1keFr/254"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-700"
              >
                Fee Payment
              </a>
            </li>

            <li className="ml-4 mt-[-3px]">
              <button
                onClick={() => navigate("/login")}
                className="bg-transparent border-white border-[1px] text-xs px-4 py-[5px] hover:bg-white hover:text-black hover:border-black transition-all duration-300"
              >
                Login
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom Navigation Links (Desktop) */}
      <div className="absolute gap-3 text-base p-0 m-0 font-inter z-10 ml-[42vw] mr-10 mt-1 text-nowrap font-light hidden md:flex cursor-default">
        <Link
          to="/"
          className="hover:bg-white hover:text-black px-4 py-2 rounded transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          <p>Home</p>
        </Link>
        <Link
          to="/aboutUs"
          className="hover:bg-white hover:text-black px-4 py-2 rounded transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          <p>About Us</p>
        </Link>
        <Link
          to="/departments"
          className="hover:bg-white hover:text-black px-4 py-2 rounded transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          <p>Departments</p>
        </Link>

        {/* Academics Submenu (Desktop) */}
        <div
          className="relative group"
          onMouseEnter={() => setAcademicsSubMenuOpen(true)}
          onMouseLeave={() => setAcademicsSubMenuOpen(false)}
        >
          <Link
            to="/academics"
            className="hover:bg-white hover:text-black px-4 py-2 rounded transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
          >
            <p>Academics</p>
          </Link>
          {isAcademicsSubMenuOpen && (
            <div className="absolute left-0 top-full bg-[#0c2340] text-white rounded shadow-lg w-52 p-3 z-20">
              <ul className="flex flex-col gap-2">
                <li className="hover:bg-[#AE9142] px-2 py-1 rounded">
                  <Link to="/nirf">NIRF</Link>
                </li>
                <li className="hover:bg-[#AE9142] px-2 py-1 rounded">
                  <Link to="/iqac">IQAC</Link>
                </li>
                <li className="hover:bg-[#AE9142] px-2 py-1 rounded">
                  <Link to="/iic">IIC</Link>
                </li>
                <li className="hover:bg-[#AE9142] px-2 py-1 rounded">
                  <Link to="/research_Publications">
                    Research and Publications
                  </Link>
                </li>
                <li className="hover:bg-[#AE9142] px-2 py-1 rounded">
                  <Link to="/hr">Human Resource</Link>
                </li>
                <li className="hover:bg-[#AE9142] px-2 py-1 rounded">
                  <Link to="/nba-naac">NBA/NAAC</Link>
                </li>
                <li className="hover:bg-[#AE9142] px-2 py-1 rounded">
                  <Link to="/academic-calendar">Academic Calendar</Link>
                </li>
                <li className="hover:bg-[#AE9142] px-2 py-1 rounded">
                  <Link to="/icnte">ICNTE</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <Link
          to="/admissions"
          className="hover:bg-white hover:text-black px-4 py-2 rounded transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          <p>Admissions</p>
        </Link>

        {/* Student Corner Submenu (Desktop) */}
        <div
          className="relative group"
          onMouseEnter={() => setStudentCornerSubMenuOpen(true)}
          onMouseLeave={() => setStudentCornerSubMenuOpen(false)}
        >
          <Link
            to="/studentCorner"
            className="hover:bg-white hover:text-black px-4 py-2 rounded transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
          >
            <p>Student Corner</p>
          </Link>
          {isStudentCornerSubMenuOpen && (
            <div className="absolute left-0 top-full bg-[#0c2340] text-white rounded shadow-lg w-52 p-3 z-20">
              <ul className="flex flex-col gap-2">
                <li className="hover:bg-[#AE9142] px-2 py-1 rounded">
                  <Link to="/training-placement">Training and Placement</Link>
                </li>
                <li className="hover:bg-[#AE9142] px-2 py-1 rounded">
                  <Link to="/library">Library</Link>
                </li>
                <li className="hover:bg-[#AE9142] px-2 py-1 rounded">
                  <Link to="/almuni">Alumni</Link>
                </li>
                <li className="hover:bg-[#AE9142] px-2 py-1 rounded">
                  <Link to="/transcript">Transcript</Link>
                </li>
                <li className="hover:bg-[#AE9142] px-2 py-1 rounded">
                  <Link to="/manthanMagzine">Manthan Magazine</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown for Bottom Navigation */}
      {isBottomMenuOpen && (
        <div className="md:hidden p-4 bg-[#0c2340] text-white z-10">
          {/* Home, About Us, etc. section */}
          <ul className="list-none flex flex-col gap-3 font-inter font-light">
            <li className="hover:underline">
              <Link to="/" onClick={() => setIsBottomMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li className="hover:underline">
              <Link to="/aboutUs" onClick={() => setIsBottomMenuOpen(false)}>
                About Us
              </Link>
            </li>
            <li className="hover:underline">
              <Link
                to="/departments"
                onClick={() => setIsBottomMenuOpen(false)}
              >
                Departments
              </Link>
            </li>

            {/* Academics with the same sub-links */}
            <li className="hover:underline">
              <Link to="/academics" onClick={() => setIsBottomMenuOpen(false)}>
                Academics
              </Link>
              {/* Sub-items */}
              <ul className="ml-4 mt-1">
                <li className="hover:underline">
                  <Link to="/nirf" onClick={() => setIsBottomMenuOpen(false)}>
                    NIRF
                  </Link>
                </li>
                <li className="hover:underline">
                  <Link to="/iqac" onClick={() => setIsBottomMenuOpen(false)}>
                    IQAC
                  </Link>
                </li>
                <li className="hover:underline">
                  <Link to="/iic" onClick={() => setIsBottomMenuOpen(false)}>
                    IIC
                  </Link>
                </li>
                <li className="hover:underline">
                  <Link
                    to="/research_Publications"
                    onClick={() => setIsBottomMenuOpen(false)}
                  >
                    Research and Publications
                  </Link>
                </li>
                <li className="hover:underline">
                  <Link to="/hr" onClick={() => setIsBottomMenuOpen(false)}>
                    Human Resource
                  </Link>
                </li>
                <li className="hover:underline">
                  <Link
                    to="/nba-naac"
                    onClick={() => setIsBottomMenuOpen(false)}
                  >
                    NBA/NAAC
                  </Link>
                </li>
                <li className="hover:underline">
                  <Link
                    to="/academic-calendar"
                    onClick={() => setIsBottomMenuOpen(false)}
                  >
                    Academic Calendar
                  </Link>
                </li>
                <li className="hover:underline">
                  <Link to="/icnte" onClick={() => setIsBottomMenuOpen(false)}>
                    ICNTE
                  </Link>
                </li>
              </ul>
            </li>

            <li className="hover:underline">
              <Link to="/admissions" onClick={() => setIsBottomMenuOpen(false)}>
                Admission
              </Link>
            </li>

            {/* Student Corner with the same sub-links */}
            <li className="hover:underline">
              <Link
                to="/studentCorner"
                onClick={() => setIsBottomMenuOpen(false)}
              >
                Student Corner
              </Link>
              {/* Sub-items */}
              <ul className="ml-4 mt-1">
                <li className="hover:underline">
                  <Link
                    to="/training-placement"
                    onClick={() => setIsBottomMenuOpen(false)}
                  >
                    Training and Placement
                  </Link>
                </li>
                <li className="hover:underline">
                  <Link to="/library" onClick={() => setIsBottomMenuOpen(false)}>
                    Library
                  </Link>
                </li>
                <li className="hover:underline">
                  <Link to="/almuni" onClick={() => setIsBottomMenuOpen(false)}>
                    Alumni
                  </Link>
                </li>
                <li className="hover:underline">
                  <Link
                    to="/transcript"
                    onClick={() => setIsBottomMenuOpen(false)}
                  >
                    Transcript
                  </Link>
                </li>
                <li className="hover:underline">
                  <Link
                    to="/manthanMagzine"
                    onClick={() => setIsBottomMenuOpen(false)}
                  >
                    Manthan Magazine
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          {/* Thin White Line */}
          <div className="my-2 border-t border-white"></div>

          {/* Downloads, Feedback, etc. section */}
          <ul className="list-none flex flex-col gap-3 font-inter font-light">
            <li className="hover:underline">
              <Link to="/downloads" onClick={() => setIsBottomMenuOpen(false)}>
                Downloads
              </Link>
            </li>
            <li className="hover:underline">
              <a
                href="https://fcrit.ac.in/static_pdfs/feedback/SSS_23_24.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsBottomMenuOpen(false)}
              >
                Feedback
              </a>
            </li>
            <li className="hover:underline">
              <Link
                to="/Important-Links"
                onClick={() => setIsBottomMenuOpen(false)}
              >
                Important Links
              </Link>
            </li>
            <li className="hover:underline">
              <Link to="/circulars" onClick={() => setIsBottomMenuOpen(false)}>
                Circulars
              </Link>
            </li>
            <li className="hover:underline">
              <a
                href="https://www.eduqfix.com/PayDirect/#/student/pay/XxoRsO6mfiXGAnQY1R64lGgQcWtw4tYKPWYLPO8nzoGBvtL6DIe+F9YjQMK1keFr/254"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsBottomMenuOpen(false)}
              >
                Fee Payment
              </a>
            </li>
            <li className="ml-4 mt-[-3px]">
              <button
                className="bg-transparent border-white border-[1px] text-xs px-4 py-[5px]"
                onClick={() => {
                  setIsBottomMenuOpen(false);
                  navigate("/login");
                }}
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;