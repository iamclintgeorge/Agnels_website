import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Error404 from "./pages/error404";
import AdminLayout from "./layout/adminLayout";
import Student from "./pages/student";
import { AuthProvider } from "./services/useAuthCheck";
import WhatsNew from "./pages/HomePage/whatsNew";
import Profile from "./pages/profile";
import ImgCarousel from "./pages/HomePage/imgCarousel";
import IntroText from "./pages/HomePage/introText";
import DeptHome from "./pages/Department/dept_home";
import CompActivity from "./pages/Department/comp_activity";
import TrainingPlacement from "./pages/Training-Placement/training-placement";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HodDesk from "./pages/rolebasedPages/hodDesk";
import PrincipalDesk from "./pages/rolebasedPages/principalDesk";
import AboutUsAdmin from "./pages/AboutUs/AboutUsAdmin";
import ResearchAdmin from "./pages/research/ResearchAdmin";
import AdminNIRF from "./pages/AdminNIRF";
import AdminNBANAAC from "./pages/AdminNBANAAC";
import AcademicAdmin from "./pages/Academics/AcademicAdmin";
import AcademicHandbook from "./pages/Academics/AcademicHandbook";
import Teaching_staff from "./pages/HumanResources/teachingstaff";
import Nonteaching_staff from "./pages/HumanResources/nonteachingstaff";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<AdminLayout />}>
          <Route path="/home/carousel" element={<ImgCarousel />} />
          <Route path="/home/whatsNew" element={<WhatsNew />} />
          <Route path="/home/introtext" element={<IntroText />} />
          <Route path="/department/home" element={<DeptHome />} />
          <Route path="/academic/handbook" element={<AcademicHandbook />} />
          <Route
            path="/department/computer-engineering/activities"
            element={<CompActivity />}
          />
          <Route path="/academics" element={<AcademicAdmin />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/student" element={<Student />} />
          <Route path="/training-placement" element={<TrainingPlacement />} />
          <Route path="/hoddesk" element={<HodDesk />} />
          <Route path="/principaldesk" element={<PrincipalDesk />} />
          <Route path="/about-us" element={<AboutUsAdmin />} />
          <Route path="/research/:section" element={<ResearchAdmin />} />
          <Route path="/research" element={<ResearchAdmin />} />
          <Route path="/admin/nirf" element={<AdminNIRF />} />
          <Route path="/admin/nba-naac" element={<AdminNBANAAC />} />
          <Route path="/teachingstaff" element={<Teaching_staff />} />
          <Route path="/nonteachingstaff" element={<Nonteaching_staff />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}
