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

// Import new department components
import CompHome from "./pages/Department/Computer/Comp_home";
import MechHome from "./pages/Department/Mechanical/Mech_home";
import ElectHome from "./pages/Department/Electrical/Elect_home";
import ExtcHome from "./pages/Department/Extc/Extc_home";
import CSEHome from "./pages/Department/CSE/CSE_home";
import BSHHome from "./pages/Department/BSH/BSH_home";

// Computer Engineering Components
import ComputerActivities from "./pages/Department/Computer/computer_activities";
import ComputerAssociation from "./pages/Department/Computer/computer_association";
import ComputerMagazine from "./pages/Department/Computer/computer_magazine";
import ComputerTimetable from "./pages/Department/Computer/computer_timetable";
import ComputerAchievements from "./pages/Department/Computer/computer_achievements";
import ComputerInnovativeTeaching from "./pages/Department/Computer/computer_innovative_teaching";
import ComputerAcademicCalendar from "./pages/Department/Computer/computer_academic_calendar";
import ComputerPublications from "./pages/Department/Computer/computer_publications";
import ComputerProjects from "./pages/Department/Computer/computer_projects";
import ComputerCommittees from "./pages/Department/Computer/computer_committees";

// Mechanical Engineering Components
import MechanicalActivities from "./pages/Department/Mechanical/mechanical_activities";
import MechanicalAssociation from "./pages/Department/Mechanical/mechanical_association";
import MechanicalMagazine from "./pages/Department/Mechanical/mechanical_magazine";
import MechanicalTimetable from "./pages/Department/Mechanical/mechanical_timetable";
import MechanicalAchievements from "./pages/Department/Mechanical/mechanical_achievements";
import MechanicalInnovativeTeaching from "./pages/Department/Mechanical/mechanical_innovative_teaching";
import MechanicalAcademicCalendar from "./pages/Department/Mechanical/mechanical_academic_calendar";
import MechanicalPublications from "./pages/Department/Mechanical/mechanical_publications";
import MechanicalProjects from "./pages/Department/Mechanical/mechanical_projects";
import MechanicalCommittees from "./pages/Department/Mechanical/mechanical_committees";

// Electrical Engineering Components
import ElectricalActivities from "./pages/Department/Electrical/electrical_activities";
import ElectricalAssociation from "./pages/Department/Electrical/electrical_association";
import ElectricalMagazine from "./pages/Department/Electrical/electrical_magazine";
import ElectricalTimetable from "./pages/Department/Electrical/electrical_timetable";
import ElectricalAchievements from "./pages/Department/Electrical/electrical_achievements";
import ElectricalInnovativeTeaching from "./pages/Department/Electrical/electrical_innovative_teaching";
import ElectricalAcademicCalendar from "./pages/Department/Electrical/electrical_academic_calendar";
import ElectricalPublications from "./pages/Department/Electrical/electrical_publications";
import ElectricalProjects from "./pages/Department/Electrical/electrical_projects";
import ElectricalCommittees from "./pages/Department/Electrical/electrical_committees";

// EXTC Components
import ExtcActivities from "./pages/Department/Extc/extc_activities";
import ExtcAssociation from "./pages/Department/Extc/extc_association";
import ExtcMagazine from "./pages/Department/Extc/extc_magazine";
import ExtcTimetable from "./pages/Department/Extc/extc_timetable";
import ExtcAchievements from "./pages/Department/Extc/extc_achievements";
import ExtcInnovativeTeaching from "./pages/Department/Extc/extc_innovative_teaching";
import ExtcAcademicCalendar from "./pages/Department/Extc/extc_academic_calendar";
import ExtcPublications from "./pages/Department/Extc/extc_publications";
import ExtcProjects from "./pages/Department/Extc/extc_projects";
import ExtcCommittees from "./pages/Department/Extc/extc_committees";

// CSE Components
import CseActivities from "./pages/Department/CSE/cse_activities";
import CseAssociation from "./pages/Department/CSE/cse_association";
import CseMagazine from "./pages/Department/CSE/cse_magazine";
import CseTimetable from "./pages/Department/CSE/cse_timetable";
import CseAchievements from "./pages/Department/CSE/cse_achievements";
import CseInnovativeTeaching from "./pages/Department/CSE/cse_innovative_teaching";
import CseAcademicCalendar from "./pages/Department/CSE/cse_academic_calendar";
import CsePublications from "./pages/Department/CSE/cse_publications";
import CseProjects from "./pages/Department/CSE/cse_projects";
import CseCommittees from "./pages/Department/CSE/cse_committees";

// BSH Components
import BshActivities from "./pages/Department/BSH/bsh_activities";
import BshAssociation from "./pages/Department/BSH/bsh_association";
import BshMagazine from "./pages/Department/BSH/bsh_magazine";
import BshTimetable from "./pages/Department/BSH/bsh_timetable";
import BshAchievements from "./pages/Department/BSH/bsh_achievements";
import BshInnovativeTeaching from "./pages/Department/BSH/bsh_innovative_teaching";
import BshAcademicCalendar from "./pages/Department/BSH/bsh_academic_calendar";
import BshPublications from "./pages/Department/BSH/bsh_publications";
import BshProjects from "./pages/Department/BSH/bsh_projects";
import BshCommittees from "./pages/Department/BSH/bsh_committees";

// HOD Desk Components
import ComHod from "./pages/hodDesk/comHod";
import MechHod from "./pages/hodDesk/mechHod";
import ExtcHod from "./pages/hodDesk/extcHod";
import BshHod from "./pages/hodDesk/bshHod";
import ItHod from "./pages/hodDesk/itHod";
import ElectricalHod from "./pages/hodDesk/electricalHod";

// Content Approval Components
import ApprovalDashboard from "./pages/ContentApproval/ApprovalDashboard";

// Activity Logs Components
import ActivityLogs from "./pages/AuditLogs/ActivityLogs";

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

          {/* Department Home Routes */}
          <Route path="/department/computer/home" element={<CompHome />} />
          <Route path="/department/mechanical/home" element={<MechHome />} />
          <Route path="/department/electrical/home" element={<ElectHome />} />
          <Route path="/department/extc/home" element={<ExtcHome />} />
          <Route path="/department/cse/home" element={<CSEHome />} />
          <Route path="/department/bsh/home" element={<BSHHome />} />

          {/* Computer Engineering Routes */}
          <Route path="/department/computer-engineering/activities" element={<ComputerActivities />} />
          <Route path="/department/computer-engineering/student-association" element={<ComputerAssociation />} />
          <Route path="/department/computer-engineering/magazine" element={<ComputerMagazine />} />
          <Route path="/department/computer-engineering/time-table" element={<ComputerTimetable />} />
          <Route path="/department/computer-engineering/achievements" element={<ComputerAchievements />} />
          <Route path="/department/computer-engineering/innovative-teaching-and-learning-methods" element={<ComputerInnovativeTeaching />} />
          <Route path="/department/computer-engineering/academic-calendar" element={<ComputerAcademicCalendar />} />
          <Route path="/department/computer-engineering/publications" element={<ComputerPublications />} />
          <Route path="/department/computer-engineering/projects" element={<ComputerProjects />} />
          <Route path="/department/computer-engineering/committees-and-board-of-studies" element={<ComputerCommittees />} />

          {/* Mechanical Engineering Routes */}
          <Route path="/department/mechanical-engineering/activities" element={<MechanicalActivities />} />
          <Route path="/department/mechanical-engineering/student-association" element={<MechanicalAssociation />} />
          <Route path="/department/mechanical-engineering/magazine" element={<MechanicalMagazine />} />
          <Route path="/department/mechanical-engineering/time-table" element={<MechanicalTimetable />} />
          <Route path="/department/mechanical-engineering/achievements" element={<MechanicalAchievements />} />
          <Route path="/department/mechanical-engineering/innovative-teaching-and-learning-methods" element={<MechanicalInnovativeTeaching />} />
          <Route path="/department/mechanical-engineering/academic-calendar" element={<MechanicalAcademicCalendar />} />
          <Route path="/department/mechanical-engineering/publications" element={<MechanicalPublications />} />
          <Route path="/department/mechanical-engineering/projects" element={<MechanicalProjects />} />
          <Route path="/department/mechanical-engineering/committees-and-board-of-studies" element={<MechanicalCommittees />} />

          {/* Electrical Engineering Routes */}
          <Route path="/department/electrical-engineering/activities" element={<ElectricalActivities />} />
          <Route path="/department/electrical-engineering/student-association" element={<ElectricalAssociation />} />
          <Route path="/department/electrical-engineering/magazine" element={<ElectricalMagazine />} />
          <Route path="/department/electrical-engineering/time-table" element={<ElectricalTimetable />} />
          <Route path="/department/electrical-engineering/achievements" element={<ElectricalAchievements />} />
          <Route path="/department/electrical-engineering/innovative-teaching-and-learning-methods" element={<ElectricalInnovativeTeaching />} />
          <Route path="/department/electrical-engineering/academic-calendar" element={<ElectricalAcademicCalendar />} />
          <Route path="/department/electrical-engineering/publications" element={<ElectricalPublications />} />
          <Route path="/department/electrical-engineering/projects" element={<ElectricalProjects />} />
          <Route path="/department/electrical-engineering/committees-and-board-of-studies" element={<ElectricalCommittees />} />

          {/* EXTC Routes */}
          <Route path="/department/extc/activities" element={<ExtcActivities />} />
          <Route path="/department/extc/student-association" element={<ExtcAssociation />} />
          <Route path="/department/extc/magazine" element={<ExtcMagazine />} />
          <Route path="/department/extc/time-table" element={<ExtcTimetable />} />
          <Route path="/department/extc/achievements" element={<ExtcAchievements />} />
          <Route path="/department/extc/innovative-teaching-and-learning-methods" element={<ExtcInnovativeTeaching />} />
          <Route path="/department/extc/academic-calendar" element={<ExtcAcademicCalendar />} />
          <Route path="/department/extc/publications" element={<ExtcPublications />} />
          <Route path="/department/extc/projects" element={<ExtcProjects />} />
          <Route path="/department/extc/committees-and-board-of-studies" element={<ExtcCommittees />} />

          {/* CSE Routes */}
          <Route path="/department/computer-science-and-engineering/activities" element={<CseActivities />} />
          <Route path="/department/computer-science-and-engineering/student-association" element={<CseAssociation />} />
          <Route path="/department/computer-science-and-engineering/magazine" element={<CseMagazine />} />
          <Route path="/department/computer-science-and-engineering/time-table" element={<CseTimetable />} />
          <Route path="/department/computer-science-and-engineering/achievements" element={<CseAchievements />} />
          <Route path="/department/computer-science-and-engineering/innovative-teaching-and-learning-methods" element={<CseInnovativeTeaching />} />
          <Route path="/department/computer-science-and-engineering/academic-calendar" element={<CseAcademicCalendar />} />
          <Route path="/department/computer-science-and-engineering/publications" element={<CsePublications />} />
          <Route path="/department/computer-science-and-engineering/projects" element={<CseProjects />} />
          <Route path="/department/computer-science-and-engineering/committees-and-board-of-studies" element={<CseCommittees />} />

          {/* BSH Routes */}
          <Route path="/department/basic-science-and-humanities/activities" element={<BshActivities />} />
          <Route path="/department/basic-science-and-humanities/student-association" element={<BshAssociation />} />
          <Route path="/department/basic-science-and-humanities/magazine" element={<BshMagazine />} />
          <Route path="/department/basic-science-and-humanities/time-table" element={<BshTimetable />} />
          <Route path="/department/basic-science-and-humanities/achievements" element={<BshAchievements />} />
          <Route path="/department/basic-science-and-humanities/innovative-teaching-and-learning-methods" element={<BshInnovativeTeaching />} />
          <Route path="/department/basic-science-and-humanities/academic-calendar" element={<BshAcademicCalendar />} />
          <Route path="/department/basic-science-and-humanities/publications" element={<BshPublications />} />
          <Route path="/department/basic-science-and-humanities/projects" element={<BshProjects />} />
          <Route path="/department/basic-science-and-humanities/committees-and-board-of-studies" element={<BshCommittees />} />

          {/* HOD Desk Routes */}
          <Route path="/hod-desk/computer" element={<ComHod />} />
          <Route path="/hod-desk/mechanical" element={<MechHod />} />
          <Route path="/hod-desk/extc" element={<ExtcHod />} />
          <Route path="/hod-desk/electrical" element={<ElectricalHod />} />
          <Route path="/hod-desk/it" element={<ItHod />} />
          <Route path="/hod-desk/bsh" element={<BshHod />} />

          {/* Content Approval Routes */}
          <Route path="/content-approval" element={<ApprovalDashboard />} />

          {/* Activity Logs Routes */}
          <Route path="/activity-logs" element={<ActivityLogs />} />

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
