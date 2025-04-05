import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../services/useAuthCheck";

// Configure axios
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3663';

function Dashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, message } = useAuth();
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      navigate("/login");
    } catch (err) {
      console.error('Logout failed:', err);
      setError("Logout failed: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 p-8 rounded-lg text-center">
          <div className="text-red-600 text-xl mb-4">{message || "You need to login first"}</div>
          <div>Redirecting to login page...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 p-8 rounded-lg text-center">
          <div className="text-red-600 text-xl mb-4">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#0C2340] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          {user && (
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                Welcome, <span className="font-semibold">{user.userName}</span> ({user.role})
              </div>
              <button 
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
      
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Home Page Settings</h2>
            <p className="text-gray-600 mb-4">Manage content for the home page</p>
            <button 
              onClick={() => navigate("/home-page")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Manage
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">About Us</h2>
            <p className="text-gray-600 mb-4">Manage content for the About Us page</p>
            <button 
              onClick={() => navigate("/about-us")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Manage
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Training & Placement</h2>
            <p className="text-gray-600 mb-4">Manage training and placement content</p>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Manage
            </button>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
            <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
              {JSON.stringify({ user, cookies: document.cookie, isAuthenticated }, null, 2)}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard; 