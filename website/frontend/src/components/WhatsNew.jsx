import React from "react";

function WhatsNew() {
  const tablesData = [
    {
      title: "Admissions",
      tabs: ["B.tech", "DSE (B.tech)", "M.tech/ Ph.D"],
    },
    {
      title: "Admissions",
      tabs: ["B.tech", "DSE (B.tech)", "M.tech/ Ph.D"],
    },
    {
      title: "Admissions",
      tabs: ["B.tech", "DSE (B.tech)", "M.tech/ Ph.D"],
    },
  ];

  return (
    <section className="relative py-10 px-5 bg-[#F7F7F7]">
      {/* Background Text */}
      <div className="absolute inset-0 flex text-[#EDEDED] font-medium text-[9.7vw] leading-none uppercase opacity-70 z-0 mt-[250px] tracking-widest px-0 mx-0">
        Announcements
      </div>
      <h2 className="font-medium italic text-2xl text-[#0C2340] pl-16 mb-5 w-[336px] h-[29px] mt-20 ">
        ANNOUNCEMENTS
      </h2>
      <div className="w-40 h-[5px] bg-[#AE9142] mt-1 ml-10 mb-40"></div>
      <div className="flex justify-center gap-5">
        {tablesData.map((table, index) => (
          <div
            key={index}
            className="bg-[#E1E1E1] border rounded-lg w-96 h-auto min-h-96 z-10"
            style={{
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", // Custom drop shadow
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
                  className="pt-3 py-0 bg-[#E1E1E1] shadow-sm text-center text-nowrap text-[#000000] text-[15px] w-44 h-12"
                  style={{
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", // Custom drop shadow
                    border: "1.21px solid #757575", // Stroke effect
                  }}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhatsNew;
