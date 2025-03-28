import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [userName, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailId, setEmail] = useState("");
  const [role, setRole] = useState("");

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      emailId,
      userName,
      password,
      role,
    };

    try {
      const res = await axios.post(
        "http://localhost:3663/api/signup",
        userData,
        {
          withCredentials: true,
        }
      );
      console.log("Hello Signup Response");
      console.log(res);
      navigate("/");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center h-screen bg-[#0C2340]">
      <div className="bg-white h-auto w-[24.25vw] rounded-md">
        <div className="flex flex-1 flex-col">
          <div className="pl-7 pt-10">
            <form onSubmit={handleSubmit}>
              <h1 className="text-2xl font-semibold text-center mr-5 mb-14">
                CREATE USER
              </h1>

              <input
                className="bg-gray-200 pl-3 py-2 mb-3"
                type="text"
                name="name"
                placeholder="Username"
                value={userName}
                required
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="bg-gray-200 pl-3 py-2 mb-3"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="bg-gray-200 pl-3 py-2 mb-3"
                type="email"
                name="email"
                placeholder="Email ID"
                value={emailId}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <select
                className="bg-gray-200 pl-3 pr-[7vw] py-2 mb-5"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="" disabled>
                  Select a role
                </option>
                <option value="superAdmin">Super Admin</option>
                <option value="hod">HOD</option>
                <option value="compHod">HOD (Computer)</option>
                <option value="mechHod">HOD (Mechanical)</option>
                <option value="extcHod">HOD (EXTC)</option>
                <option value="electricalHod">HOD (Electrical)</option>
                <option value="itHod">HOD (IT)</option>
                <option value="bshHod">HOD (BSH)</option>
                <option value="teach_staff">Teaching Staff</option>
                <option value="non_teach_staff">Non-Teaching Staff</option>
                <option value="principal">Principal</option>
              </select>

              <button
                className="bg-[#0C2340] text-white px-[6.7vw] py-2 rounded-[4px] mt-2 mb-14 flex-nowrap"
                type="submit"
              >
                Create User
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
