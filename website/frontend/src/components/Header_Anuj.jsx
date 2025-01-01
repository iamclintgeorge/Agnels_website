// import React from "react";
// import "../styles/Header.css";

// function Header() {
//   return (
//     <header className="header">
//       <div className="header-top">
//         <div className="logo-container">
//           <img src="/src/imgs/fcritlogo.png" alt="FCRIT Logo" className="logo" />
//           <h1 className="header-title">
//             FR. CONCEICAO RODRIGUES INSTITUTE OF TECHNOLOGY
//           </h1>
//         </div>
//         <div className="header-links">
//           <a href="/downloads">Downloads</a>
//           <a href="/feedback">Feedback</a>
//           <a href="/important-links">Important Links</a>
//           <a href="/circulars">Circulars</a>
//           <a href="/fee-payment">Fee Payment</a>
//           <button className="login-button">Login</button>
//         </div>
//       </div>
//       <nav className="navbar">
//         <ul>
//           <li><a href="/">Home</a></li>
//           <li><a href="/about-us">About Us</a></li>
//           <li><a href="/departments">Departments</a></li>
//           <li><a href="/academics">Academics</a></li>
//           <li><a href="/admission">Admission</a></li>
//           <li><a href="/students">Students</a></li>
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default Header;



import React from "react";
import "../styles/Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <div className="logo-container">
          <img src="/src/imgs/fcritlogo.png" alt="FCRIT Logo" className="logo" />
          <div>
            <h1 className="header-title">
              FR. CONCEICAO RODRIGUES
              <br />
              INSTITUTE OF TECHNOLOGY
            </h1>
            <div className="header-subtitle-container">
    <span className="horizontal-line"></span>
    <p className="header-subtitle">VASHI</p>
    <span className="horizontal-line"></span>
  </div>
          </div>
        </div>
        <div className="header-links">
          <a href="/downloads">Downloads</a>
          <a href="/feedback">Feedback</a>
          <a href="/important-links">Important Links</a>
          <a href="/circulars">Circulars</a>
          <a href="/fee-payment">Fee Payment</a>
          <button className="login-button">Login</button>
        </div>
      </div>
      <nav className="navbar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about-us">About Us</a></li>
          <li><a href="/departments">Departments</a></li>
          <li><a href="/academics">Academics</a></li>
          <li><a href="/admission">Admission</a></li>
          <li><a href="/students">Students</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
