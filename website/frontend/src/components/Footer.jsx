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
          <a href="/">
            <div className="footer-section text-center md:text-left">
              <div className="mb-2 md:ml-24 flex justify-center md:justify-start">
                <img
                  src="/src/assets/imgs/fcritlogo.png"
                  alt="FCRIT Logo"
                  className="w-20 h-20 mb-1"
                />
              </div>
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
          </a>

          {/* Navigation */}
          <div className="footer-section md:pl-14">
            <h4 className="text-lg font-semibold mb-3 font-inter">
              Navigation
            </h4>
            <ul className="space-y-2 text-gray-800 font-inter">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/aboutUs">About Us</a>
              </li>
              <li>
                <a href="/departments">Departments</a>
              </li>
              <li>
                <a href="/academics">Academics</a>
              </li>
              <li>
                <a href="/admissions">Admissions</a>
              </li>
              <li>
                <a href="/studentCorner">Students Corner</a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="text-lg font-semibold mb-3 font-inter">
              Quick Links
            </h4>
            <ul className="space-y-2 text-gray-800 font-inter">
              <li>
                <a href="/downloads">Downloads</a>
              </li>
              <li>
                <a
                  href="https://fcrit.ac.in/static_pdfs/feedback/SSS_23_24.pdf"
                  target="block"
                >
                  Feedback
                </a>
              </li>
              <li>
                <a href="/Important-Links">Important Links</a>
              </li>
              <li>
                <a href="/circulars">Circulars</a>
              </li>
              <li>
                <a
                  href="https://www.eduqfix.com/PayDirect/#/student/pay/XxoRsO6mfiXGAnQY1R64lGgQcWtw4tYKPWYLPO8nzoGBvtL6DIe+F9YjQMK1keFr/254"
                  target="block"
                >
                  Fee Payment
                </a>
              </li>
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
            <a
              href="https://www.instagram.com/fcrit_officialvashi/#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-6 h-6 cursor-pointer hover:text-pink-600" />
            </a>
            <a
              href="https://www.facebook.com/FCRITofficial?mibextid=qi2Omg&rdid=IoJKkP2z1tHGVtlt&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F3C2PBraUmM9pih85%2F%3Fmibextid%3Dqi2Omg#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="w-6 h-6 cursor-pointer hover:text-blue-600" />
            </a>
            <a
              href="https://www.youtube.com/watch?v=yWJB6dRMQ6o"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="w-6 h-6 cursor-pointer hover:text-red-600" />
            </a>
            <a
              href="https://www.linkedin.com/in/fr-c-rodrigues-institute-of-technology-vashi-26a1b5195/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="w-6 h-6 cursor-pointer hover:text-blue-800" />
            </a>
          </div>
          <div>
            <p className="mt-3 md:mt-0">
              &copy; 2025 Fr. C. Rodrigues Institute of Technology. All Rights
              Reserved.
            </p>
            <a
              href="/developers"
              className="block text-end mt-1 underline hover:text-[#0C2340] transition-colors"
            >
              Developers Team
            </a>
          </div>
        </div>
      </footer>
      <div className="bg-[#AE9142] w-full h-2"></div>
    </>
  );
};

export default Footer;
