import React from "react";
import logo from "../assets/imgs/fcritlogo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-[#0c2340] text-white p-0 m-0 relative h-48 w-full">
      {/* Yellow Border */}
      <div className="bg-[#AE9142] h-1 w-full"></div>

      {/* Logo and Navigation */}
      <div className="flex items-center justify-between p-0 px-10">
        <img
          src={logo}
          alt="FCRIT Logo"
          className="absolute w-16 pt-14 left-20"
        />
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

        <nav className="mt-[-40px]">
          <ul className="list-none flex gap-3 text-sm p-0 m-0 font-inter font-light">
            <li className="hover:underline">Downloads</li>
            <li>|</li>
            <li className="hover:underline">Feedback</li>
            <li>|</li>
            <li className="hover:underline">Important Links</li>
            <li>|</li>
            <li className="hover:underline">Circulars</li>
            <li>|</li>
            <li className="hover:underline">Fee Payment</li>
            <li className="ml-4 mt-[-3px]">
              <button className="bg-transparent border-white border-[1px] text-xs px-4 py-[5px]">
                Login
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom Navigation Links */}
      <div className="absolute flex gap-10 text-base p-0 m-0 font-inter z-10 ml-[620px] mt-1 font-light">
        <Link to="/">Home</Link>
        <Link to="/about-us">About Us</Link>
        <Link to="/departments">Departments</Link>
        <Link to="/academics">Academics</Link>
        <Link to="/admission">Admission</Link>
        <Link to="/students">Students</Link>
      </div>
    </header>
  );
};

export default Header;
