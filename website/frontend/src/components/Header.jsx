import React, { useState } from "react";
import logo from "../assets/imgs/fcritlogo.png";
import { FaBars, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [isBottomMenuOpen, setIsBottomMenuOpen] = useState(false); // For mobile menu
  const [isAcademicsSubMenuOpen, setAcademicsSubMenuOpen] = useState(false); // For Academics submenu
  const [isStudentCornerSubMenuOpen, setStudentCornerSubMenuOpen] =
    useState(false); // For Student Corner submenu

  return (
    <header className="bg-[#0c2340] text-white p-0 m-0 relative h-48 w-full z-20">
      {/* Yellow Border */}
      <div className="bg-[#AE9142] h-1 w-full"></div>

      {/* Logo and Navigation */}
      <div className="flex items-center justify-between p-0 px-10 relative">
        {/* Logo */}
        <img
          src={logo}
          alt="FCRIT Logo"
          className="absolute w-16 pt-14 left-20"
        />

        {/* Text Content */}
        <div className="pl-32 pt-14">
          <p className="font-playfair text-[20px] font-medium leading-8">
            FR. CONCEICAO RODRIGUES
          </p>
          <p className="font-playfair font-thin text-[14px] tracking-[3.7px]">
            INSTITUTE OF TECHNOLOGY
          </p>
          <p className="font-playfair font-thin text-[9px] tracking-[3.7px] leading-5">
            <span className="tracking-[-3px]">
              {" "}
              -------------------------------------------------------------------
            </span>
            <span className="mr-2 ml-4">VASHI</span>
            <span className="tracking-[-3px]">
              {" "}
              -------------------------------------------------------------------
            </span>
          </p>
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
              <button className="bg-transparent border-white border-[1px] text-xs px-4 py-[5px] hover:bg-white hover:text-black hover:border-black transition-all duration-300">
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

        {/* Academics Submenu */}
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
          {/* Academics Submenu */}
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
                  <Link to="/research">Research and Publications</Link>
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

        {/* Student Corner Submenu */}
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
          {/* Student Corner Submenu */}
          {isStudentCornerSubMenuOpen && (
            <div className="absolute left-0 top-full bg-[#0c2340] text-white rounded shadow-lg w-52 p-3 z-20">
              <ul className="flex flex-col gap-2">
                <li className="hover:bg-[#AE9142] px-2 py-1 rounded">
                  <Link to="/trainingAndPlacement">Training and Placement</Link>
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
            <li className="hover:underline">Home</li>
            <li className="hover:underline">About Us</li>
            <li className="hover:underline">Departments</li>
            <li className="hover:underline">Academics</li>
            <li className="hover:underline">Admission</li>
            <li className="hover:underline">Student Corner</li>
          </ul>

          {/* Thin White Line */}
          <div className="my-2 border-t border-white"></div>

          {/* Downloads, Feedback, etc. section */}
          <ul className="list-none flex flex-col gap-3 font-inter font-light">
            <li className="hover:underline">Downloads</li>
            <li className="hover:underline">Feedback</li>
            <li className="hover:underline">Important Links</li>
            <li className="hover:underline">Circulars</li>
            <li className="hover:underline">Fee Payment</li>
            <li className="ml-4 mt-[-3px]">
              <button className="bg-transparent border-white border-[1px] text-xs px-4 py-[5px]">
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
