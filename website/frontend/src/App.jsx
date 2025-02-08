import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import AboutUs from "./components/AboutUs";
import WhatsNew from "./components/WhatsNew";
import Footer from "./components/Footer";
import Departments from "./pages/Departments/departments";
import Admissions from "./pages/admissions/admissions";
import Computer from "./pages/Departments/branches/computer/computer";
import Electrical from "./pages/Departments/branches/electrical/electrical";
import Extc from "./pages/Departments/branches/extc/extc";
import Humanities from "./pages/Departments/branches/humanities/humanities";
import InformationTech from "./pages/Departments/branches/IT/informationTech";
import Mechanical from "./pages/Departments/branches/mechanical/mechanical";
import StudentCorner from "./pages/StudentCorner/studentCorner";
import Login from "./pages/Login/Login";
import TrainingPlacement from "./pages/TrainingPlacement/TrainingPlacement";


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
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/studentCorner" element={<StudentCorner />} />
          <Route path="/computer_engineering" element={<Computer />} />
          <Route path="/electrical_engineering" element={<Electrical />} />
          <Route path="/extc" element={<Extc />} />
          <Route path="/humanities" element={<Humanities />} />
          <Route path="/it" element={<InformationTech />} />
          <Route path="/mechanical_engineering" element={<Mechanical />} />
          <Route path="/Login" element={<Login />} /> {/* ✅ Add Login Route */}
          <Route path="/training-placement" element={<TrainingPlacement />} />
        </Routes>
      </>
      <Footer />
    </Router>
  );
}

export default App;
