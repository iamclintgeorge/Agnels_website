import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// Configure axios for this component
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3663';

function StudentLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [emailId, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle student login
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Student-specific login endpoint
      const response = await axios.post('/api/student/login', 
        { emailId, password },
        { 
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      if (response.data.user) {
        console.log("Student login successful, redirecting to dashboard");
        navigate("/");
      } else {
        setError("Login succeeded but no user data returned");
      }
    } catch (err) {
      console.error("Student login failed:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#0C2340]">
      <div className="bg-white p-8 rounded-md w-96">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold text-center mb-6">
            Student Login
          </h1>
          
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center p-2 bg-red-50 rounded">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              className="bg-gray-200 p-3 w-full rounded"
              type="email"
              placeholder="Student Email ID"
              value={emailId}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              className="bg-gray-200 p-3 w-full rounded"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            className="bg-[#0C2340] text-white py-3 rounded w-full hover:bg-[#183456] transition-colors disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Student portal access only.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin; 