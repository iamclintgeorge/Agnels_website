import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StaticPages = (props) => {
  const [activeTab, setActiveTab] = useState(props.sidebar[0]);
  const navigate = useNavigate(); // ✅ Add navigation hook

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    // ✅ Redirect to the correct route for Examinations
    if (tab === "Examinations") {
      navigate("/examinations-page");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gray-100 text-[#0C2340] py-5 border-b-[0.5px] border-gray-400 pl-10 font-inter">
        <h1 className="text-2xl font-semibold text-left pl-7 py-0">
          {props.pagename}
        </h1>
        <p className="text-sm text-left pl-7 mt-1 font-normal">{props.path}</p>
      </div>

      {/* Sidebar Section */}
      <main className="flex flex-col items-center py-16">
        <div className="flex w-11/12 max-w-7xl">
          {/* Sidebar */}
          <div className="w-1/4 pr-6">
            <ul className="space-y-3">
              {props.sidebar.map((tab, index) => (
                <li
                  key={index}
                  className="relative group cursor-pointer"
                  onClick={() => handleTabClick(tab)}
                >
                  <span className="block px-2 py-3 text-black font-[350] font-inter transition duration-300 ease-in-out group-hover:text-[#0c2340] group-hover:bg-gray-50">
                    {tab}
                  </span>
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="w-[1px] bg-gray-300"></div>

          {/* Content Area */}
          <div className="w-3/4 pl-6">{props.content[activeTab]}</div>
        </div>
      </main>
    </div>
  );
};

export default StaticPages;
