import React from "react";

const services = [
  "Student Portal",
  "FCRIT Campus Service",
  "APMS 2.0",
  "Academic Performance Monitoring System",
  "Learning Management System",
  "Placement Cell",
  "Web Email",
  "Library",
  "Exam Cell",
  "Information Management System (IMS)"
];

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 w-full max-w-6xl">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-black/20 shadow-md p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-lg h-[250px] flex flex-col items-start"
          >
            <h2 className="text-xl font-semibold text-black text-left">{service}</h2>
            <button className="bg-black text-white py-2 px-12 shadow-md transition w-full hover:bg-white hover:text-black border border-black mt-auto">
              Login
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Login;
