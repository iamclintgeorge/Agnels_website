// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Header from "./components/Header";
// import AboutUs from "./components/AboutUs";
// import WhatsNew from "./components/WhatsNew";
// import Footer from "./components/Footer";
// import Departments from "./components/Departments";

// function App() {
//   return (
//     <>
//     <Header />
//       <AboutUs />
//       <WhatsNew />
//       <Footer />
//     </>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import AboutUs from "./components/AboutUs";
import WhatsNew from "./components/WhatsNew";
import Footer from "./components/Footer";
import Departments from "./pages/Departments/departments";
import Aboutus from "./pages/AboutUs/aboutus";
import Research_Publications from "./pages/Research_Publications/Research_Publications"
import Admission from "./pages/Admission/Admission.jsx"

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          {/* Default Home Page */}
          <Route
            path="/"
            element={
              <>
                <AboutUs />
                <WhatsNew />
              </>
            }
          />
          {/* Departments Page */}
          <Route path="/departments" element={<Departments />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path ="/Research_Publications" element ={<Research_Publications />} />
          <Route path="/Admission" element={<Admission />} />
        </Routes>
      </>
      <Footer />
    </Router>
  );
}

export default App;
