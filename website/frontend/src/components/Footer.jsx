import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#EEEBE5] px-5 py-10">
      <div className="footer-container max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Logo & Institute Info */}
        <div className="footer-section text-center md:text-left">
          <img
            src="/src/assets/imgs/fcritlogo.png"
            alt="FCRIT Logo"
            className="w-20 h-20 mx-auto md:mx-0 mb-1"
          />
          <div className="pl-0 pt-0">
            <div className="relative top-3 left-1">
              <p className="font-inter text-[10px] font-light leading-9 tracking-[1.0px] italic">
                Agnel Charities
              </p>
            </div>
            <div className="relative top-0 left-1">
              <p className="font-playfair text-[19px] font-medium tracking-wide">
                FR. CONCEICAO RODRIGUES
              </p>
            </div>

            {/* Subtitle */}
            <div className="relative top-0 left-1">
              <p className="font-playfair font-thin text-[13.7px] tracking-[3.7px]">
                INSTITUTE OF TECHNOLOGY
              </p>
            </div>

            {/* VASHI Section with Borders */}
            <div className="flex items-center justify-center mt-1 relative top-0 -left-1">
              <span className="border-t border-[#999999] w-[7.65vw]"></span>
              <p className="font-playfair text-[7.5px] tracking-[2.5px] mx-4 leading-5">
                VASHI
              </p>
              <span className="border-t border-[#999999] w-[7.65vw]"></span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="footer-section pl-14">
          <h4 className="text-lg font-bold mb-3">Navigation</h4>
          <ul className="space-y-2 text-gray-700">
            <li>Home</li>
            <li>About Us</li>
            <li>Departments</li>
            <li>Academics</li>
            <li>Admission</li>
            <li>Students</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="text-lg font-bold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-gray-700">
            <li>Downloads</li>
            <li>Feedback</li>
            <li>Important Links</li>
            <li>Circulars</li>
            <li>Fee Payment</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h4 className="text-lg font-bold mb-3">Contact Us</h4>
          <address className="text-gray-700 not-italic text-sm leading-relaxed">
            Agnel Technical Education Complex, <br />
            Sector 9-A, Vashi, Navi Mumbai, <br />
            Maharashtra, India - 400703
          </address>
          <p className="text-sm mt-2">
            Tel: (022) 27661924, 27660619 <br />
            Fax: (022) 27660619 <br />
            Email:{" "}
            <a href="mailto:principal@fcrit.ac.in" className="underline">
              principal@fcrit.ac.in
            </a>
          </p>
          <a
            href="https://goo.gl/maps/path-to-location"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline block mt-2"
          >
            Google Maps
          </a>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="mt-10 border-t border-gray-300 pt-5 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
        <div className="flex space-x-4">
          <FaInstagram className="w-6 h-6 cursor-pointer hover:text-pink-600" />
          <FaFacebook className="w-6 h-6 cursor-pointer hover:text-blue-600" />
          <FaTwitter className="w-6 h-6 cursor-pointer hover:text-blue-400" />
          <FaYoutube className="w-6 h-6 cursor-pointer hover:text-red-600" />
          <FaLinkedin className="w-6 h-6 cursor-pointer hover:text-blue-800" />
        </div>
        <p className="mt-3 md:mt-0">
          &copy; 2025 Fr. C. Rodrigues Institute of Technology. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
