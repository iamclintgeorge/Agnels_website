import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#EEEBE5] pt-20 px-10 py-10">
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
              <div className="flex items-center justify-center mt-1 relative top-0 -left-3">
                <span className="border-t border-[#999999] w-[7.65vw]"></span>
                <p className="font-playfair text-[7.5px] tracking-[2.5px] mx-4 leading-5">
                  VASHI
                </p>
                <span className="border-t border-[#999999] w-[7.65vw]"></span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-section md:pl-14">
            <h4 className="text-lg font-semibold mb-3 font-inter">
              Navigation
            </h4>
            <ul className="space-y-2 text-gray-800 font-inter">
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
            <h4 className="text-lg font-semibold mb-3 font-inter">
              Quick Links
            </h4>
            <ul className="space-y-2 text-gray-800 font-inter">
              <li>Downloads</li>
              <li>Feedback</li>
              <li>Important Links</li>
              <li>Circulars</li>
              <li>Fee Payment</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h4 className="text-lg font-semibold mb-3 font-inter">
              Contact Us
            </h4>
            <address className="text-gray-800 not-italic text-base leading-relaxed font-inter">
              Agnel Technical Education Complex, <br />
              Sector 9-A, Vashi, Navi Mumbai, <br />
              Maharashtra, India - 400703
            </address>
            <p className="text-base mt-4 text-gray-800">
              Tel: (022) 27661924, 27660619 <br />
              Fax: (022) 27660619 <br />
              Email:{" "}
              <a href="mailto:principal@fcrit.ac.in">principal@fcrit.ac.in</a>
            </p>
            <a
              href="https://www.google.com/maps/dir//Fr.+Conceicao+Rodrigues+Institute+of+Technology+Father+Agnel+Technical+Education+Complex+near+Noor+Masjid,+Juhu+Nagar,+Sector+9A,+Vashi+Navi+Mumbai,+Maharashtra+400703/@19.0755127,72.9917043,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x3be7c6cae0d8c5ab:0xbbf4481d662ca2d8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black underline block mt-6"
            >
              Google Maps
            </a>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-10 border-t border-gray-400 pt-5 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          <div className="flex space-x-4">
            <FaInstagram className="w-6 h-6 cursor-pointer hover:text-pink-600" />
            <FaFacebook className="w-6 h-6 cursor-pointer hover:text-blue-600" />
            <FaTwitter className="w-6 h-6 cursor-pointer hover:text-blue-400" />
            <FaYoutube className="w-6 h-6 cursor-pointer hover:text-red-600" />
            <FaLinkedin className="w-6 h-6 cursor-pointer hover:text-blue-800" />
          </div>
          <div>
            <p className="mt-3 md:mt-0">
              &copy; 2025 Fr. C. Rodrigues Institute of Technology. All Rights
              Reserved.
            </p>
            <Link to="/developers" className="block text-end mt-1 underline hover:text-[#0C2340] transition-colors">
              Developers Team
            </Link>
          </div>
        </div>
      </footer>
      <div className="bg-[#AE9142] w-full h-2"></div>
    </>
  );
};

export default Footer;
