import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [emailId, setEmail] = useState("");

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      emailId,
      password,
    };

    try {
      const res = await axios.post(
        "http://localhost:3663/api/login",
        userData,
        {
          withCredentials: true,
        }
      );
      console.log("Login successful");
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center h-screen bg-[#0C2340]">
      <div className="bg-white h-96 w-80 rounded-md">
        <div className="flex flex-1 flex-col">
          <div className="pl-7 pt-10">
            <form onSubmit={handleSubmit}>
              <h1 className="text-2xl font-semibold text-center mr-5 mb-14">
                Login
              </h1>
              <input
                className="bg-gray-200 pl-3 py-2 mb-5"
                type="email"
                name="email"
                placeholder="Email ID"
                value={emailId}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="bg-gray-200 pl-3 py-2 mb-3"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className="bg-[#0C2340] text-white px-28 py-2 rounded-[4px] mt-8"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
