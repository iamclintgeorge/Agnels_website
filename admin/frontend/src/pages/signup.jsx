import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Signup() {
  const navigate = useNavigate();

  // Set initial values with a type declaration
  const [values, setValues] = useState({
    name: "",
    password: "",
    email_id: "",
  });

  // Handle input changes with proper event typing
  const handleInput = () => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value, // Correctly update the state with the input field value
    }));
  };

  // Handle form submission with proper event typing
  const handleSubmit = async () => {
    event.preventDefault();

    try {
      // Make an API call
      const res = await axios.post("http://localhost:3663/signup", values);
      console.log("Hello Signup Response", res);
      navigate("/"); // Navigate to home page after successful signup
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center h-screen bg-green-950">
      <div className="bg-white h-96 w-72">
        <div className="flex flex-1 flex-col">
          <div className="pl-5 pt-7">
            <form onSubmit={handleSubmit}>
              <h1 className="text-2xl font-semibold text-center mr-4 mb-7">SIGN UP</h1>
              
              <input
                className="bg-gray-200 pl-3 py-2 mb-3"
                type="text"
                name="name"
                placeholder="Username"
                value={values.name} // Bind the value from the state
                onChange={handleInput}
              />
              <input
                className="bg-gray-200 pl-3 py-2 mb-3"
                type="password"
                name="password"
                placeholder="Password"
                value={values.password} // Bind the value from the state
                onChange={handleInput}
              />
              <input
                className="bg-gray-200 pl-3 py-2 mb-5"
                type="text"
                name="email_id"
                placeholder="Email ID"
                value={values.email_id} // Bind the value from the state
                onChange={handleInput}
              />
              <button
                className="bg-green-950 text-white px-14 py-2 rounded-sm ml-12 mt-3"
                name="signup"
                type="submit"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
