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
  "Information Management System (IMS)",
];

const links = [
  "https://sp.fcrit.ac.in/studentportal/index.php",
  "https://fcs.fcrit.ac.in/",
  "https://copo.fcrit.ac.in/",
  "https://apms.fcrit.ac.in/apms/index.php",
  "http://lms.fcrit.ac.in/moodle/",
  "https://placement.fcrit.ac.in/",
  "https://www.office.com/",
  "https://library.fcrit.ac.in/",
  "http://122.200.18.89:8080/login",
  "https://ims.fcrit.ac.in/",
];

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-20 w-full max-w-6xl">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-100 border border-black shadow-md p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg h-72 flex flex-col items-start"
          >
            <h2 className="text-lg font-medium text-black text-left font-inter">
              {service}
            </h2>
            <a
              href={links[index]}
              rel="noopener noreferrer"
              className="bg-black text-white py-2 px-12 shadow-md transition w-full hover:bg-white hover:text-black border border-black mt-auto text-center"
            >
              Login
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Login;
