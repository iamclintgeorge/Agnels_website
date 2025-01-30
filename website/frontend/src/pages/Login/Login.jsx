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
            className="bg-white border border-black/20 shadow-md p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-lg h-[250px] flex flex-col items-start justify-between"
          >
            <h2 className="text-xl font-bold text-black text-left">{service}</h2>
            <button className="bg-black text-white py-2 px-12 shadow-md hover:bg-gray-700 transition mt-12 w-full">
              Login
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Login;
