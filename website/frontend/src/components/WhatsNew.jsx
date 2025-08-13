import React, { useState, useEffect } from "react";
import axios from "axios";

function WhatsNew() {
  /* ──────── 1. FETCH DATA ──────── */
  const [announcements, setAnnouncements] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [admissions, setAdmissions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        // Fetch announcements
        const announcementsRes = await axios.get(
          "http://localhost:3663/api/home/announcements"
        );
        setAnnouncements(announcementsRes.data?.result || []);

        // Fetch achievements
        const achievementsRes = await axios.get(
          "http://localhost:3663/api/home/achievements"
        );
        setAchievements(achievementsRes.data?.result || []);

        // Fetch admissions
        const admissionsRes = await axios.get(
          "http://localhost:3663/api/home/admissions"
        );
        setAdmissions(admissionsRes.data?.result || []);
      } catch (err) {
        console.error("Data fetch error:", err);
      }
    })();
  }, []);

  /* ──────── 2. MODAL STATE ──────── */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null); // "single" | "all"
  const [modalType, setModalType] = useState(null); // "announcements" | "achievements" | "admissions"
  const [activeRow, setActiveRow] = useState(null);

  const openSingle = (row, type) => {
    setActiveRow(row);
    setModalMode("single");
    setModalType(type);
    setIsModalOpen(true);
  };

  const openAll = () => {
    setModalMode("all");
    setModalType("announcements");
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const studentsAchievements = achievements.filter(
    (a) => a.Type === "Students"
  );
  const facultiesAchievements = achievements.filter(
    (a) => a.Type === "Faculties"
  );

  const firstYearAdmissions = admissions.filter(
    (a) => a.Type === "1st Year B.Tech"
  );
  const directSecondYearAdmissions = admissions.filter(
    (a) => a.Type === "Direct 2nd Year B.Tech"
  );
  const mtechPhdAdmissions = admissions.filter((a) => a.Type === "M.Tech/Ph.D");

  const tablesData = [
    {
      title: "Notice Board",
      tabs: [],
      content: announcements.map((a) => a.subject),
    },
    {
      title: "Achievements",
      tabs: ["Students", "Faculties"],
      content: {
        Students: studentsAchievements,
        Faculties: facultiesAchievements,
      },
    },
    {
      title: "Admissions",
      tabs: ["1st Year B.Tech", "Direct 2nd Year B.Tech", "M.Tech/Ph.D"],
      content: {
        "1st Year B.Tech": firstYearAdmissions,
        "Direct 2nd Year B.Tech": directSecondYearAdmissions,
        "M.Tech/Ph.D": mtechPhdAdmissions,
      },
    },
  ];

  const [activeTabs, setActiveTabs] = useState(tablesData.map(() => 0));
  const handleTabClick = (tIdx, tabIdx) => {
    setActiveTabs((prev) => prev.map((v, i) => (i === tIdx ? tabIdx : v)));
  };

  return (
    <>
      <section className="relative py-10 pb-28 px-5 bg-[#F7F7F7]">
        <div className="absolute inset-0 sm:flex text-[#EDEDED] font-medium text-[9.6vw] hidden leading-none uppercase opacity-70 z-0 mt-[220px] md:mt-[250px] tracking-widest">
          Announcements
        </div>

        {/* section heading */}
        <h2 className="font-medium italic text-2xl text-[#0C2340] mb-5 w-[336px] mt-20 pl-0 md:pl-16 text-center md:text-left mx-auto md:mx-0">
          ANNOUNCEMENTS
        </h2>
        <div className="w-40 h-[5px] bg-[#AE9142] mb-24 md:mb-40 mx-auto md:mx-0" />

        <div className="flex flex-col md:flex-row justify-center gap-y-12 md:gap-5 items-center">
          {tablesData.map((table, tableIdx) => (
            <div
              key={tableIdx}
              className="bg-[#E1E1E1] border rounded-lg w-[90vw] sm:w-96 h-[200px] min-h-96 z-10"
              style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.3)" }}
            >
              {/* clickable card title */}
              <h3
                className={`bg-[#0E1D3F] text-white w-[90.2vw] sm:w-96 h-10 text-[17px] font-semibold text-center py-2 rounded-t-lg select-none ${
                  table.title === "Notice Board" ? "cursor-pointer" : ""
                }`}
                onClick={() => table.title === "Notice Board" && openAll()}
              >
                {table.title}
              </h3>

              {/* tabs (Achievements / Admissions) */}
              {table.tabs.length > 0 && (
                <div className="flex">
                  {table.tabs.map((tab, tabIdx) => (
                    <span
                      key={tabIdx}
                      className={`flex-1 py-2 px-1 text-center text-wrap text-[15px] cursor-pointer ${
                        activeTabs[tableIdx] === tabIdx
                          ? "text-[#AE9142] font-bold bg-[#F7F7F7]"
                          : "text-[#000000] bg-[#E1E1E1]"
                      }`}
                      onClick={() => handleTabClick(tableIdx, tabIdx)}
                      style={{
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        border: "0.5px solid #757575",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {tab}
                    </span>
                  ))}
                </div>
              )}

              {/* card body */}
              <div className="p-4">
                {/* NOTICE BOARD */}
                {table.title === "Notice Board" && (
                  <div className="vertical-marquee-container">
                    <div className="vertical-marquee">
                      {announcements.map((row) => (
                        <div
                          key={row.id}
                          className="vertical-marquee-item cursor-pointer"
                          onClick={() => openSingle(row, "announcements")}
                        >
                          <p className="text-[#333]">{row.subject}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ACHIEVEMENTS */}
                {table.title === "Achievements" && (
                  <div className="vertical-marquee-container">
                    <div className="vertical-marquee">
                      {table.content[table.tabs[activeTabs[tableIdx]]].map(
                        (row) => (
                          <div
                            key={row.id}
                            className="vertical-marquee-item cursor-pointer"
                            onClick={() => openSingle(row, "achievements")}
                          >
                            <p className="text-[#333]">{row.subject}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* ADMISSIONS */}
                {table.title === "Admissions" && (
                  <div className="vertical-marquee-container">
                    <div className="vertical-marquee">
                      {table.content[table.tabs[activeTabs[tableIdx]]].map(
                        (row) => (
                          <div
                            key={row.id}
                            className="vertical-marquee-item cursor-pointer"
                            onClick={() => openSingle(row, "admissions")}
                          >
                            <p className="text-[#333]">{row.subject}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================= MODAL ========================== */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-[90vw] max-h-[85vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ minWidth: "60vw" }}
          >
            {/* close button */}
            <button
              className="float-right text-xl font-bold mb-2"
              onClick={closeModal}
            >
              &times;
            </button>

            {/* SINGLE ITEM VIEW (works for announcements, achievements, and admissions) */}
            {modalMode === "single" && (
              <table className="w-full border border-gray-400 mt-6">
                <tbody>
                  <tr>
                    <th className="border p-2 text-left w-40">Subject</th>
                    <td className="border p-2">{activeRow.subject}</td>
                  </tr>
                  <tr>
                    <th className="border p-2 text-left">Description</th>
                    <td className="border p-2">{activeRow.description}</td>
                  </tr>
                  <tr>
                    <th className="border p-2 text-left">Attachment URL</th>
                    <td className="border p-2 break-words">
                      {activeRow.attachment || "—"}
                    </td>
                  </tr>
                  {(modalType === "achievements" ||
                    modalType === "admissions") && (
                    <tr>
                      <th className="border p-2 text-left">Type</th>
                      <td className="border p-2">{activeRow.Type}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {/* FULL LIST VIEW (only for announcements) */}
            {modalMode === "all" && modalType === "announcements" && (
              <table className="w-full border border-gray-400 mt-6">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border p-2 w-20">Sr&nbsp;No.</th>
                    <th className="border p-2">Subject</th>
                    <th className="border p-2">Description</th>
                    <th className="border p-2">Attachment URL</th>
                  </tr>
                </thead>
                <tbody>
                  {announcements.map((row, idx) => (
                    <tr key={row.id}>
                      <td className="border p-2 text-center">{idx + 1}</td>
                      <td className="border p-2">{row.subject}</td>
                      <td className="border p-2">{row.description}</td>
                      <td className="border p-2 break-words">
                        {row.attachment || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default WhatsNew;
