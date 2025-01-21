import React, { useState } from "react";
import { Link } from "react-router-dom";

const StaticPages = (props) => {
  const [activeTab, setActiveTab] = useState(props.sidebar[0]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-[#dde5ef] text-black py-8">
        <h1 className="text-3xl font-extrabold text-left pl-7 uppercase">
          {props.pagename}
        </h1>
        <p className="text-sm text-left pl-7 mt-2">{props.path}</p>
      </div>

      {/* Departments Section */}
      <main className="flex flex-col items-center py-8">
        <div className="flex w-11/12 max-w-7xl">
          {/* Sidebar */}
          <div className="w-1/4 pr-6">
            <ul className="space-y-3">
              {props.sidebar.map((department, index) => (
                <li
                  key={index}
                  className="relative group cursor-pointer"
                  onClick={() => handleTabClick(department)}
                >
                  <Link
                    href="#"
                    className="block px-2 py-2 text-gray-700 font-semibold transition duration-300 ease-in-out group-hover:text-[#0c2340] group-hover:bg-gray-50"
                  >
                    {department}
                  </Link>
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="w-[1px] bg-gray-300"></div>

          {/* Content Area */}
          <div className="w-3/4 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#0c2340]">
              {props.title}
            </h2>
            {props.content[activeTab]}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaticPages;
