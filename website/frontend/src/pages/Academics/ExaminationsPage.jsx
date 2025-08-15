import React, { useState, useEffect } from "react";
import StaticPages from "../../layouts/staticPages";
import { FaExternalLinkAlt } from "react-icons/fa";

const ExaminationsPage = () => {
  const sidebarItems = [
    "Home",
    "Notifications",
    "Forms",
    "Timetable",
    "Archives",
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedYear, setSelectedYear] = useState("SH2024");
  const [notifications, setNotifications] = useState([]);
  const [forms, setForms] = useState([]);
  const [timetables, setTimetables] = useState({});
  const [archives, setArchives] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3663/api/academic/examinations"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();

        // Assuming the API returns the data in the expected format
        setNotifications(result.data.notifications || []);
        setForms(result.data.forms || []);
        setTimetables(result.data.timetables || {});
        setArchives(result.data.archives || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const slides = [
    {
      title: "F.E. Sem-I Result Analysis FH-2021",
      image: "src/assets/imgs/result_analysis_fe_sem_i.jpg",
    },
    {
      title: "S.E. Sem-III Result SH-2021",
      image: "src/assets/imgs/result_analysis_sem_iii.jpg",
    },
    {
      title: "T.E. Sem-V Result SH-2021",
      image: "src/assets/imgs/result_analysis_sem_v.jpg",
    },
    {
      title: "B.E. Sem-VII Result SH-2021",
      image: "src/assets/imgs/result_analysis_sem_vii.jpg",
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const content = {
    Home: (
      <div className="relative w-full max-w-3xl mx-auto bg-gray-50 p-6 rounded-lg shadow-lg">
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white px-3 py-1 rounded-full hover:bg-gray-800 transition-all"
        >
          ◀
        </button>

        <div className="text-center text-lg font-semibold text-blue-900 mb-4">
          {slides[currentSlide].title}
        </div>

        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          className="w-full rounded-lg shadow-md"
        />

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white px-3 py-1 rounded-full hover:bg-gray-800 transition-all"
        >
          ▶
        </button>
      </div>
    ),
    Notifications: (
      <div>
        <h2 className="text-3xl font-playfair font-semibold mb-10">
          Latest Examination Notifications
        </h2>
        <ul className="mt-4 space-y-3">
          {notifications.map((item, index) => (
            <li
              key={index}
              className={`p-4 shadow-md rounded-lg flex items-center justify-between transition-all ${
                item.isNew ? "" : ""
              }`}
            >
              <span>{item.title}</span>
              {item.isNew ? (
                <span className="text-red-500 px-2 py-1 text-xs rounded-md">
                  NEW
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    ),
    Forms: (
      <div>
        <h2 className="text-3xl font-playfair font-semibold mb-10">
          Examination Forms
        </h2>
        <ul className="mt-4 space-y-3">
          {forms.map((item, index) => (
            <li
              key={index}
              className="p-4 shadow-md rounded-lg flex items-center justify-between hover:bg-gray-100 transition-all"
            >
              <span>{item.name}</span>
              <a
                href={`http://localhost:3663${item.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0c2340] px-4 py-2 transition-all flex items-center"
              >
                <FaExternalLinkAlt className="mr-2" /> View PDF
              </a>
            </li>
          ))}
        </ul>
      </div>
    ),
    Timetable: (
      <div>
        <h2 className="text-3xl font-playfair font-semibold mb-10">
          Examination Timetable
        </h2>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="p-3 border-2 border-gray-300 rounded-md bg-white shadow-sm hover:bg-gray-50 focus:ring focus:ring-blue-500 transition-all"
        >
          {Object.keys(timetables).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <div className="mt-6 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            {selectedYear} Timetable
          </h3>
          <div className="grid grid-cols-1 gap-6">
            {Object.entries(timetables[selectedYear] || {}).map(
              ([category, exams]) => (
                <div key={category} className="p-4 shadow-md rounded-lg">
                  <h4 className="font-bold text-black">{category}</h4>
                  <ul className="mt-3 space-y-2">
                    {exams.map((exam) => (
                      <li
                        key={exam.id}
                        className="flex justify-between items-center"
                      >
                        <span>{exam.title}</span>
                        <a
                          href={`http://localhost:3663${exam.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0c2340] hover:text-blue-900 flex items-center"
                        >
                          <FaExternalLinkAlt className="mr-1" /> View PDF
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    ),
    Archives: (
      <div>
        <h2 className="text-3xl font-playfair font-semibold mb-10">
          Examination Archives
        </h2>
        <ul className="mt-4 space-y-3">
          {archives.map((item, index) => (
            <li
              key={index}
              className="p-4 bg-gray-100 shadow-md rounded-lg flex items-center justify-between hover:bg-gray-200 transition-all"
            >
              <span>
                {item.title} ({item.year})
              </span>
              <a
                href={`http://localhost:3663${item.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0c2340] px-4 py-2 flex items-center"
              >
                <FaExternalLinkAlt className="mr-2" /> View
              </a>
            </li>
          ))}
        </ul>
      </div>
    ),
  };

  return (
    <StaticPages
      pagename="Examinations"
      path="Home / Academics / Examinations"
      sidebar={sidebarItems}
      content={content}
    />
  );
};

export default ExaminationsPage;
