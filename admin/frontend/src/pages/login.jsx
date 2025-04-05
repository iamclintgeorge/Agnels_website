import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// Configure axios for this component
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3663';

function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("123");
  const [emailId, setEmail] = useState("dfg@dfg.com");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState({});

  // Handle direct login
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    setDebugInfo({ message: "Attempting login..." });

    try {
      // Try direct API call instead of using context
      const response = await axios.post('/api/login', 
        { emailId, password },
        { 
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      setDebugInfo({
        success: true,
        responseData: response.data,
        cookies: document.cookie
      });

      if (response.data.user) {
        console.log("Login successful, redirecting to dashboard");
        // Force immediate redirect - no delay
        navigate("/");
      } else {
        setError("Login succeeded but no user data returned");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setDebugInfo({
        success: false,
        error: err.response?.data || err.message,
        status: err.response?.status
      });
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to check authentication status
  const checkAuth = async () => {
    try {
      const response = await axios.get('/api/check-auth');
      setDebugInfo({
        authCheck: true,
        authData: response.data,
        cookies: document.cookie
      });
      if (response.data.user) {
        navigate("/");
      }
    } catch (err) {
      setDebugInfo({
        authCheck: false,
        error: err.response?.data || err.message
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#0C2340]">
      <div className="bg-white p-8 rounded-md w-96">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold text-center mb-6">
            Login
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
              placeholder="Email ID"
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
          
          <button
            className="mt-4 border border-gray-300 text-gray-700 py-2 rounded w-full hover:bg-gray-100 transition-colors"
            type="button"
            onClick={checkAuth}
            disabled={loading}
          >
            Check Auth Status
          </button>
        </form>
        
        {Object.keys(debugInfo).length > 0 && (
          <div className="mt-6 p-4 bg-gray-100 rounded text-xs">
            <h3 className="font-bold mb-2">Debug Info:</h3>
            <pre className="whitespace-pre-wrap break-all">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
