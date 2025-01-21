import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section logo-section">
          <img
            src="/src/assets/imgs/fcritlogo.png" // Replace with your logo path
            alt="FCRIT Logo"
            className="footer-logo"
          />
          <h3>Fr. Conceicao Rodrigues Institute of Technology</h3>
          <p>Vashi</p>
        </div>
        <div className="footer-section navigation">
          <h4>Navigation</h4>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Departments</li>
            <li>Academics</li>
            <li>Admission</li>
            <li>Students</li>
          </ul>
        </div>
        <div className="footer-section quick-links">
          <h4>Quick Links</h4>
          <ul>
            <li>Downloads</li>
            <li>Feedback</li>
            <li>Important Links</li>
            <li>Circulars</li>
            <li>Fee Payment</li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <address>
            Agnel Technical Education Complex,
            <br />
            Sector 9-A, Vashi, Navi Mumbai,
            <br />
            Maharashtra, India. PIN - 400703
          </address>
          <p>
            Telephone: (022) 27661924, 27660619, 27660714, 27660715
            <br />
            Fax: (022) 27660619
            <br />
            Email:{" "}
            <a href="mailto:principal@fcrit.ac.in">principal@fcrit.ac.in</a>
          </p>
          <a
            href="https://goo.gl/maps/path-to-location"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Maps
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="social-icons">
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-twitter"></i>
        </div>
        <p>
          &copy; 2024 Fr. C. Rodrigues Institute of Technology. All Rights
          Reserved
        </p>
        {/* <p>Developers Team</p> */}
      </div>
    </footer>
  );
};

export default Footer;
