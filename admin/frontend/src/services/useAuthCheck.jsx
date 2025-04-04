import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3663';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking authentication...");
        
        const response = await axios.get("/api/check-auth");
        
        console.log("Auth response:", response.data);
        
        if (response.data.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
          console.log("User authenticated:", response.data.user);
        } else {
          // Only navigate if we're not already on the login page
          if (window.location.pathname !== "/login") {
            console.log("No user in response, redirecting to login");
            navigate("/login");
          }
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
        
        if (error.response) {
          setMessage(
            error.response.data.message || "You are not authenticated."
          );
          // Only navigate if we're not already on the login page
          if (
            error.response.status === 401 &&
            window.location.pathname !== "/login"
          ) {
            console.log("Unauthorized, redirecting to login");
            navigate("/login");
          }
        } else {
          setMessage("Failed to check authentication due to network issue.");
        }
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Add a loading indicator
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, message }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
