import React from "react";
import "../styles/Header.css";
import logo from "../imgs/fcritlogo.png";

const Header = () => {
  return (
    <header className="header">
      {/* Yellow Border */}
      <div className="header-border"></div>

      {/* Logo and Navigation */}
      <div className="header-content">
        <img src={logo} alt="FCRIT Logo" className="logo" />
        <div className="institute-info">
            <h1>FR. CONCEICAO RODRIGUES</h1>
            <h2>INSTITUTE OF TECHNOLOGY</h2>
            <p>VASHI</p>
        </div>

        <nav className="header-nav">
        <ul>
            <li><a href="#downloads">Downloads</a></li>
            <li>|</li>
            <li><a href="#feedback">Feedback</a></li>
            <li>|</li>
            <li><a href="#important-links">Important Links</a></li>
            <li>|</li>
            <li><a href="#circulars">Circulars</a></li>
            <li>|</li>
            <li><a href="#fee-payment">Fee Payment</a></li>
            <li><button className="login-btn">Login</button></li>
          </ul>
        </nav>
      </div>

      {/* Bottom Navigation Links */}
      <div className="bottom-links">
        <a href="#home">Home</a>
        <a href="#about-us">About Us</a>
        <a href="#departments">Departments</a>
        <a href="#academics">Academics</a>
        <a href="#admission">Admission</a>
        <a href="#students">Students</a>
      </div>
    </header>
  );
};

export default Header;

