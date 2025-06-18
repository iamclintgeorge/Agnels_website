import React, { useState } from "react";

function WhatsNew() {
  const tablesData = [
    {
      title: "Notice Board",
      tabs: [],
      content: "Content for Notice Board",
    },
    {
      title: "Achievements",
      tabs: ["B.tech", "DSE (B.tech)", "M.tech/ Ph.D"],
      content: {
        "B.tech": "B.Tech Achievements Content",
        "DSE (B.tech)": "DSE (B.Tech) Achievements Content",
        "M.tech/ Ph.D": "M.Tech/Ph.D Achievements Content",
      },
    },
    {
      title: "Admissions",
      tabs: ["B.tech", "DSE (B.tech)", "M.tech/ Ph.D"],
      content: {
        "B.tech": "B.Tech Admissions Content",
        "DSE (B.tech)": "DSE (B.Tech) Admissions Content",
        "M.tech/ Ph.D": "M.Tech/Ph.D Admissions Content",
      },
    },
  ];

  // State to track active tab for each table
  const [activeTabs, setActiveTabs] = useState(
    tablesData.map(() => 0) // Default to the first tab in each table
  );

  const handleTabClick = (tableIndex, tabIndex) => {
    // Set active tab for the clicked table
    const newActiveTabs = [...activeTabs];
    newActiveTabs[tableIndex] = tabIndex;
    setActiveTabs(newActiveTabs);
  };

  return (
    <section className="relative py-10 pb-28 px-5 bg-[#F7F7F7]">
      {/* Background Text */}
      <div className="absolute inset-0 flex text-[#EDEDED] font-medium text-[9.6vw] leading-none uppercase opacity-70 z-0 mt-[250px] tracking-widest p-0 m-0">
        Announcements
      </div>
      <h2 className="font-medium italic text-2xl text-[#0C2340] pl-16 mb-5 w-[336px] h-[29px] mt-20 ">
        ANNOUNCEMENTS
      </h2>
      <div className="w-40 h-[5px] bg-[#AE9142] mt-1 ml-10 mb-40"></div>
      <div className="flex justify-center gap-5">
        {tablesData.map((table, tableIndex) => (
          <div
            key={tableIndex}
            className="bg-[#E1E1E1] border rounded-lg w-96 h-auto min-h-96 z-10"
            style={{
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
            }}
          >
            <h3 className="bg-[#0E1D3F] text-white w-96 h-10 text-[17px] font-semibold text-center py-2 rounded-t-lg">
              {table.title}
            </h3>
            {/* Tab Container */}
            <div className="flex justify-between items-center ">
              {table.tabs.map((tab, tabIndex) => (
                <span
                  key={tabIndex}
                  className={`pt-3 py-0 text-center text-nowrap text-[15px] w-44 h-12 cursor-pointer ${
                    activeTabs[tableIndex] === tabIndex
                      ? "text-[#AE9142] font-bold" // Change text color for active tab
                      : "text-[#000000]" // Default text color for inactive tab
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

            {/* Content for the selected tab */}
            <div className="p-4 mt-4">
              <p>{table.content[table.tabs[activeTabs[tableIndex]]]}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhatsNew;
