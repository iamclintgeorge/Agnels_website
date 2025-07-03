import React, { useState } from "react";

function WhatsNew() {
  const tablesData = [
    {
      title: "Notice Board",
      tabs: [],
      content: [
        "Content for Notice Board 1",
        "Content for Notice Board 2",
        "Content for Notice Board 3",
        "Content for Notice Board 4",
        "Content for Notice Board 5",
        "Content for Notice Board 6",
        "Content for Notice Board 7",
        "Content for Notice Board 8",
        "Content for Notice Board 9",
      ],
    },
    {
      title: "Achievements",
      tabs: ["BE", "DSE (BE)", "M.tech/ Ph.D", "General"],
      content: {
        BE: "B.Tech Achievements Content",
        "DSE (BE)": "DSE (B.Tech) Achievements Content",
        "M.tech/ Ph.D": "M.Tech/Ph.D Achievements Content",
        General: "General Content",
      },
    },
    {
      title: "Admissions",
      tabs: ["BE", "DSE (BE)", "M.tech/ Ph.D"],
      content: {
        BE: "B.Tech Admissions Content",
        "DSE (BE)": "DSE (B.Tech) Admissions Content",
        "M.tech/ Ph.D": "M.Tech/Ph.D Admissions Content",
      },
    },
  ];

  const [activeTabs, setActiveTabs] = useState(
    tablesData.map(() => 0) // Default to the first tab in each table
  );

  const handleTabClick = (tableIndex, tabIndex) => {
    const newActiveTabs = [...activeTabs];
    newActiveTabs[tableIndex] = tabIndex;
    setActiveTabs(newActiveTabs);
  };

  return (
    <section className="relative py-10 pb-28 px-5 bg-[#F7F7F7]">
      <div className="absolute inset-0 flex text-[#EDEDED] font-medium text-[9.6vw] leading-none uppercase opacity-70 z-0 mt-[220px] md:mt-[250px] tracking-widest p-0 m-0">
        Announcements
      </div>
      <h2 className="font-medium italic text-2xl text-[#0C2340] mb-5 w-[336px] h-[29px] mt-20 pl-0 md:pl-16 text-center md:text-left mx-auto md:mx-0">
        ANNOUNCEMENTS
      </h2>
      <div className="w-40 h-[5px] bg-[#AE9142] mt-1 mb-24 md:mb-40 mx-auto md:mx-0"></div>
      <div className="flex flex-col md:flex-row justify-center gap-y-12 md:gap-5 items-center">
        {tablesData.map((table, tableIndex) => (
          <div
            key={tableIndex}
            className="bg-[#E1E1E1] border rounded-lg w-96 h-[200px] min-h-96 z-10"
            style={{
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
            }}
          >
            <h3 className="bg-[#0E1D3F] text-white w-96 h-10 text-[17px] font-semibold text-center py-2 rounded-t-lg">
              {table.title}
            </h3>
            {/* Tab Container */}
            {table.tabs.length > 0 && (
              <div className="flex justify-between items-center ">
                {table.tabs.map((tab, tabIndex) => (
                  <span
                    key={tabIndex}
                    className={`pt-3 py-0 text-center text-nowrap text-[15px] w-44 h-12 cursor-pointer ${
                      activeTabs[tableIndex] === tabIndex
                        ? "text-[#AE9142] font-bold"
                        : "text-[#000000]"
                    }`}
                    onClick={() => handleTabClick(tableIndex, tabIndex)}
                    style={{
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                      border: "0.5px solid #757575",
                    }}
                  >
                    {tab}
                  </span>
                ))}
              </div>
            )}

            {/* Content for the selected tab or direct content for the table */}
            <div className="p-4">
              {table.tabs.length === 0 ? (
                <div className="vertical-marquee-container">
                  <div className="vertical-marquee">
                    {table.content.map((contentItem, index) => (
                      <div key={index} className="vertical-marquee-item">
                        <p className="text-[#333]">{contentItem}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p>{table.content[table.tabs[activeTabs[tableIndex]]]}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhatsNew;
