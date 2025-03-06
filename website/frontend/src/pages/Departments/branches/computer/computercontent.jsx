import React from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Import images
// import img1 from "./images/1.png";
// import img2 from "./images/2.png";
// import img3 from "./images/3.png";
// import img4 from "./images/4.png";
// import img5 from "./images/5.png";
// import img6 from "./images/6.png";
// import img7 from "./images/7.png";
// import img8 from "./images/8.png";
// import img9 from "./images/9.png";
// import img10 from "./images/10.jpg";
// import hodImage from "./images/HOD_image.jpg";

// import ComputerLab from "./images/Computer_lab.jpg";
// import Classroom from "./images/Classrom.jpg";
// import SystemLab from "./images/System_Lab.jpg";
// import ComputingLab from "./images/Computing_Lab.jpg";
// import DatabaseLab from "./images/Database_lab.jpg";
// import NetworkLab from "./images/Network_Lab.jpg";
// import OpenSourceLab from "./images/OpenSourceLab.jpg";
// import OpenSourceLab2 from "./images/OpenSourceLab2.jpg";
// import RDLab from "./images/RD_Lab.jpg";

import interactiveTeaching from "./images/Interactive_teaching.jpg";
import lms from "./images/LMS.jpg";
import groupDiscussion from "./images/GD.jpg";
import selfLearning from "./images/Self_Learning.jpg";
import collaborativeLearning from "./images/Collab_Learn.jpg";
import flippedClassroom from "./images/Flip_Class.jpg";
import projectBasedLearning from "./images/Project_base.jpg";
import liveCaseStudies from "./images/Expert_Lecture.jpg";
import quizzes from "./images/Quiz.jpg";
import expertLectures from "./images/Expert_Lecture.jpg";
import problemBasedLearning from "./images/Problem_SOlve.jpg";

import karanImage from "./images/karan_balkar.jpg";
import rushikeshImage from "./images/rushikesh_shete.jpg";

// Enable autoplay functionality
const AutoplaySlider = withAutoplay(AwesomeSlider);

// Image data with captions
// const images = [
//   { src: img1, caption: "Innovative Learning Environment" },
//   { src: img2, caption: "State-of-the-Art Computer Labs" },
//   { src: img3, caption: "Interactive Teaching Sessions" },
//   { src: img4, caption: "Collaboration with Industry Experts" },
//   { src: img5, caption: "Our Alumni Making a Difference" },
//   { src: img6, caption: "Advanced Research Facilities" },
//   { src: img7, caption: "Hands-on Project-Based Learning" },
//   { src: img8, caption: "National and International Recognition" },
//   { src: img9, caption: "A Vibrant Student Community" },
//   { src: img10, caption: "Join Us and Build the Future" },
// ];

export const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Heading */}
      <h1 className="text-5xl font-bold text-center text-black">About </h1>
      <div className="h-1 w-32  mx-auto my-4"></div>

      {/* Carousel Section with Auto Scroll */}
      <AutoplaySlider
        play={true}
        interval={3000}
        bullets={true}
        organicArrows={true}
        className="rounded-xl shadow-lg overflow-hidden"
      >
        {images.map((item, index) => (
          <div
            key={index}
            className="relative flex justify-center items-center bg-black"
          >
            <img
              src={item.src}
              alt={`Slide ${index + 1}`}
              className="max-w-full max-h-[500px] object-contain"
            />
            <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-md">
              {item.caption}
            </p>
          </div>
        ))}
      </AutoplaySlider>

      {/* Department Description */}
      <div className="mt-10 max-w-4xl mx-auto text-gray-800">
        <p className="text-lg leading-relaxed text-center font-light">
          <span className="text-2xl font-semibold text-blue-900">
            The Department of Computer Engineering
          </span>{" "}
          at Fr. C. Rodrigues Institute of Technology, Vashi, was established in
          1994. The department continuously strives to provide innovative and
          quality education with emerging technologies...
        </p>
      </div>

      {/* Vision & Mission Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-semibold text-blue-900">
          Vision and Mission
        </h2>
        <div className="h-1 bg-blue-900 w-full mt-2 mb-6"></div>

        {/* Vision */}
        <div className="max-w-3xl mx-auto text-left">
          <h3 className="text-2xl font-semibold text-gray-900">Vision</h3>
          <p className="text-lg font-light mt-2">
            To contribute significantly towards industry and research-oriented
            technical education leading to self-sustainable professionals and
            responsible citizens.
          </p>
        </div>

        {/* Mission */}
        <div className="max-w-3xl mx-auto text-left mt-8">
          <h3 className="text-2xl font-semibold text-gray-900">Mission</h3>
          <ul className="list-disc text-lg font-light mt-2 space-y-2 pl-5">
            <li>
              To provide quality and application-oriented education to meet the
              industry requirements.
            </li>
            <li>
              To prepare technically competent, ethical, and socially committed
              professionals with good leadership qualities.
            </li>
            <li>
              To facilitate an opportunity to interact with prominent
              institutes, alumni, and industries to understand emerging trends
              in computer technology.
            </li>
          </ul>
        </div>
      </div>

      {/* PEOs, PSOs, Board of Studies Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-semibold text-blue-900">
          PEOs, PSOs & Board of Studies
        </h2>
        <div className="h-1 bg-blue-900 w-full mt-2 mb-6"></div>

        {/* PEOs */}
        <div className="max-w-3xl mx-auto text-left">
          <h3 className="text-2xl font-semibold text-gray-900">
            Program Educational Objectives (PEO)
          </h3>
          <ul className="list-disc text-lg font-light mt-4 space-y-2 pl-5">
            <li>
              Excel in professional career and higher education in computer
              engineering.
            </li>
            <li>
              Develop software products by adapting to the trends in emerging
              technologies.
            </li>
            <li>
              Exhibit ethical practices, professional conduct, and leadership
              qualities with an innovative mindset.
            </li>
          </ul>
        </div>

        {/* PSOs */}
        <div className="max-w-3xl mx-auto text-left mt-8">
          <h3 className="text-2xl font-semibold text-gray-900">
            Program Specific Outcomes (PSO)
          </h3>
          <ul className="list-disc text-lg font-light mt-4 space-y-2 pl-5">
            <li>
              Comprehend, analyze, and develop solutions in Web Technologies,
              Data Science, Networking, and System Security.
            </li>
            <li>
              Demonstrate programming and system integration skills in various
              domains.
            </li>
            <li>
              Inculcate self-learning and research attitude for excelling in
              continuous personal and professional development.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const Head_of_Department = () => {
  return (
    <div className="container mx-auto px-4 py-10 flex flex-col items-center">
      {/* Unified HOD Box */}
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-4xl border border-gray-300">
        {/* HOD Info */}
        <div className="flex flex-col items-center">
          <img
            src={hodImage}
            alt="Head of Department"
            className="w-48 h-48 shadow-lg object-cover  border border-gray-300"
          />
          <h2 className="text-3xl font-semibold text-blue-900 mt-4">
            Head of Department
          </h2>
          <h3 className="text-xl font-semibold text-gray-700 mt-2">
            Department of Computer Engineering
          </h3>
          <p className="text-lg text-gray-600 mt-1">
            Email:{" "}
            <a
              href="mailto:m.kiruthika@fcrit.ac.in"
              className="text-blue-500 hover:underline"
            >
              m.kiruthika@fcrit.ac.in
            </a>
          </p>
        </div>

        {/* Message from HOD */}
        <div className="mt-10">
          <h2 className="text-3xl font-semibold text-center text-blue-900 ">
            Message from Head of Department
          </h2>
          <div className="h-1 w-full bg-blue-900 mt-2 mb-6"></div>
          <p className="text-lg font-light leading-relaxed text-justify">
            <span className="font-semibold">
              Dear Students and Stakeholders,
            </span>
            <br />
            <br />
            It is with great pleasure that I extend a warm welcome to the
            Computer Engineering Department at Fr. C.R.I.T, Vashi, Navi Mumbai.
            As the Head of the Department, I am delighted to provide you with an
            overview of our esteemed UG degree program, which accommodates an
            intake of 120 students and holds accreditation from the National
            Board of Accreditation (NBA).
            <br />
            <br />
            Our program is designed to immerse students in the dynamic world of
            programming, commencing with foundational concepts and progressively
            advancing towards high-end programming technologies. The overarching
            vision of our department is to deliver a high-quality and
            application-oriented education that equips students with technical
            competence and ethical values, enabling them to contribute to
            society and industry with dedication.
            <br />
            <br />
            Our faculty comprises a team of well-qualified, experienced, and
            motivated individuals who are committed in preparing young minds to
            compete on a global scale. The department takes pride in its
            well-equipped labs and excellent infrastructure, ensuring an
            enriching learning experience for our students.
            <br />
            <br />
            In addition to academic rigor, we actively engage our students in a
            plethora of activities, including seminars, workshops, coding
            competitions, project competitions, and hackathons conducted under
            the aegis of the Computer Society of India (CSI) student chapter. We
            strongly encourage participation in co-curricular and
            extra-curricular activities at the Department, Institute,
            University, and National levels, fostering a holistic educational
            experience.
            <br />
            <br />
            Our commitment to enhancing your academic journey extends beyond the
            classroom. We actively encourage and facilitate internship
            opportunities at esteemed organizations, providing you with
            real-world exposure and practical experience. We believe in
            fostering an environment where learning goes hand-in-hand with
            professional development, preparing you to excel in the
            ever-evolving field of computer engineering.
            <br />
            <br />
            At the heart of our mission is the commitment to the overall growth
            of our students. We endeavour to instil qualities such as research
            acumen, ethical values, teamwork, leadership skills, and critical
            thinking. Our ultimate goal is to mould each student into a
            responsible and proficient citizen capable of serving society with
            distinction.
            <br />
            <br />
            As the Head of the Computer Engineering Department, I extend my best
            wishes to all the students for a rewarding and successful academic
            journey of four years. May this period be transformative, paving the
            way for a future marked by excellence and societal impact.
            <br />
            <br />
            <span className="font-semibold text-gray-900">
              Dr. M. Kiruthika.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export const Faculty_SupportingStaff = () => {
  const teachingStaff = Array(27).fill({
    img: "https://via.placeholder.com/150",
    name: "Faculty Name",
    designation: "Professor",
  });

  const supportingStaff = Array(4).fill({
    img: "https://via.placeholder.com/150",
    name: "Staff Name",
    designation: "Lab Assistant",
  });

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="border border-gray-300 rounded-2xl shadow-lg p-8 bg-white max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-900 text-center">
          Teaching Staff
        </h2>
        <div className="h-1 w-24 bg-blue-900 mx-auto mt-2 mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {teachingStaff.map((faculty, index) => (
            <div key={index} className="text-center">
              <img
                src={faculty.img}
                alt={faculty.name}
                className="w-40 h-40 object-cover rounded-lg shadow-md border border-gray-300"
              />
              <h3 className="text-lg font-semibold mt-2">{faculty.name}</h3>
              <p className="text-gray-600">{faculty.designation}</p>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold text-blue-900 text-center mt-12">
          Supporting Staff
        </h2>
        <div className="h-1 w-24 bg-blue-900 mx-auto mt-2 mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {supportingStaff.map((staff, index) => (
            <div key={index} className="text-center">
              <img
                src={staff.img}
                alt={staff.name}
                className="w-40 h-40 object-cover rounded-lg shadow-md border border-gray-300"
              />
              <h3 className="text-lg font-semibold mt-2">{staff.name}</h3>
              <p className="text-gray-600">{staff.designation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Committees_BoardOfStudy = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="border border-gray-300 rounded-2xl shadow-lg p-8 bg-white max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-900">Board of Study</h2>
        <div className="h-1 w-24 bg-blue-900 mx-auto mt-2 mb-6"></div>
        <a
          href="../../src/assets/Documents/Board_2024.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 inline-block"
        >
          2023-24
        </a>

        <h2 className="text-3xl font-bold text-blue-900 mt-12">
          Committee Year
        </h2>
        <div className="h-1 w-24 bg-blue-900 mx-auto mt-2 mb-6"></div>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a
            href="../../src/assets/Documents/Academic_2024.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 inline-block"
          >
            View Committee 1 PDF
          </a>
          <a
            href="../../src/assets/Documents/Academic_2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 inline-block"
          >
            View Committee 2 PDF
          </a>
        </div>
      </div>
    </div>
  );
};

// const infrastructureData = [
//   {
//     id: 1,
//     name: "Computer Lab",
//     image: ComputerLab,
//     description:
//       "State-of-the-art computer lab with high-speed internet and modern equipment.",
//   },
//   {
//     id: 2,
//     name: "Classroom",
//     image: Classroom,
//     description:
//       "Fully equipped classroom with smart board and audio-visual learning setup.",
//   },
//   {
//     id: 3,
//     name: "System Lab",
//     image: SystemLab,
//     description:
//       "Advanced system lab for hardware experiments and OS simulations.",
//   },
//   {
//     id: 4,
//     name: "Computing Lab",
//     image: ComputingLab,
//     description:
//       "Dedicated computing lab for AI, ML, and software development projects.",
//   },
//   {
//     id: 5,
//     name: "Database Lab",
//     image: DatabaseLab,
//     description:
//       "Fully equipped database lab for SQL, NoSQL, and big data learning.",
//   },
//   {
//     id: 6,
//     name: "Network Lab",
//     image: NetworkLab,
//     description:
//       "State-of-the-art networking lab with real-world router and switch simulations.",
//   },
//   {
//     id: 7,
//     name: "Open Source Lab",
//     image: OpenSourceLab,
//     description:
//       "Lab dedicated to open-source software development and Linux training.",
//   },
//   {
//     id: 8,
//     name: "Open Source Lab 2",
//     image: OpenSourceLab2,
//     description:
//       "Additional open-source lab for collaborative projects and research.",
//   },
//   {
//     id: 9,
//     name: "Research and Development Lab",
//     image: RDLab,
//     description:
//       "R&D lab for innovation and project development in emerging technologies.",
//   },
// ];

export const Infrastructure = () => {
  const [selectedInfra, setSelectedInfra] = useState(null);

  return (
    <div className="container mx-auto px-4 py-10 text-center">
      <h2 className="text-3xl font-bold text-blue-900">Infrastructure</h2>
      <div className="h-1 w-24 bg-blue-900 mx-auto mt-2 mb-6"></div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {infrastructureData.map((infra) => (
          <div key={infra.id} className="flex flex-col items-center">
            <img
              src={infra.image}
              alt={infra.name}
              className="w-60 h-40 object-cover rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => setSelectedInfra(infra)}
            />
            <p className="text-lg font-semibold text-gray-700 mt-2">
              {infra.name}
            </p>
          </div>
        ))}
      </div>

      {/* Pop-up Modal */}
      {selectedInfra && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg text-center relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
              onClick={() => setSelectedInfra(null)}
            >
              &times;
            </button>
            <img
              src={selectedInfra.image}
              alt={selectedInfra.name}
              className="w-full h-60 object-cover rounded-lg"
            />
            <h3 className="text-2xl font-bold text-gray-800 mt-4">
              {selectedInfra.name}
            </h3>
            <p className="text-lg text-gray-600 mt-2">
              {selectedInfra.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export const Activities = () => {
  const activities = [
    {
      name: "Expert Lecture",
      pdf: "../../src/assets/Documents/ExperLecture.pdf",
    },
    {
      name: "Faculty Achievements",
      pdf: "../../src/assets/Documents/Faculty_Achievements.pdf",
    },
    {
      name: "Faculty Activities",
      pdf: "../../src/assets/Documents/Faculty_Activities.pdf",
    },
    {
      name: "Industrial Visits",
      pdf: "../../src/assets/Documents/Industrial_Visit.pdf",
    },
    { name: "Internships", pdf: "../../src/assets/Documents/Internships.pdf" },
    {
      name: "Student Activities",
      pdf: "../../src/assets/Documents/Student_Activities.pdf",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-10 flex justify-center">
      {/* Outer Box for the Activities Section */}
      <div className="border border-gray-300 rounded-2xl shadow-lg p-8 bg-white max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-blue-900 text-center">
          Activities
        </h2>
        <div className="h-1 w-24 bg-blue-900 mx-auto mt-2 mb-6"></div>

        {/* Buttons Section */}
        <div className="flex flex-col gap-4 items-center">
          {activities.map((activity, index) => (
            <a
              key={index}
              href={activity.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-3/4 bg-white border border-gray-300 shadow-md rounded-lg px-6 py-3 text-lg font-semibold text-gray-700 hover:bg-gray-100 transition duration-300 text-center"
            >
              {activity.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Student_Association = () => {
  // Button data with labels and PDF paths
  const buttons = [
    { label: "2024-25 ", pdf: "../../src/assets/Documents/2024_25.pdf" },
    { label: "2023-2024", pdf: "../../src/assets/Documents/2023_24.pdf" },
    { label: "2022-2023", pdf: "../../src/assets/Documents/2022_23.pdf" },
    { label: "2021-2022", pdf: "../../src/assets/Documents/2021_22.pdf" },
    { label: "2020-2021", pdf: "../../src/assets/Documents/2020_21.pdf" },
    { label: "2019-2020", pdf: "../../src/assets/Documents/2019_20.pdf" },
    { label: "2018-2019", pdf: "../../src/assets/Documents/2018_19.pdf" },
  ];

  return (
    <div className="container mx-auto px-4 py-10 bg-white shadow-lg rounded-2xl border border-gray-300">
      <h2 className="text-3xl font-bold text-blue-900 text-center">
        Student Association
      </h2>
      <div className="h-1 w-24 bg-blue-900 mx-auto mt-2 mb-6"></div>

      <div className="flex flex-col gap-4 items-center">
        {buttons.map((btn, index) => (
          <a
            key={index}
            href={btn.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="w-3/4 sm:w-1/2 px-6 py-3 bg-white  text-black font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300 text-center"
          >
            {btn.label}
          </a>
        ))}
      </div>
    </div>
  );
};
export const Magazine = () => {
  const buttons = [
    { label: "2023-2024", pdf: "../../src/assets/Documents/Zephyr23.pdf" },

    { label: "2021-2022", pdf: "../../src/assets/Documents/Zephyr22.pdf" },
    { label: "2020-2021", pdf: "../../src/assets/Documents/Zephyr2021.pdf" },
    { label: "2019-2020", pdf: "../../src/assets/Documents/Zephyr2020.pdf" },
  ];

  return (
    <div className="container mx-auto px-4 py-10 bg-white shadow-lg rounded-2xl border border-gray-300">
      <h2 className="text-3xl font-bold text-blue-900 text-center">Magazine</h2>
      <div className="h-1 w-24 bg-blue-900 mx-auto mt-2 mb-6"></div>

      <div className="flex flex-col gap-4 items-center">
        {buttons.map((btn, index) => (
          <a
            key={index}
            href={btn.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="w-3/4 sm:w-1/2 px-6 py-3 bg-white  text-black font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300 text-center"
          >
            {btn.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export const Syllabus = () => {
  const buttons = [
    { label: "2023-2024", pdf: "../../src/assets/Documents/AC2024-25.pdf" },

    { label: "2021-2022", pdf: "../../src/assets/Documents/SE_TE.pdf.pdf" },
    { label: "2020-2021", pdf: "../../src/assets/Documents/BE.pdf" },
  ];

  return (
    <div className="container mx-auto px-4 py-10 bg-white shadow-lg rounded-2xl border border-gray-300">
      <h2 className="text-3xl font-bold text-blue-900 text-center">Syllabus</h2>
      <div className="h-1 w-24 bg-blue-900 mx-auto mt-2 mb-6"></div>

      <div className="flex flex-col gap-4 items-center">
        {buttons.map((btn, index) => (
          <a
            key={index}
            href={btn.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="w-3/4 sm:w-1/2 px-6 py-3 bg-white  text-black font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300 text-center"
          >
            {btn.label}
          </a>
        ))}
      </div>
    </div>
  );
};

const data = [
  { year: "2023-24", SE: 95, TE: 97, BE: 99 },
  { year: "2022-23", SE: 90, TE: 94, BE: 98 },
  { year: "2021-22", SE: 88, TE: 96, BE: 97 },
];

export const Result_Analysis = () => {
  return (
    <div className="container mx-auto px-6 py-10 bg-white shadow-lg rounded-2xl border border-gray-300">
      <h2 className="text-3xl font-bold text-blue-900 text-center">
        Result Analysis
      </h2>
      <div className="h-1 w-24 bg-blue-900 mx-auto mt-2 mb-6"></div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} barSize={50}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
          <XAxis dataKey="year" tick={{ fill: "#555", fontSize: 14 }} />
          <YAxis tick={{ fill: "#555", fontSize: 14 }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", borderRadius: "10px" }}
          />
          <Legend verticalAlign="bottom" iconType="circle" />
          <Bar dataKey="SE" fill="#42A5F5" radius={[10, 10, 0, 0]} />
          <Bar dataKey="TE" fill="#5C6BC0" radius={[10, 10, 0, 0]} />
          <Bar dataKey="BE" fill="#26A69A" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const Time_Table = () => {
  // Define PDF paths directly in the array
  const semesters = {
    SE: [
      { name: "Sem III", pdf: "../../src/assets/Documents/sem_3.pdf" },
      { name: "Sem IV", pdf: "../../src/assets/Documents/sem_4.pdf" },
    ],
    TE: [
      { name: "Sem V", pdf: "../../src/assets/Documents/sem_5.pdf" },
      { name: "Sem VI", pdf: "../../src/assets/Documents/sem_6.pdf" },
    ],
    BE: [
      { name: "Sem VII", pdf: "../../src/assets/Documents/sem_7.pdf" },
      { name: "Sem VIII", pdf: "../../src/assets/Documents/sem_8.pdf" },
    ],
  };

  return (
    <div className="container mx-auto px-6 py-10 bg-white shadow-lg rounded-2xl border border-gray-300">
      <h2 className="text-3xl font-bold text-blue-900 text-center">
        Timetable
      </h2>
      <div className="h-1 w-24 bg-blue-900 mx-auto mt-2 mb-6"></div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-lg">
          <thead>
            {/* Main Heading Row */}
            <tr className="bg-blue-900 text-white">
              <th
                colSpan="2"
                className="px-6 py-3 text-lg border border-gray-400"
              >
                SE
              </th>
              <th
                colSpan="2"
                className="px-6 py-3 text-lg border border-gray-400"
              >
                TE
              </th>
              <th
                colSpan="2"
                className="px-6 py-3 text-lg border border-gray-400"
              >
                BE
              </th>
            </tr>
            {/* Subheading Row */}
            <tr className="bg-gray-200 text-black">
              {Object.values(semesters)
                .flat()
                .map((sem, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-md border border-gray-400"
                  >
                    {sem.name}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            <tr className="text-center bg-gray-100 hover:bg-gray-200 transition">
              {Object.values(semesters)
                .flat()
                .map((sem, index) => (
                  <td key={index} className="px-6 py-4 border border-gray-400">
                    <a
                      href={sem.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Open PDF
                    </a>
                  </td>
                ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const Achievements = () => {
  // Button data with labels and PDF paths
  const buttons = [
    {
      label: "2023-2024",
      pdf: "../../src/assets/Documents/Achievement2023-24.pdf",
    },
    {
      label: "2022-2023",
      pdf: "../../src/assets/Documents/Achievement2022-23.pdf",
    },
    {
      label: "2021-2022",
      pdf: "../../src/assets/Documents/Achievement2021-22.pdf",
    },
    {
      label: "2020-2021",
      pdf: "../../src/assets/Documents/Achievement2020-21.pdf",
    },

    {
      label: "2018-2019",
      pdf: "../../src/assets/Documents/Achievement2018-19.pdf",
    },
    {
      label: "2017-2018",
      pdf: "../../src/assets/Documents/Achievement2017-18.pdf",
    },
    {
      label: "2015-2016 ",
      pdf: "../../src/assets/Documents/Achievement2015-16.pdf",
    },
    {
      label: "2014-2015 ",
      pdf: "../../src/assets/Documents/Achievement2014-15.pdf",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10 bg-white shadow-lg rounded-2xl border border-gray-300">
      <h2 className="text-3xl font-bold text-blue-900 text-center">
        Achievements
      </h2>
      <div className="h-1 w-24 bg-blue-900 mx-auto mt-2 mb-6"></div>

      <div className="flex flex-col gap-4 items-center">
        {buttons.map((btn, index) => (
          <a
            key={index}
            href={btn.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="w-3/4 sm:w-1/2 px-6 py-3 bg-white  text-black font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300 text-center"
          >
            {btn.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export const Academic_Calendar = () => {
  return (
    <div className="container mx-auto px-6 py-10 bg-white shadow-lg rounded-2xl border border-gray-300">
      <h2 className="text-3xl font-bold text-blue-900 text-center">
        Academic Calendar
      </h2>
      <div className="h-1 w-24 bg-blue-900 mx-auto mt-2 mb-6"></div>

      {/* Embedded PDF */}
      <div className="flex justify-center">
        <iframe
          src="../../src/assets/Documents/Academic_Calendar.pdf" // Update the path accordingly
          className="w-full h-[700px] border border-gray-300 shadow-md rounded-lg"
        ></iframe>
      </div>
    </div>
  );
};

export const Innovative_Teaching = () => {
  return (
    <div className="container mx-auto px-6 py-10 bg-white shadow-lg rounded-2xl border border-gray-300">
      <h2 className="text-3xl font-bold text-blue-900 text-center">
        Innovative Teaching Methods Used by Faculty
      </h2>
      <div className="h-1 w-24 bg-blue-900 mx-auto mt-2 mb-6"></div>

      <div className="space-y-8 text-lg text-gray-800">
        <div className="flex items-center gap-6">
          <img
            src={interactiveTeaching}
            alt="Interactive Teaching"
            className="w-32 h-32 rounded-lg shadow-md"
          />
          <div>
            <h3 className="text-2xl font-semibold text-blue-800">
              Interactive Teaching
            </h3>
            <ul className="list-disc ml-6">
              <li>
                All faculty members use ICT classrooms for content delivery.
              </li>
              <li>
                Students are encouraged to interact and clarify doubts during
                lectures.
              </li>
              <li>80% of faculty members use smart boards for lectures.</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <img src={lms} alt="LMS" className="w-32 h-32 rounded-lg shadow-md" />
          <div>
            <h3 className="text-2xl font-semibold text-blue-800">
              Smart Classroom & Learning Management System (LMS)
            </h3>
            <p>
              70% of faculty members use LMS for teaching, providing lecture
              PPTs, reading material, question banks, discussion forums,
              quizzes, assignments, and university question papers online.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <img
            src={groupDiscussion}
            alt="Group Discussion"
            className="w-32 h-32 rounded-lg shadow-md"
          />
          <div>
            <h3 className="text-2xl font-semibold text-blue-800">
              Group Discussion
            </h3>
            <p>
              Group discussions help students emphasize learning and sharing.
              Differences in opinions are explicitly discussed. 50% of faculty
              members use this method to promote open discussions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <img
            src={selfLearning}
            alt="Self Learning"
            className="w-32 h-32 rounded-lg shadow-md"
          />
          <div>
            <h3 className="text-2xl font-semibold text-blue-800">
              Encouragement of Self-Learning
            </h3>
            <ul className="list-disc ml-6">
              <li>Home Assignments</li>
              <li>Case Studies</li>
              <li>Major and Mini Project Works</li>
              <li>Web-Based Learning</li>
              <li>Expert Lectures</li>
              <li>Student-Driven Seminars</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <img
            src={collaborativeLearning}
            alt="Collaborative Learning"
            className="w-32 h-32 rounded-lg shadow-md"
          />
          <div>
            <h3 className="text-2xl font-semibold text-blue-800">
              Collaborative Learning
            </h3>
            <ul className="list-disc ml-6">
              <li>
                Groups of learners work together to solve problems, complete
                tasks, or create projects.
              </li>
              <li>
                Faculty and students develop need-based projects for the
                institute.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <img
            src={flippedClassroom}
            alt="Flipped Classroom"
            className="w-32 h-32 rounded-lg shadow-md"
          />
          <div>
            <h3 className="text-2xl font-semibold text-blue-800">
              Flipped Classroom
            </h3>
            <ul className="list-disc ml-6">
              <li>
                A blended learning strategy that improves student engagement.
              </li>
              <li>
                Students prepare before class and engage in interactive
                activities.
              </li>
              <li>
                80% of faculty conduct one or two lectures using this method.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <img
            src={projectBasedLearning}
            alt="Project Based Learning"
            className="w-32 h-32 rounded-lg shadow-md"
          />
          <div>
            <h3 className="text-2xl font-semibold text-blue-800">
              Project-Based Learning
            </h3>
            <p>
              Students develop and complete mini-projects during summer
              vacations, showcasing them in the next semester. This improves
              teamwork, communication, and ethical standards.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <img
            src={liveCaseStudies}
            alt="Live Case Studies"
            className="w-32 h-32 rounded-lg shadow-md"
          />
          <div>
            <h3 className="text-2xl font-semibold text-blue-800">
              Live Case Studies
            </h3>
            <ul className="list-disc ml-6">
              <li>
                Live case studies are discussed for a better understanding of
                industry trends.
              </li>
              <li>
                Industry experts are invited to discuss real-world cases with
                students.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <img
            src={quizzes}
            alt="Quizzes"
            className="w-32 h-32 rounded-lg shadow-md"
          />
          <div>
            <h3 className="text-2xl font-semibold text-blue-800">Quizzes</h3>
            <ul className="list-disc ml-6">
              <li>
                Conducted in classrooms to help students understand topics
                in-depth.
              </li>
              <li>
                Quizzes are also conducted through LMS by faculty members.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <img
            src={expertLectures}
            alt="Expert Lectures"
            className="w-32 h-32 rounded-lg shadow-md"
          />
          <div>
            <h3 className="text-2xl font-semibold text-blue-800">
              Expert Lectures
            </h3>
            <p>
              Guest and expert lectures are conducted to bridge the gap between
              syllabus and recent trends in engineering and technology.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <img
            src={problemBasedLearning}
            alt="Problem-Based Learning"
            className="w-32 h-32 rounded-lg shadow-md"
          />
          <div>
            <h3 className="text-2xl font-semibold text-blue-800">
              Problem-Based Learning
            </h3>
            <ul className="list-disc ml-6">
              <li>
                Focuses on investigation-driven questions, hands-on learning,
                and student presentations.
              </li>
              <li>
                Teachers guide students through critical thinking and
                problem-solving.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Alumni_Testimonials = () => {
  return (
    <div className="container mx-auto px-6 py-10 bg-white shadow-lg rounded-2xl border border-gray-300">
      <h2 className="text-3xl font-bold text-blue-900 text-center">
        Alumni Testimonials
      </h2>
      <div className="h-1 w-24 bg-blue-900 mx-auto mt-2 mb-6"></div>

      <div className="space-y-8 text-lg text-gray-800">
        {/* Testimonial 1 */}
        <div className="p-6 border border-gray-300 rounded-lg shadow-md bg-gray-100">
          <div className="flex items-center gap-6">
            <img
              src={karanImage}
              alt="Karan Balkar"
              className="w-32 h-32 rounded-lg shadow-md"
            />
            <div>
              <h3 className="text-2xl font-semibold text-blue-800">
                Mr. Karan Balkar
              </h3>
              <p className="text-gray-700">
                Year of passing: <strong>2012</strong>
              </p>
              <p className="text-gray-700">
                Company: <strong>Larsen & Toubro Infotech Limited</strong>
              </p>
              <p className="text-gray-700">
                Designation: <strong>Team Lead</strong>
              </p>
            </div>
          </div>
          <p className="mt-4 text-gray-700">
            Fr. C. Rodrigues Institute of Technology, Vashi is much beyond just
            an "Institution", it is an epitome of excellence and overall
            personality development. It has always helped provide a platform
            from where you can launch your dreams. I have lived the best four
            years of my life in this Institute. The incredible support and
            motivation of all the faculty members from the Department of
            Computer Engineering helped me to grow both personally and
            professionally and I am thankful to each one of them. As I look
            back, there have been many moments, good and bad, but at the end of
            the day, each one was a great learning experience.
          </p>
        </div>

        {/* Testimonial 2 */}
        <div className="p-6 border border-gray-300 rounded-lg shadow-md bg-gray-100">
          <div className="flex items-center gap-6">
            <img
              src={rushikeshImage}
              alt="Rushikesh Shete"
              className="w-32 h-32 rounded-lg shadow-md"
            />
            <div>
              <h3 className="text-2xl font-semibold text-blue-800">
                Mr. Rushikesh Shete
              </h3>
              <p className="text-gray-700">
                Year of passing: <strong>2015</strong>
              </p>
              <p className="text-gray-700">
                Company: <strong>VMware Software India Pvt Ltd.</strong>
              </p>
              <p className="text-gray-700">
                Designation: <strong>Member of Technical Staff-3</strong>
              </p>
            </div>
          </div>
          <p className="mt-4 text-gray-700">
            "Education is the passport to the future, for tomorrow belongs to
            those who prepare for it today" - Malcolm X. Fr. C. Rodrigues
            Institute of Technology, Vashi, and especially the Department of
            Computer Engineering gave me the correct education which has turned
            me into a professional that I am today. Those regular assignments
            and exams used to feel like a burden then, but what I didn't know
            was that I was getting prepared for more intense corporate targets.
            That strict morning in-time prepared me to be on time in my office.
            Teachers encouraged us to publish technical papers which now helps
            me to publish ideas in company technical events. Not only technical
            area, but they also encouraged us to explore different career
            options which have given me the courage to experiment in my other
            areas of interest. Lastly, I never thought that my name would be
            published in a newspaper, but it happened as I got a rank in Mumbai
            University and that piece of article will always be cherished for a
            lifetime by me and my family. I could achieve it all because of the
            help and support of my teachers.
          </p>
        </div>
      </div>
    </div>
  );
};

export const Publications = () => {
  const buttons = [
    {
      label: "Student Publications",
      pdf: "../../src/assets/Documents/Student_Publications.pdf",
    },

    {
      label: "Faculty Publications Conference",
      pdf: "../../src/assets/Documents/Faculty_Publications_C.pdf",
    },
    {
      label: "Faculty Publications Journal",
      pdf: "../../src/assets/Documents/Faculty_Publications_J.pdf",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10 bg-white shadow-lg rounded-2xl border border-gray-300">
      <h2 className="text-3xl font-bold text-blue-900 text-center">Syllabus</h2>
      <div className="h-1 w-24 bg-blue-900 mx-auto mt-2 mb-6"></div>

      <div className="flex flex-col gap-4 items-center">
        {buttons.map((btn, index) => (
          <a
            key={index}
            href={btn.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="w-3/4 sm:w-1/2 px-6 py-3 bg-white  text-black font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300 text-center"
          >
            {btn.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export const Projects = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="border border-gray-300 rounded-2xl shadow-lg p-8 bg-white max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-900">Projects</h2>
        <div className="h-1 w-24 bg-blue-900 mx-auto mt-2 mb-6"></div>
        <h2 className="text-3xl font-bold text-left text-blue-900">
          Undergraduate Projects(BE)
        </h2>
        <div className="h-1 w-24  mx-auto mt-2 mb-6"></div>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a
            href="../../src/assets/Documents/BE_COMP_24_25"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 inline-block"
          >
            2024-25
          </a>
          <a
            href="../../src/assets/Documents/BE_COMP_2023_24"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 inline-block"
          >
            2023-24
          </a>
          <a
            href="../../src/assets/Documents/BE_COMP_2022_23"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 inline-block"
          >
            2022-23
          </a>
          <a
            href="../../src/assets/Documents/BE_COMP_2021_22"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 inline-block"
          >
            2021-22
          </a>
        </div>
        <h2 className="text-3xl font-bold text-left text-blue-900 mt-12">
          Mini Project(TE)
        </h2>
        <div className="h-1 w-24  mx-auto mt-2 mb-6"></div>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a
            href="../../src/assets/Documents/TE_COMP_24_25.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 inline-block"
          >
            2024-25
          </a>
          <a
            href="../../src/assets/Documents/TE_COMP_2023_24.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 inline-block"
          >
            2023-24
          </a>
          <a
            href="../../src/assets/Documents/TE_COMP_2022_23.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 inline-block"
          >
            2022-23
          </a>
          <a
            href="../../src/assets/Documents/TE Miniproject_Comp_2021-22.pdf.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 inline-block"
          >
            2021-22
          </a>
        </div>

        <h2 className="text-3xl text -left font-bold text-blue-900 mt-12">
          Mini Projects(SE)
        </h2>
        <div className="h-1 w-24  mx-auto mt-2 mb-6"></div>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a
            href="../../src/assets/Documents/SE_COMP_24_25.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 inline-block"
          >
            2024-25
          </a>
          <a
            href="../../src/assets/Documents/SE_COMP_2023_24.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 inline-block"
          >
            2023-24
          </a>
          <a
            href="../../src/assets/Documents/SE_COMP_2022_23.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 inline-block"
          >
            2022-23
          </a>
          <a
            href="../../src/assets/Documents/SE_COMP_2021_22.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 inline-block"
          >
            2021-22
          </a>
        </div>
      </div>
    </div>
  );
};
