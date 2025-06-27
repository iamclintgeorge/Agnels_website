import React from "react";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaClipboardCheck,
  FaEye,
  FaCheckCircle,
  FaUniversity,
  FaBookOpen,
  FaFilePdf,
  FaDownload,
  FaExternalLinkAlt,
} from "react-icons/fa";

export const Homee = () => {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      {/* Header Section: Vision & Leadership */}
      <section className="intro py-20 text-black">
        <div className="container mx-auto text-center px-6">
          <h1 className="text-5xl font-extrabold mb-6">
            Welcome to Academics at Fr.CRIT
          </h1>
          <p className="text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            One of the leading Engineering Institutions in Navi Mumbai, known
            for visionary management, stable leadership, and a dedicated faculty
            upholding high academic standards.
          </p>
          <div className="relative mb-8"></div>
        </div>
      </section>

      {/* Mission Statement & Teaching Philosophy */}
      <section className="mission py-16 bg-white">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-semibold text-blue-900 mb-6 flex justify-center items-center">
            <FaChalkboardTeacher className="mr-3 text-blue-700" /> Our Teaching
            Philosophy
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-700 leading-relaxed">
            At Fr.CRIT, we nurture academic growth through innovative teaching
            methods like flipped classrooms, project-based learning, and
            continuous evaluations.
          </p>
        </div>
      </section>

      {/* Academic Administration Section */}
      <section className="admin py-20 bg-gray-100">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-semibold text-blue-900 mb-8 flex justify-center items-center">
            <FaUsers className="mr-3 text-blue-700" /> Academic Administration
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <AdminCard
              title="Course Coordinators"
              description="Plan courses, apply innovative teaching methods, and track student progress."
              icon={
                <FaChalkboardTeacher className="text-blue-700 text-4xl mb-3" />
              }
            />
            <AdminCard
              title="Class Coordinators"
              description="Monitor attendance and performance while ensuring seamless communication."
              icon={<FaUsers className="text-blue-700 text-4xl mb-3" />}
            />
            <AdminCard
              title="Exam Coordinators"
              description="Manage exam schedules, results, and ensure smooth assessment processes."
              icon={
                <FaClipboardCheck className="text-blue-700 text-4xl mb-3" />
              }
            />
          </div>
        </div>
      </section>

      {/* Attendance Monitoring & Grievance Redressal */}
      <section className="attendance-grievance py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-semibold text-blue-900 text-center mb-8 flex justify-center items-center">
            <FaEye className="mr-3 text-blue-700" /> Attendance & Grievance
            Redressal
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <AdminCard
              title="Attendance Monitoring"
              description="Ensuring students’ regular attendance with timely updates to parents."
              icon={<FaCheckCircle className="text-blue-700 text-4xl mb-3" />}
            />
            <AdminCard
              title="Grievance Redressal"
              description="A secure system for students to raise and resolve academic concerns."
              icon={<FaUniversity className="text-blue-700 text-4xl mb-3" />}
            />
          </div>
        </div>
      </section>

      {/* Academic Audit and Appraisal */}
      <section className="audit py-16 bg-gray-100">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-semibold text-blue-900 mb-6 flex justify-center items-center">
            <FaClipboardCheck className="mr-3 text-blue-700" /> Academic Audit &
            Appraisal
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-700 leading-relaxed mb-8">
            Continuous improvement through academic audits and expert advisory
            boards.
          </p>
          <ul className="list-disc list-inside text-left text-gray-700 mx-auto max-w-xl space-y-2 text-lg">
            <li>📌 Department Working Committee (DWC)</li>
            <li>📌 Departmental Quality Assurance Cell (DQAC)</li>
            <li>📌 Departmental Advisory Board (DAB)</li>
            <li>📌 Institute Quality Assurance Cell (IQAC)</li>
            <li>📌 Industry Advisory Board (IAB)</li>
          </ul>
        </div>
      </section>
    </div>
  );
};
const AdminCard = ({ title, description, icon }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl text-center">
      <div className="flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold text-blue-800 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export const AcademicHandbook = () => {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col items-center justify-center text-center p-10">
      <h1 className="text-4xl font-bold text-blue-900 mb-6 flex items-center">
        <FaBookOpen className="mr-3 text-blue-700" /> Academic Handbook
      </h1>
      <p className="text-lg max-w-2xl text-gray-700 mb-6">
        Access our comprehensive academic handbook to understand policies,
        regulations, and academic guidelines.
      </p>

      {/* 📌 Button to Open PDF in New Tab */}
      <a
        href="https://fcrit.ac.in/static_pdfs/Academic_Handbook.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all"
      >
        📄 View Handbook
      </a>
    </div>
  );
};

export const AcademicHandbookDetails = () => {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col items-center justify-center text-center p-10">
      <h1 className="text-4xl font-bold text-blue-900 mb-6 flex items-center">
        <FaFilePdf className="mr-3 text-blue-700" /> Academic Handbook for
        Honours & Minors
      </h1>
      <p className="text-lg max-w-2xl text-gray-700 mb-6">
        Explore the detailed guidelines and policies for Honours and Minors
        programs.
      </p>

      {/* 📌 Button to Open PDF in New Tab */}
      <a
        href="https://fcrit.ac.in/static_pdfs/Handbook_H_M.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all"
      >
        📄 View Honours & Minors Handbook
      </a>
    </div>
  );
};

export const AcademicCalender = () => {
  const calendarData = [
    {
      id: 1,
      year: "FH-2025 (Autonomy Curriculum) FY and SY",
      date: "04 Jan 2025",
      link: "/pdfs/Final_Signed_AC_FY_SY_FH_2025.pdf",
    },
    {
      id: 2,
      year: "FH-2025 TE and BE",
      date: "04 Jan 2025",
      link: "/pdfs/Final_Signed_AC_TE_BE_FH_2025.pdf",
    },
    {
      id: 3,
      year: "SH-2024 (Autonomy Curriculum) SE",
      date: "20 July 2024",
      link: "/pdfs/Final_AC_SY_SH_2024.pdf",
    },
    {
      id: 4,
      year: "SH-2024 TE and BE",
      date: "20 July 2024",
      link: "/pdfs/Final_AC_TE_BE_SH_2024.pdf",
    },
    { id: 5, year: "FH-2024", date: "8 Jan 2024", link: "/pdfs/iacFH2024.pdf" },
    {
      id: 6,
      year: "SH-2023",
      date: "3 July 2023",
      link: "/pdfs/iacSH2023.pdf",
    },
    { id: 7, year: "FH-2023", date: "6 Jan 2023", link: "/pdfs/iacFH2023.pdf" },
    {
      id: 8,
      year: "SH-2022",
      date: "6 July 2022",
      link: "/pdfs/iacSH2022.pdf",
    },
    { id: 9, year: "FH-2022", date: "6 Jan 2022", link: "/pdfs/iacFH2022.pdf" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-blue-900 mb-6 text-center">
          📅 Academic Calendar
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg shadow-md">
            <thead className="bg-blue-700 text-white text-left">
              <tr>
                <th className="py-3 px-5">Sr No.</th>
                <th className="py-3 px-5">Year</th>
                <th className="py-3 px-5">Issue Date</th>
                <th className="py-3 px-5 text-center">View / Download</th>
              </tr>
            </thead>
            <tbody>
              {calendarData.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-100 transition-all"
                >
                  <td className="py-3 px-5">{index + 1}</td>
                  <td className="py-3 px-5">{item.year}</td>
                  <td className="py-3 px-5">{item.date}</td>
                  <td className="py-3 px-5 text-center">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center"
                    >
                      <FaExternalLinkAlt className="mr-2" /> View PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const APMS = () => {
  const handleRedirect = () => {
    window.open(
      "https://apms.fcrit.ac.in/apms/index.php",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-10">
      <div className="text-center bg-white shadow-lg rounded-lg p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          🔗 APMS Portal
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Access the{" "}
          <strong>Academic Performance Monitoring System (APMS)</strong> for
          student performance tracking.
        </p>
        <button
          onClick={handleRedirect}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all flex items-center justify-center"
        >
          <FaExternalLinkAlt className="mr-2" /> Open APMS
        </button>
      </div>
    </div>
  );
};

export const LMS = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-10">
      <h1 className="text-4xl font-bold text-blue-900 mb-6 flex items-center">
        🎓 Learning Management System (LMS)
      </h1>
      <p className="text-lg max-w-2xl text-gray-700 mb-6">
        Access our Learning Management System (LMS) for online courses,
        assignments, and resources.
      </p>

      {/* 📌 Button to Open LMS in a New Tab */}
      <a
        href="http://lms.fcrit.ac.in/moodle/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium flex items-center hover:bg-blue-700 transition-all"
      >
        <FaExternalLinkAlt className="mr-2" /> Visit LMS
      </a>
    </div>
  );
};

export const StakeholderFeedback = () => {
  const handleRedirect = () => {
    window.open(
      "https://fcrit.ac.in/static_pdfs/feedback/Feedback.pdf",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-10">
      <div className="text-center bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-4 flex items-center justify-center">
          <FaFilePdf className="mr-3 text-red-600" /> Stakeholder Feedback
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Click the button below to access the **Stakeholder Feedback on
          Syllabus**.
        </p>
        <button
          onClick={handleRedirect}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all flex items-center justify-center"
        >
          <FaFilePdf className="mr-2" /> View Feedback
        </button>
      </div>
    </div>
  );
};
