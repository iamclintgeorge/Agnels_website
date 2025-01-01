// import React from "react";
// import "../styles/Footer.css";

// function Footer() {
//   return (
//     <footer className="footer">
//       <div className="footer-content">
//         <div className="footer-left">
//           <h2>FR. CONCEICAO RODRIGUES INSTITUTE OF TECHNOLOGY</h2>
//           <p>
//             Agnel Technical Education Complex,<br />
//             Sector 9-A, Vashi, Navi Mumbai,<br />
//             Maharashtra, India PIN - 400703
//           </p>
//           <p>
//             Telephone: (022) 27661924, 27660619, 27660714, 27660715<br />
//             Fax: (022) 27660619<br />
//             Email: principal@fcrit.ac.in
//           </p>
//         </div>
//         <div className="footer-links">
//           <h3>Navigation</h3>
//           <ul>
//             <li><a href="/">Home</a></li>
//             <li><a href="/about-us">About Us</a></li>
//             <li><a href="/departments">Departments</a></li>
//             <li><a href="/academics">Academics</a></li>
//             <li><a href="/admission">Admission</a></li>
//             <li><a href="/students">Students</a></li>
//           </ul>
//         </div>
//         <div className="footer-right">
//           <h3>Quick Links</h3>
//           <ul>
//             <li><a href="/downloads">Downloads</a></li>
//             <li><a href="/feedback">Feedback</a></li>
//             <li><a href="/important-links">Important Links</a></li>
//             <li><a href="/circulars">Circulars</a></li>
//             <li><a href="/fee-payment">Fee Payment</a></li>
//           </ul>
//         </div>
//       </div>
//       <div className="footer-bottom">
//         <p>
//           &copy; 2024 Fr. C. Rodrigues Institute of Technology. All Rights Reserved.
//         </p>
//         <div className="social-links">
//           <a href="#"><i className="fab fa-facebook"></i></a>
//           <a href="#"><i className="fab fa-instagram"></i></a>
//           <a href="#"><i className="fab fa-twitter"></i></a>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;


import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section logo-section">
          <img
            src="/src/imgs/fcritlogo.png" // Replace with your logo path
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
            Email: <a href="mailto:principal@fcrit.ac.in">principal@fcrit.ac.in</a>
          </p>
          <a href="https://goo.gl/maps/path-to-location" target="_blank" rel="noopener noreferrer">
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
        <p>&copy; 2024 Fr. C. Rodrigues Institute of Technology. All Rights Reserved</p>
        {/* <p>Developers Team</p> */}
      </div>
    </footer>
  );
};

export default Footer;
