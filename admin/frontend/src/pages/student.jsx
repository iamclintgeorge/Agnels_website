import React, { useEffect, useState } from "react";
import axios from "axios";

const Student = () => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchText();
  }, []);

  const fetchText = async () => {
    try {
      const response = await axios.get("http://localhost:3663/api/student", {
        withCredentials: true,
      });
      console.log("Fetched Text:", response.data);
      setMessage(response.data);
    } catch (err) {
      console.error("Error loading text:", err);

      if (err.response) {
        if (err.response.status === 401) {
          setMessage({ content: "You are not authenticated. Please log in." });
        } else if (err.response.status === 403) {
          setMessage({
            content:
              "Access denied. You do not have permission to view this page.",
          });
        } else {
          setMessage({ content: "An error occurred. Please try again later." });
        }
      } else {
        setMessage({ content: "Network error. Please check your connection." });
      }
    }
  };

  return (
    <div>
      {/* {loading && <p>Loading...</p>} */}
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      {message && <p>{message.content}</p>}
    </div>
  );
};

export default Student;
