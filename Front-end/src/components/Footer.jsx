import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-start space-x-8">
        {" "}
        {/* Centered and added spacing */}
        <div className="mb-4 md:mb-0 space-y-4 md:space-y-6">
          {" "}
          {/* Adjusted spacing */}
          <p className="font-bold text-lg">
            Fr. C. Rodrigues Institute of Technology
          </p>
          <p>Agnel Technical Education Complex</p>
          <p>Sector 9-A, Vashi, Navi Mumbai,</p>
          <p>Maharashtra - 400703</p>
          <a href="tel:+912227663012" className="block hover:underline">
            PH: +91 22 27661924,
          </a>
          <a href="tel:+912227660842" className="block hover:underline">
            +91 22 27660619
          </a>
          <a href="mailto:info@fcrit.ac.in" className="block hover:underline">
            info@fcrit.ac.in
          </a>
        </div>
        <div className="flex flex-col items-center">
          {/* Placeholder for Google Maps iframe */}
          <iframe
            title="Google Maps"
            frameBorder="0"
            style={{ height: "300px", width: "500px" }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.731989107177!2d72.9891293743013!3d19.075517751989413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6cae0d8c5ab%3A0xbbf4481d662ca2d8!2sFr.%20Conceicao%20Rodrigues%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1724656497726!5m2!1sen!2sin"
          ></iframe>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-white hover:text-gray-400">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <p>Visitors Count: 002353811</p>
        <p className="text-center mt-4">
          © 2024 Fr. C. Rodrigues Institute of Technology. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
