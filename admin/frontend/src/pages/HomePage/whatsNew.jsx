import React from "react";

function WhatsNew() {
  const tablesData = [
    {
      title: "Admissions",
      tabs: ["1st Year (B.tech)", "2nd Year (B.tech)", "M.tech/ Ph.D"],
    },
    {
      title: "Admissions",
      tabs: ["1st Year (B.tech)", "2nd Year (B.tech)", "M.tech/ Ph.D"],
    },
    {
      title: "Admissions",
      tabs: ["1st Year (B.tech)", "2nd Year (B.tech)", "M.tech/ Ph.D"],
    },
  ];

  return (
    <section className="relative py-10 px-5 bg-[#F7F7F7]">
      {/* Background Text */}
      {/* <div className="absolute inset-0 flex text-red-900 [#EDEDED] font-medium text-[9.7vw] leading-none uppercase opacity-70 z-0 mt-[250px] tracking-widest px-0 mx-0">
        Announcements
      </div> */}
      <h2 className="font-semibold italic text-[30px] text-[#0C2340] pl-16 mb-5 w-[336px] h-[29px] mt-[75px] ">
        ANNOUNCEMENTS
      </h2>
      <div className="w-[180px] h-[5px] bg-[#AE9142] mt-[25px] ml-[30px] mb-[185px]"></div>
      <div className="flex justify-center gap-5 z-10">
        {tablesData.map((table, index) => (
          <div
            key={index}
            className="bg-[#E1E1E1] border rounded-lg w-[431px] h-[457px]"
            style={{
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", // Custom drop shadow
            }}
          >
            <h3 className="bg-[#0E1D3F] text-white w-[431px] h-[46px] text-[17px] font-semibold text-center py-2 rounded-t-lg">
              {table.title}
            </h3>
            {/* Tab Container */}
            <div className="flex justify-between items-center ">
              {table.tabs.map((tab, tabIndex) => (
                <span
                  key={tabIndex}
                  className="px-10 py-0 bg-[#E1E1E1] shadow-sm text-center text-[#000000] text-[15px] w-144 h-46"
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
