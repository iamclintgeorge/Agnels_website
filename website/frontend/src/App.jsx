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
        </Routes>
      </>
      <Footer />
    </Router>
  );
}

export default App;
