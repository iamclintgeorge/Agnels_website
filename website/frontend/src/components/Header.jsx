import React, { useState } from "react";
import logo from "../assets/imgs/fcritlogo.png";
import { FaBars, FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SearchBar from "./searchBar";

const Header = () => {
  const [isBottomMenuOpen, setIsBottomMenuOpen] = useState(false); // For mobile menu
  const [isAcademicsSubMenuOpen, setAcademicsSubMenuOpen] = useState(false); // For Academics submenu
  const [isStudentCornerSubMenuOpen, setStudentCornerSubMenuOpen] =
    useState(false); // For Student Corner submenu

  const navigate = useNavigate();

  return (
    <header className="bg-[#0c2340] text-white p-0 m-0 relative h-48 sm:h-52 w-full z-10">
      {/* Yellow Border */}
      <div className="flex top-0 left-0 w-full bg-[#AE9142] h-6 items-center justify-center text-black text-[10px] sm:text-xs font-normal">
        An Autonomous Institute & Permanently Affiliated to University of Mumbai
      </div>

      {/* Logo and Navigation */}
      <div className="flex items-center justify-between p-0 px-10 relative">
        {/* VERTICALLY STACKED SOCIAL ICONS + WHITE DIVIDER (Hidden on small screens) */}
        <div className="hidden md:flex absolute top-7 left-0 items-center gap-4 z-30 pl-6 bottom-0">
          {/* Social Icons (stacked vertically) */}
          <div className="flex flex-col items-center gap-5">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/fcrit_officialvashi/#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-[#CACACA] text-xl hover:text-[#AE9142] transition-colors" />
            </a>
            {/* Facebook in a small white circle */}
            <a
              href="https://www.facebook.com/FCRITofficial?mibextid=qi2Omg&rdid=IoJKkP2z1tHGVtlt&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F3C2PBraUmM9pih85%2F%3Fmibextid%3Dqi2Omg#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-4 h-4 bg-[#CACACA] rounded-full flex items-center justify-center">
                <FaFacebookF className="text-[#0c2340] text-xs hover:text-[#AE9142] text-center" />
              </div>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/fr-c-rodrigues-institute-of-technology-vashi-26a1b5195/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="text-[#CACACA] hover:text-[#AE9142] transition-colors text-sm" />
            </a>
          </div>
          {/* Vertical Divider */}
          <div className="border-l border-[#727272] h-24" />
        </div>
        {/* Logo */}
        <img
          src={logo}
          alt="FCRIT Logo"
          className="absolute w-16 h-16 mt-12 left-7 sm:left-32 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div
          className="ml-20 sm:ml-32 mt-2 sm:mt-0 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="relative top-8 sm:left-10">
            <p className="font-inter text-[8px] sm:text-[10px] font-light leading-9 tracking-[1.0px] italic">
              Agnel Charities
            </p>
          </div>
          <div className="relative top-5 sm:left-10 text-nowrap">
            <p className="font-playfair text-[15px] sm:text-[19px] font-medium tracking-wide">
              FR. CONCEICAO RODRIGUES
            </p>
          </div>

          {/* Subtitle */}
          <div className="relative top-5 text-nowrap sm:left-10">
            <p className="font-playfair font-thin text-[9.7px] sm:text-[13.7px] tracking-[3.7px]">
              INSTITUTE OF TECHNOLOGY
            </p>
          </div>

          {/* VASHI Section with Borders */}
          <div className="flex items-center justify-center mt-1 relative top-4 sm:left-10">
            <span className="border-t border-[#999999] w-[18vw] sm:w-[7.65vw]"></span>
            <p className="font-playfair text-[7.5px] tracking-[2.5px] mx-4 leading-5">
              VASHI
            </p>
            <span className="border-t border-[#999999] w-[17vw] sm:w-[7.65vw]"></span>
          </div>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden absolute mt-12 right-4 flex items-center z-30">
          <button
            onClick={() => {
              console.log(
                "Hamburger clicked, current state:",
                isBottomMenuOpen
              );
              setIsBottomMenuOpen(!isBottomMenuOpen);
            }}
            className="z-30"
          >
            {isBottomMenuOpen ? (
              <span className="text-white text-3xl">&times;</span>
            ) : (
              <FaBars className="text-white text-2xl" />
            )}
          </button>
        </div>

        {/* Top Navigation for Desktop (Downloads, Feedback, etc.) */}
        <nav className="mt-[-40px] hidden md:flex">
          <ul className="list-none flex gap-3 text-sm p-0 m-0 font-inter font-light">
            <li className="hover:underline">
              <Link to="/downloads" className="text-white">
                Downloads
              </Link>
            </li>
            <li className="hidden md:inline">|</li>
            <li className="hover:underline">
              <a
                href="https://fcrit.ac.in/static_pdfs/feedback/SSS_23_24.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                Feedback
              </a>
            </li>

            <li className="hidden md:inline">|</li>
            <li className="hover:underline">
              <Link to="/Important-Links" className="text-white">
                Important Links
              </Link>
            </li>
            <li className="hidden md:inline">|</li>
            <li className="hover:underline">
              <Link to="/circulars" className="text-white">
                Circulars
              </Link>
            </li>
            <li className="hidden md:inline">|</li>

            <li className="hover:underline">
              <a
                href="https://www.eduqfix.com/PayDirect/#/student/pay/XxoRsO6mfiXGAnQY1R64lGgQcWtw4tYKPWYLPO8nzoGBvtL6DIe+F9YjQMK1keFr/254"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                Fee Payment
              </a>
            </li>
            <li className="hidden md:inline">|</li>
            <li className="hover:underline">
              <Link to="/iqac" className="text-white">
                IQAC
              </Link>
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

      {/* <div className="ml-[90vw] -mt-5 mb-5">Hi</div> */}
      <SearchBar />

      {/* Bottom Navigation Links (Desktop) */}
      <div className="absolute gap-3 text-base p-0 m-0 font-inter z-10 ml-[42vw] mr-10 mt-1 text-nowrap font-light hidden md:flex cursor-default">
        {/* <Link to="/" className="hover:border-b-2 hover:border-white px-4 py-2"></Link> */}
        <Link to="/" className="hover:border-b-2 hover:border-white px-4 py-2">
          <p>Home</p>
        </Link>
        <Link
          to="/aboutUs"
          className="hover:border-b-2 hover:border-white px-4 py-2"
        >
          <p>About Us</p>
        </Link>
        <Link
          to="/departments"
          className="hover:border-b-2 hover:border-white px-4 py-2"
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
            className="hover:border-b-2 hover:border-white px-4 py-2 flex items-center gap-2"
          >
            <p>Academics</p>
          </Link>
          {isAcademicsSubMenuOpen && (
            <div className="absolute -left-11 top-full bg-[#0c2340] text-white rounded shadow-lg w-52 p-3 z-20">
              <ul className="flex flex-col gap-2 text-wrap">
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
                  <a
                    href="https://icnte.fcrit.ac.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ICNTE
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <Link
          to="/admissions"
          className="hover:border-b-2 hover:border-white px-4 py-2"
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
            className="hover:border-b-2 hover:border-white px-4 py-2 flex items-center gap-2"
          >
            <p>Student Corner</p>
          </Link>
          {isStudentCornerSubMenuOpen && (
            <div className="absolute -left-7 top-full bg-[#0c2340] text-white rounded shadow-lg w-[14vw] p-3 z-20">
              <ul className="flex flex-col gap-2 text-wrap">
                <li className="hover:bg-[#AE9142] px-2 py-1 rounded">
                  <Link to="/training-placement">Training and Placement</Link>
                </li>
                <li className="hover:bg-[#AE9142] px-2 py-1 rounded">
                  <a
                    href="https://library.fcrit.ac.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Library
                  </a>
                </li>

                <li className="hover:bg-[#AE9142] px-2 py-1 rounded">
                  Transcript
                </li>

                <li className="hover:bg-[#AE9142] px-2 py-1 rounded">
                  <Link to="/almuni">Alumni</Link>
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
        <div className="fixed inset-0 w-full h-full bg-[#0C2340] flex flex-col z-[99999] px-4 pt-6 md:hidden overflow-y-auto">
          {/* Top Row: Close Icon and Logo/Text */}
          <div className="flex items-center justify-between mb-6">
            <button
              className="text-white text-3xl"
              onClick={() => setIsBottomMenuOpen(false)}
            >
              &times;
            </button>
            {/* Centered and smaller styled text for mobile */}
            <div className="flex flex-col items-center justify-center mx-auto text-center w-full">
              <p className="font-inter text-[8px] font-light leading-6 tracking-[0.7px] italic text-white">
                Agnel Charities
              </p>
              <p className="font-playfair text-[13px] font-medium tracking-wide text-white">
                FR. CONCEICAO RODRIGUES
              </p>
              <p className="font-playfair font-thin text-[9px] tracking-[2.5px] text-white">
                INSTITUTE OF TECHNOLOGY
              </p>
              <div className="flex items-center justify-center mt-1 w-full">
                <span className="border-t border-[#999999] w-[20vw]"></span>
                <p className="font-playfair text-[6px] tracking-[1.5px] mx-2 leading-5 text-white">
                  VASHI
                </p>
                <span className="border-t border-[#999999] w-[20vw]"></span>
              </div>
            </div>
            <div className="w-8" /> {/* Spacer to balance the close icon */}
          </div>

          {/* Main Menu */}
          <nav className="flex flex-col space-y-6">
            <Link
              to="/"
              className="text-white text-base"
              onClick={() => setIsBottomMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/aboutUs"
              className="text-white text-base flex items-center justify-between"
              onClick={() => setIsBottomMenuOpen(false)}
            >
              About Us <span>{">"}</span>
            </Link>
            <Link
              to="/departments"
              className="text-white text-base flex items-center justify-between"
              onClick={() => setIsBottomMenuOpen(false)}
            >
              Departments <span>{">"}</span>
            </Link>
            <Link
              to="/academics"
              className="text-white text-base flex items-center justify-between"
              onClick={() => setIsBottomMenuOpen(false)}
            >
              Academics <span>{">"}</span>
            </Link>
            <Link
              to="/admissions"
              className="text-white text-base flex items-center justify-between"
              onClick={() => setIsBottomMenuOpen(false)}
            >
              Admission <span>{">"}</span>
            </Link>
            <Link
              to="/studentCorner"
              className="text-white text-base flex items-center justify-between"
              onClick={() => setIsBottomMenuOpen(false)}
            >
              Students <span>{">"}</span>
            </Link>
          </nav>

          {/* Divider */}
          <div className="border-t border-gray-400 my-8"></div>

          {/* Secondary Links */}
          <nav className="flex flex-col space-y-4">
            <Link
              to="/downloads"
              className="text-white text-base"
              onClick={() => setIsBottomMenuOpen(false)}
            >
              Downloads
            </Link>
            <a
              href="https://fcrit.ac.in/static_pdfs/feedback/SSS_23_24.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-base"
              onClick={() => setIsBottomMenuOpen(false)}
            >
              Feedback
            </a>
            <Link
              to="/Important-Links"
              className="text-white text-base"
              onClick={() => setIsBottomMenuOpen(false)}
            >
              Important Links
            </Link>
            <Link
              to="/circulars"
              className="text-white text-base"
              onClick={() => setIsBottomMenuOpen(false)}
            >
              Circulars
            </Link>
            <a
              href="https://www.eduqfix.com/PayDirect/#/student/pay/XxoRsO6mfiXGAnQY1R64lGgQcWtw4tYKPWYLPO8nzoGBvtL6DIe+F9YjQMK1keFr/254"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-base"
              onClick={() => setIsBottomMenuOpen(false)}
            >
              Fee Payment
            </a>
            <Link
              to="/iqac"
              className="text-white text-base"
              onClick={() => setIsBottomMenuOpen(false)}
            >
              IQAC
            </Link>
          </nav>

          {/* Login Button at the Bottom */}
          <button
            className="mt-12 mb-8 border border-white text-white py-2 rounded w-full"
            onClick={() => {
              setIsBottomMenuOpen(false);
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
