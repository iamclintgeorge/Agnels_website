import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Error404 from "./pages/Error_Pages/error404";
import Error403 from "./pages/Error_Pages/error403";
import AdminLayout from "./layout/adminLayout";
import { AuthProvider } from "./services/useAuthCheck";
import PrivateRoute from "./services/privateRoute";
import WhatsNew from "./pages/HomePage/whatsNew";
import Profile from "./pages/profile";
import ImgCarousel from "./pages/HomePage/imgCarousel";
import IntroText from "./pages/HomePage/introText";
import ImgModal from "./pages/HomePage/home_Modal";
import DeptHome from "./pages/Department/dept_home";
import TrainingPlacement from "./pages/Training-Placement/training-placement";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrincipalDesk from "./pages/Principal's Desk/principalDesk";
import AboutUsManager from "./pages/AboutUsManager/AboutUsManager";
import ResearchAdmin from "./pages/research/ResearchAdmin";
import AdminNIRF from "./pages/AdminNIRF";
import AdminNBANAAC from "./pages/AdminNBANAAC";
import AcademicAdmin from "./pages/Academics/AcademicAdmin";
import AcademicHandbook from "./pages/Academics/AcademicHandbook";
import Teaching_staff from "./pages/HumanResources/teachingstaff";
import Nonteaching_staff from "./pages/HumanResources/nonteachingstaff";
import StudentsCorner from "./pages/StudentsCorner/StudentsCorner";
import RolePermissionManager from "./pages/rolePermission";
import ManageFacultyStaff from "./pages/manageFacultyStaff";

// IIC
import Iic_ambassador from "./pages/IIC/iic_ambassador";
import Iic_council from "./pages/IIC/iic_council";
import Iic_innovation from "./pages/IIC/iic_innovation";
import Iic_policy from "./pages/IIC/iic_policy";

// New Department Dynamic Render: Delete the comment lateron
import DeptAbout from "./pages/Department/sections/Dept_about";
import DeptCarousel from "./pages/Department/sections/Dept_carousel";
import DeptActivities from "./pages/Department/sections/Dept_activities";
import DeptAssociation from "./pages/Department/sections/Dept_association";
import DeptMagazine from "./pages/Department/sections/Dept_magazine";
import DeptTimetable from "./pages/Department/sections/Dept_timetable";
import DeptAchievements from "./pages/Department/sections/Dept_achievements";
import DeptInnovativeteaching from "./pages/Department/sections/Dept_innovative_teaching";
import DeptAcademicCalendar from "./pages/Department/sections/Dept_academic_calendar";
import DeptPublications from "./pages/Department/sections/Dept_publications";
import DeptProjects from "./pages/Department/sections/Dept_projects";
import DeptCommittees from "./pages/Department/sections/Dept_committees";
import DeptInfrastructure from "./pages/Department/sections/Dept_infra";
import DeptSyllabus from "./pages/Department/sections/Dept_syllabus";

// HOD Desk Components
import ComHod from "./pages/hodDesk/comHod";
import MechHod from "./pages/hodDesk/mechHod";
import ExtcHod from "./pages/hodDesk/extcHod";
import BshHod from "./pages/hodDesk/bshHod";
import ItHod from "./pages/hodDesk/itHod";
import ElectricalHod from "./pages/hodDesk/electricalHod";

// Content Approval Components
import ApprovalDashboard from "./pages/ContentApproval/ApprovalDashboard";
import RoleHierarchy from "./pages/ContentApproval/roleHierarchy";

// Activity Logs Components
import ActivityLogs from "./pages/AuditLogs/ActivityLogs";
import AchievementManager from "./pages/HomePage/AchievementManager";
import AdmissionManager from "./pages/HomePage/AdmissionManager";
import CircularManager from "./pages/HomePage/CircularManager";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<AdminLayout />}>
          <Route path="/home/carousel" element={<ImgCarousel />} />
          <Route path="/home/whatsNew" element={<WhatsNew />} />
          <Route
            path="/home/AchievementManager"
            element={<AchievementManager />}
          />
          <Route path="/home/AdmissionManager" element={<AdmissionManager />} />
          <Route path="/home/CircularManager" element={<CircularManager />} />
          <Route path="/home/introtext" element={<IntroText />} />
          <Route path="/home/modal" element={<ImgModal />} />
          <Route path="/department/home" element={<DeptHome />} />
          <Route path="/academic/handbook" element={<AcademicHandbook />} />
          <Route path="/academics" element={<AcademicAdmin />} />
          <Route path="/studentscorner" element={<StudentsCorner />} />
          <Route path="/roleHierarchy" element={<RoleHierarchy />} />
          <Route path="/ManageFacultyStaff" element={<ManageFacultyStaff />} />
          {/* IIC Routes */}
          <Route path="/iic-innovation-council" element={<Iic_council />} />
          <Route path="/iic-innovation-policy" element={<Iic_policy />} />
          <Route
            path="/iic-innovation-ambassador"
            element={<Iic_ambassador />}
          />
          <Route path="/iic-innovation-centre" element={<Iic_innovation />} />
          {/* Department Home Routes */}
          <Route
            path="/department/:departmentName/home"
            element={<DeptAbout />}
          />
          <Route
            path="/department/:departmentName/carousel"
            element={<DeptCarousel />}
          />
          <Route
            path="/department/:departmentName/activities"
            element={<DeptActivities />}
          />
          <Route
            path="/department/:departmentName/student-association"
            element={<DeptAssociation />}
          />
          <Route
            path="/department/:departmentName/magazine"
            element={<DeptMagazine />}
          />
          <Route
            path="/department/:departmentName/time-table"
            element={<DeptTimetable />}
          />
          <Route
            path="/department/:departmentName/achievements"
            element={<DeptAchievements />}
          />
          <Route
            path="/department/:departmentName/innovative-teaching-and-learning-methods"
            element={<DeptInnovativeteaching />}
          />
          <Route
            path="/department/:departmentName/academic-calendar"
            element={<DeptAcademicCalendar />}
          />
          <Route
            path="/department/:departmentName/publications"
            element={<DeptPublications />}
          />
          <Route
            path="/department/:departmentName/projects"
            element={<DeptProjects />}
          />
          <Route
            path="/department/:departmentName/committees-and-board-of-studies"
            element={<DeptCommittees />}
          />
          <Route
            path="/department/:departmentName/infrastructure"
            element={<DeptInfrastructure />}
          />
          <Route
            path="/department/:departmentName/syllabus"
            element={<DeptSyllabus />}
          />

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
          <Route path="/training-placement" element={<TrainingPlacement />} />
          {/* <Route path="/principaldesk" element={<PrincipalDesk />} /> */}
          <Route
            path="/principaldesk"
            element={
              <PrivateRoute permission="principal_desk">
                <PrincipalDesk />
              </PrivateRoute>
            }
          />
          <Route path="/about-us" element={<AboutUsManager />} />
          <Route path="/research/:section" element={<ResearchAdmin />} />
          <Route path="/research" element={<ResearchAdmin />} />
          <Route path="/admin/nirf" element={<AdminNIRF />} />
          <Route path="/admin/nba-naac" element={<AdminNBANAAC />} />
          <Route path="/teachingstaff" element={<Teaching_staff />} />
          <Route path="/nonteachingstaff" element={<Nonteaching_staff />} />
          <Route
            path="/rolePermissionManager"
            element={<RolePermissionManager />}
          />
        </Route>
        <Route path="*" element={<Error404 />} />
        <Route path="/error403" element={<Error403 />} />
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
