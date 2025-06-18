import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AboutUs from "./components/AboutUs";
import WhatsNew from "./components/WhatsNew";
import Footer from "./components/Footer";
import Departments from "./pages/Departments/departments";
import Aboutus from "./pages/AboutUs/aboutus";
import Research_Publications from "./pages/Research_Publications/Research_Publications";
import Admissions from "./pages/admissions/admissions";
import Academics from "./pages/Academics/academics";
import ExaminationsPage from "./pages/Academics/ExaminationsPage";
import Developers from "./pages/DevelopersPage/developersPage";

import Computer from "./pages/Departments/branches/computer/computer";
import Electrical from "./pages/Departments/branches/electrical/electrical";
import Extc from "./pages/Departments/branches/extc/extc";
import Humanities from "./pages/Departments/branches/humanities/humanities";
import InformationTech from "./pages/Departments/branches/IT/informationTech";
import Mechanical from "./pages/Departments/branches/mechanical/mechanical";
import StudentCorner from "./pages/StudentCorner/studentCorner";
import Login from "./pages/Login/Login";
import TrainingPlacement from "./pages/TrainingPlacement/TrainingPlacement";
import ErrorSection from "./components/ErrorSection.jsx";
import IQAC from "./pages/IQAC/IQAC";
import IIC from "./pages/IIC/IIC";
import NIRF from "./pages/NIRF/NIRF";
import HumanResource from "./pages/HumanResource/HumanResource";
import NbaNaaC from "./pages/NBA/NBA.jsx";
import Widgets from "./components/Widgets.jsx";
import News from "./components/News.jsx";

function App() {
  // Fix: Redirect /pdfs/... requests directly to the browser
  if (window.location.pathname.startsWith("/pdfs/")) {
    window.location.href = window.location.pathname;
    return null;
  }

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
                <News />
                <AboutUs />
                {/* <Widgets /> */}
                <WhatsNew />
              </>
            }
          />
          {/* Academics Page */}
          <Route path="/academics" element={<Academics />} />
          <Route path="/examinations-page" element={<ExaminationsPage />} />

          {/* Departments Pages */}
          {/* <Route path="/departments" element={<Departments />} /> */}
          <Route path="/aboutus" element={<Aboutus />} />
          <Route
            path="/research_Publications"
            element={<Research_Publications />}
          />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/studentCorner" element={<StudentCorner />} />
          {/* <Route path="/computer_engineering" element={<Computer />} />
          <Route path="/electrical_engineering" element={<Electrical />} />
          <Route path="/extc" element={<Extc />} />
          <Route path="/humanities" element={<Humanities />} />
          <Route path="/it" element={<InformationTech />} />
          <Route path="/mechanical_engineering" element={<Mechanical />} /> */}

          <Route path="/departments" element={<Departments />} />
          <Route path="/computer_engineering" element={<Computer />} />
          <Route path="/mechanical_engineering" element={<Mechanical />} />
          <Route path="/extc" element={<Extc />} />
          <Route path="/electrical_engineering" element={<Electrical />} />
          <Route path="/it" element={<InformationTech />} />
          <Route path="/humanities" element={<Humanities />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/training-placement" element={<TrainingPlacement />} />
          <Route path="/iqac" element={<IQAC />} />
          <Route path="/iic" element={<IIC />} />
          <Route path="/nirf" element={<NIRF />} />
          <Route path="/nba-naac" element={<NbaNaaC />} />
          <Route path="/hr" element={<HumanResource />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/human-resource" element={<HumanResource />} />
          <Route path="*" element={<ErrorSection />} />
        </Routes>
      </>
      <Footer />
    </Router>
  );
}

export default App;
