import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Error404 from "./pages/error404";
import AdminLayout from "./layout/adminLayout";
import Student from "./pages/student";
import { AuthProvider } from "./services/useAuthCheck";
import WhatsNew from "./pages/whatsNew";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<AdminLayout />}>
        {/* <Route path="/home" element={<HomePage />} /> */}
        <Route path="/home/carousel" element={<HomePage />} />
        <Route path="/student" element={<Student />} />
        <Route path="/whatsNew" element={<WhatsNew />} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
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
