import React, { useState } from "react";
import logo from "../imgs/fcritlogo.png";
import { FaBars, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [isTopMenuOpen, setIsTopMenuOpen] = useState(false); // For Downloads, Feedback, etc.
  const [isBottomMenuOpen, setIsBottomMenuOpen] = useState(false); // For Home, About Us, etc.

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
          className="w-16 pt-14 absolute left-[25px]" // Moved the logo 20px to the right
        />
        
        {/* Text Content */}
        <div className="pl-[80px] pt-14"> {/* Text content pushed to the right by 20px to maintain distance */}
          <p className="font-playfair text-[20px] font-medium leading-8">
            FR. CONCEICAO RODRIGUES
          </p>
          <p className="font-playfair font-thin text-[14px] tracking-[3.7px]">
            INSTITUTE OF TECHNOLOGY
          </p>
          <p className="font-playfair font-thin text-[9px] tracking-[3.7px] leading-5">
            <span className="tracking-[-3px]"> -------------------------------------------------------------------</span>
            <span className="mr-2 ml-4 sm:text-right">VASHI</span>
            <span className="tracking-[-3px]"> -------------------------------------------------------------------</span>
          </p>
        </div>

        {/* Hamburger and Arrow Icons */}
        <div className="md:hidden absolute top-4 right-4 flex items-center gap-4">
          <button onClick={() => setIsTopMenuOpen(!isTopMenuOpen)}>
            <FaChevronDown className="text-white text-2xl" />
          </button>
          <button onClick={() => setIsBottomMenuOpen(!isBottomMenuOpen)}>
            <FaBars className="text-white text-2xl" />
          </button>
        </div>

        {/* Top Navigation for Desktop (Downloads, Feedback, etc.) */}
        <nav className="mt-[-40px] hidden md:flex">
          <ul className="list-none flex gap-3 text-sm p-0 m-0 font-inter font-light">
            <li className="hover:underline">Downloads</li>
            <li className="hidden md:inline">|</li>
            <li className="hover:underline">Feedback</li>
            <li className="hidden md:inline">|</li>
            <li className="hover:underline">Important Links</li>
            <li className="hidden md:inline">|</li>
            <li className="hover:underline">Circulars</li>
            <li className="hidden md:inline">|</li>
            <li className="hover:underline">Fee Payment</li>
            <li className="ml-4 mt-[-3px]">
              <button className="bg-transparent border-white border-[1px] text-xs px-4 py-[5px]">
                Login
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {/* Mobile Dropdown for Top Navigation */}
      {isTopMenuOpen && (
        <div className="md:hidden p-4 bg-[#0c2340] text-white z-10">
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

      {/* Bottom Navigation Links (Desktop) */}
      <div className="absolute flex gap-10 text-base p-0 m-0 font-inter z-10 ml-[620px] mt-1 font-light hidden md:flex">
        <p>Home</p>
        <p>About Us</p>
        <p>Departments</p>
        <p>Academics</p>
        <p>Admission</p>
        <p>Students</p>
      </div>

      {/* Mobile Dropdown for Bottom Navigation */}
      {isBottomMenuOpen && (
        <div className="md:hidden p-4 bg-[#0c2340] text-white z-10">
          <ul className="list-none flex flex-col gap-3 font-inter font-light">
            <li className="hover:underline">Home</li>
            <li className="hover:underline">About Us</li>
            <li className="hover:underline">Departments</li>
            <li className="hover:underline">Academics</li>
            <li className="hover:underline">Admission</li>
            <li className="hover:underline">Students</li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
