import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Pages
import HomePage from './pages/homePage';
import Login from './pages/login';
import Signup from './pages/signup';
import Error404 from './pages/error404';

// Main App Component
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Error404 />} /> 
      </Routes>
    </Router>
  );
};

// Render App to DOM
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
