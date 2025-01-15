import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3663/api/check-auth";

const useAuthCheck = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(API_URL, {
          withCredentials: true,
        });

        if (response.data.authenticated) {
          setIsAuthenticated(true);
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching data:", error);

        if (error.response) {
          setMessage(
            error.response.data.message || "You are not authenticated."
          );

          if (error.response.status === 401) {
            navigate("/login");
          }
        } else {
          setMessage("Failed to load message due to network issue.");
        }

        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  return { loading, message, isAuthenticated, user };
};

export default useAuthCheck;
