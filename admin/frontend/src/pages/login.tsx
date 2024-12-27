import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define the shape of the form state
interface LoginValues {
  email_id: string;
  password: string;
}

function Login() {
  const [values, setValues] = useState<LoginValues>({
    email_id: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(true);

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  // Handle form input changes
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await axios.post("http://localhost:3663/login", values);
      if (res.data.Login) {
        console.log("Login successful:", res.data.Login);
        navigate("/"); 
      } else {
        alert("You need to Sign up");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Check if user is already logged in when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((res) => {
        if (res.data.valid) {
          navigate("/");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); 
      });
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="flex flex-row justify-center items-center h-screen bg-green-950">
      <div className="bg-white h-96 w-72">
        <div className="flex flex-1 flex-col">
          <div className="pl-5 pt-7">
            <form onSubmit={handleSubmit}>
              <h1 className="text-2xl font-semibold text-center mr-4 mb-7">LOGIN</h1>
              <input
                className="bg-gray-200 pl-3 py-2 mb-3"
                type="text"
                name="email_id"
                placeholder="Email ID"
                value={values.email_id} // Controlled input
                onChange={handleInput}
              />
              <input
                className="bg-gray-200 pl-3 py-2 mb-3"
                type="password"
                name="password"
                placeholder="Password"
                value={values.password} // Controlled input
                onChange={handleInput}
              />
              <button
                type="submit"
                className="bg-green-950 text-white px-14 py-2 rounded-sm ml-12 mt-3"
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
